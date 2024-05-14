import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { ElNotification } from 'element-plus';
import { throttle } from 'lodash-es';

import { HTTP_ERROR_NOTICE } from '@/constant/base';
import { getBaseUrl, getUserToken } from '@/utils/storage';

/**
 * 后端返回数据格式
 */
interface Responsedata<T = any> {
    code: number;
    message: string | null;
    data: T;
}

/**
 * 拦截器配置函数参数
 */
interface Options {
    /** url */
    url?: string;
    /** 超时时间 ms */
    timeout?: number;
    /** 请求头携带 token 的 key 值 */
    requestHeaderTokenKey?: string;
    /** 过期码 */
    expireCode?: number;
    /** 过期回调 */
    expireCallback?: () => void;
    /** get 请求携带的参数 */
    getMethodsParams?: Record<string, any>;
    /** post 请求携带的参数 */
    postMethodsParams?: Record<string, any>;
    /** 成功响函数 */
    successValidate?: (responsedata: Responsedata) => boolean;
}

/**
 * 拦截器配置函数
 * @param {Options} options 配置项
 * @returns 接口函数
 */
export default function useAxiosInterceptors(options: Options) {
    if (!options.url) {
        throw new Error('未设置 url');
    }

    /**
     * axios 实例
     */
    const service = axios.create({
        baseURL: options.url || '',
        timeout: options.timeout || 60000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    /**
     * 请求拦截
     */
    service.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = getUserToken();
            const baseUrl = getBaseUrl();

            // 设置 token
            if (token && config.headers) {
                config.headers[options.requestHeaderTokenKey || 'v-token'] = token;
            }

            // 设置 url
            if (baseUrl && config.url) {
                config.url = baseUrl + config.url;
            }

            // get 请求参数
            if (options.getMethodsParams && config.params) {
                config.params = {
                    ...options.getMethodsParams,
                    ...config.params,
                };
            }

            // post 请求参数
            if (options.postMethodsParams && config.data) {
                config.data = {
                    ...options.postMethodsParams,
                    ...config.data,
                };
            }

            return config;
        },

        error => {
            return Promise.reject(error);
        },
    );

    /**
     * 节流处理响应错误信息
     * @param {Options} options 配置项
     */
    const handleResponseError = throttle(
        options => {
            ElNotification(options);
        },
        500,
        {
            // 指定在延迟开始前调用
            leading: false,
            // 指定在延迟结束后调用
            trailing: true,
        },
    );

    /**
     * 节流处理错误信息
     * @param {string} message 错误信息
     */
    const handleNetworkError = throttle(
        (message: string) => {
            ElNotification({
                type: 'error',
                message,
                zIndex: 9999,
            });
        },
        500,
        {
            leading: false,
            trailing: true,
        },
    );

    /**
     * 响应拦截
     */
    service.interceptors.response.use(
        (response: AxiosResponse) => {
            const responsedata = response.data;
            const {
                code,
                message = HTTP_ERROR_NOTICE.UNKNOWN,
                data,
            } = response.data as {
                code: number;
                message: string;
                data: any;
            };

            // 是否响应成功
            const successStatus = options.successValidate
                ? options.successValidate(responsedata)
                : Math.floor(code / 100) === 1;

            if (successStatus) {
                return Promise.resolve(data || true);
            } else {
                switch (code) {
                    case options.expireCode || -997: {
                        handleResponseError({
                            type: 'warning',
                            message: HTTP_ERROR_NOTICE.EXPIRE,
                            onClose: () => {
                                if (options.expireCallback) {
                                    options.expireCallback();
                                }
                            },
                        });

                        return Promise.resolve(false);
                    }

                    default: {
                        handleResponseError({
                            type: 'error',
                            message: message,
                            zIndex: 9999,
                        });

                        return Promise.resolve(false);
                    }
                }
            }
        },
        (error: AxiosError) => {
            const statusCode = error.response?.status;
            const errorMessage = error.message;

            // 响应错误
            if (!statusCode) {
                console.log('response error', error.toJSON());

                if (errorMessage.indexOf('timeout') !== -1) {
                    handleNetworkError(HTTP_ERROR_NOTICE.TIME_OUT);
                } else if (errorMessage.indexOf('Network Error') !== -1) {
                    handleNetworkError(HTTP_ERROR_NOTICE.NETWORK_ERROR);
                } else {
                    handleNetworkError(HTTP_ERROR_NOTICE.UNKNOWN);
                }

                return Promise.resolve(false);
            }

            // 非响应错误处理
            switch (statusCode) {
                case 404:
                    handleNetworkError(HTTP_ERROR_NOTICE.NOT_FOUND);
                    break;
                case 500:
                    handleNetworkError(HTTP_ERROR_NOTICE.SERVER_ERROR);
                    break;
                default:
                    handleNetworkError(HTTP_ERROR_NOTICE.UNKNOWN);
                    break;
            }

            return Promise.resolve(false);
        },
    );

    return {
        get: service.get,
        post: service.post,
        put: service.put,
        del: service.delete,
    };
}

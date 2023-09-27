/**
 * 当前环境
 */
export const ENV = import.meta.env.MODE;

/**
 * 本地存储 app-name
 */
export const APP_NAME = import.meta.env.VITE_APP_NAME;

/**
 * 本地存储 base-url key
 */
export const LOCAL_BASE_URL = 'baseUrl';

/**
 * 本地存储 token key
 */
export const LOCAL_TOKEN_KEY = 'token';

/**
 * 本地存储 userInfo key
 */
export const LOCAL_USER_INFO_KEY = 'userInfo';

/**
 * 上传接口
 */
export const UPLOAD_API = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_GLOB_UPLOAD_URL}`;

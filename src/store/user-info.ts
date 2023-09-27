import { defineStore } from 'pinia';
import store from 'store2';
import { saveBaseUrl, getBaseUrl, saveUserToken, getUserToken, saveUserInfo, getUserInfo } from '@/utils/storage';

/**
 * 权限缓存状态
 */
export const useUserStore = defineStore('userInfo', () => {
    /**
     * base-url
     */
    const url = ref<string>('');
    const getUrl = computed(() => url.value || getBaseUrl());

    function setUrl(info: string) {
        url.value = info;
        saveBaseUrl(info);
    }

    /**
     * token
     */
    const token = ref<string>('');
    const getToken = computed(() => token.value || getUserToken());

    function setToken(info: string) {
        token.value = info;
        saveUserToken(info);
    }

    /**
     * user-info
     */
    const userInfo = ref<any>();
    const getInfo = computed(() => userInfo.value || getUserInfo());

    function setUserInfo(info: any) {
        userInfo.value = info;
        saveUserInfo(info);
        setLastUpdateTime(info ? new Date().getTime() : 0);
    }

    /**
     * last-update-time
     */
    const lastUpdateTime = ref<number>(0);
    const getLastUpdateTime = computed(() => lastUpdateTime.value);

    function setLastUpdateTime(info: number) {
        lastUpdateTime.value = info;
    }

    /**
     * 清空
     */
    function clearCache() {
        setUrl('');
        setToken('');
        setUserInfo('');
        store.local.clear();
    }

    return {
        getUrl,
        getToken,
        getInfo,
        getLastUpdateTime,
        setUrl,
        setToken,
        setUserInfo,
        setLastUpdateTime,
        clearCache,
    };
});

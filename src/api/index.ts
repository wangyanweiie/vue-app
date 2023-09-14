import router from '@/router/index';
import { LOCAL_TOKEN_KEY } from '@/constant/global';
import { setupAxiosInterceptors } from '@/utils/request';
import { removeStorage } from '@/utils/local-storage';

const { get, post } = setupAxiosInterceptors({
    url: import.meta.env.VITE_API_URL as string,

    storageTokenKey: 'token',

    // 退出登录
    expireCallback: () => {
        removeStorage(LOCAL_TOKEN_KEY);
        removeStorage('userInfo');
        router.push(`/login?redirect=${router.currentRoute.value.path}`);
    },
});

export { get, post };

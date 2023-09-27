import router from '@/router/index';
import { clearStorage } from '@/utils/local-storage';
import useAxiosInterceptors from '@/utils/use-axios';

const { get, post } = useAxiosInterceptors({
    url: import.meta.env.VITE_API_URL as string,

    storageUrlKey: 'baseUrl',
    storageTokenKey: 'token',

    // 退出登录
    expireCallback: () => {
        clearStorage();
        router.push(`/login?redirect=${router.currentRoute.value.path}`);
    },
});

export { get, post };

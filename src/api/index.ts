import router from '@/router/index';
import useAxiosInterceptors from '@/utils/use-axios';
import { removeBaseUrl, removeUserToken, removeUserInfo, removePermission } from '@/utils/storage';

const { get, post } = useAxiosInterceptors({
    url: import.meta.env.VITE_API_URL as string,

    // 退出登录
    expireCallback: () => {
        // clearStorage();
        removeBaseUrl();
        removeUserToken();
        removeUserInfo();
        removePermission();
        router.push(`/login?redirect=${router.currentRoute.value.path}`);
    },
});

export { get, post };

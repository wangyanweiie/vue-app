import { ElMessage } from 'element-plus';

import type { XFormInstance, XFormItemSchema } from '@/components/x-form/interface';
import { OPERATION_NOTICE } from '@/constant/base';
import { type ChangePasswordDto, userChangePasswordPOST, userLogoutGET } from '@/gen-api';
import router from '@/router';
import { confirmExitMessage } from '@/utils/confirm-message';
import { clearStorage } from '@/utils/local-storage';
import { getBaseUrl, getUserInfo, getUserToken } from '@/utils/storage';

export default function useIndex() {
    const baseUrl = ref<string>(getBaseUrl() || import.meta.env.VITE_API_URL);
    const token = getUserToken();
    const userInfo = getUserInfo();

    /**
     * 跳转页面
     */
    function handleJudge() {
        window.open(`${window.location.protocol}//${window.location.host}/screen`, '_blank');
    }

    /**
     * 下拉列表
     */
    const dropdownItems = [
        { title: '修改密码', onClick: openDialog },
        { title: '注销', onClick: logout },
    ];

    /**
     * 表单配置
     */
    const schemas: XFormItemSchema[] = [
        {
            label: '旧密码',
            prop: 'oldPassword',
            components: 'el-input',
            colProps: { span: 24 },
            elFormItemProps: {
                rules: [{ required: true, message: '请输入旧密码' }],
            },
        },
        {
            label: '新密码',
            prop: 'newPassword',
            components: 'el-input',
            colProps: { span: 24 },
            elFormItemProps: {
                rules: [{ required: true, message: '请输入新密码' }],
            },
        },
    ];

    /**
     * form ref
     */
    const formRef = ref<XFormInstance>();

    /**
     * form
     */
    const form = ref<ChangePasswordDto>({
        newPassword: '',
        oldPassword: '',
        userId: '',
    });

    /**
     * 弹窗是否展示
     */
    const visible = ref<boolean>(false);

    /**
     * 打开弹窗
     */
    function openDialog() {
        form.value.userId = userInfo.id as string;
        visible.value = true;
    }

    /**
     * loading
     */
    const loading = ref<boolean>(false);

    /**
     * 修改密码
     */
    async function changePassword(): Promise<void> {
        // 表单校验
        const valid = await formRef.value?.validate();

        if (!valid) {
            return;
        }

        loading.value = true;
        const res = await userChangePasswordPOST(form.value);

        if (!res) {
            ElMessage.error(OPERATION_NOTICE.OPERATE_ERROR);
            loading.value = false;
            return;
        }

        ElMessage.success(OPERATION_NOTICE.OPERATE_SUCCESS);
        loading.value = false;
        visible.value = false;

        // 退出登录
        const result = await userLogoutGET();

        if (result) {
            clearStorage();
            router.push(`/login`);
        }
    }

    /**
     * 退出登录
     */
    async function logout() {
        const confirm = await confirmExitMessage();

        if (!confirm) {
            return;
        }

        if (!token) {
            return;
        }

        const res = await userLogoutGET();

        if (res) {
            clearStorage();
            router.push(`/login`);
        }
    }

    return {
        baseUrl,
        userInfo,
        dropdownItems,
        schemas,
        visible,
        formRef,
        loading,
        form,
        handleJudge,
        changePassword,
    };
}

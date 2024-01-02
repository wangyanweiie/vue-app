import { defineStore } from 'pinia';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import zhTw from 'element-plus/dist/locale/zh-tw.mjs';
import en from 'element-plus/dist/locale/en.mjs';

/**
 * 语言类型
 */
export type LanguageType = 'zh-cn' | 'zh-tw' | 'en';

/**
 * 切换语言
 * setup store
 * 在 setup store 中：ref() 就是 state 属性；computed() 就是 getters；function() 就是 actions
 */
export const useLanguageStore = defineStore('language', () => {
    const language = ref<LanguageType>('zh-cn');
    const locale = ref(zhCn);
    const languageList = ref([
        { label: '中文简体', value: 'zh-cn' },
        { label: '中文繁体', value: 'zh-tw' },
        { label: '英文', value: 'en' },
    ]);

    const getLanguage = computed(() => language.value);
    const getLocale = computed(() => locale.value);
    const getLanguageList = computed(() => languageList.value);

    function setLanguage(value: LanguageType) {
        language.value = value;
        locale.value = value === 'zh-cn' ? zhCn : value === 'zh-tw' ? zhTw : en;
    }

    return {
        getLanguage,
        getLocale,
        getLanguageList,
        setLanguage,
    };
});

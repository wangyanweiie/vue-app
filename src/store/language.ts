import { defineStore } from 'pinia';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import zhTw from 'element-plus/dist/locale/zh-tw.mjs';
import en from 'element-plus/dist/locale/en.mjs';

type LanguageType = '中文简体' | '中文繁体' | '英文';

/**
 * 切换语言
 * setup store
 * 在 setup store 中：ref() 就是 state 属性；computed() 就是 getters；function() 就是 actions
 */
export const useLanguageStore = defineStore('language', () => {
    const language = ref<LanguageType>('中文简体');
    const locale = ref(zhCn);
    const languageList = ref([
        { label: '中文简体', value: '中文简体' },
        { label: '中文繁体', value: '中文繁体' },
        { label: '英文', value: '英文' },
    ]);

    const getLanguage = computed(() => language.value);
    const getLocale = computed(() => locale.value);
    const getLanguageList = computed(() => languageList.value);

    function setLanguage(value: LanguageType) {
        language.value = value;
        locale.value = value === '中文简体' ? zhCn : value === '中文繁体' ? zhTw : en;
    }

    return {
        getLanguage,
        getLocale,
        getLanguageList,
        setLanguage,
    };
});

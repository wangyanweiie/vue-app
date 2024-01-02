import { createI18n } from 'vue-i18n';
import zhCnLocale from './language/zh-cn';
import zhTwLocale from './language/zh-tw';
import enLocale from './language/en';

const messages = {
    'zh-cn': {
        ...zhCnLocale,
    },
    'zh-tw': {
        ...zhTwLocale,
    },
    en: {
        ...enLocale,
    },
};

const i18n = createI18n({
    // 使用 composition API
    legacy: false,
    // 语言
    locale: 'zh-cn',
    // 表明使用全局 t 函数
    globalInjection: true,
    messages,
});

export default i18n;

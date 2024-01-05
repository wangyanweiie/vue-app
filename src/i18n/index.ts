import { createI18n } from 'vue-i18n';
import zhCn from './language/zh-cn';
import zhTw from './language/zh-tw';
import en from './language/en';
import { getLanguage } from '@/utils/storage';

const messages = {
    'zh-cn': zhCn,
    'zh-tw': zhTw,
    en,
};

const i18n = createI18n({
    // 使用 composition API
    legacy: false,
    // 语言
    locale: getLanguage() || 'zh-cn',
    // 表明使用全局 t 函数
    globalInjection: true,
    messages,
});

export default i18n;

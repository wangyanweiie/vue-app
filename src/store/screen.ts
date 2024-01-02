import { defineStore } from 'pinia';

interface ScreenState {
    tip: string;
    title: string;
    theme: 'dark' | 'light';
}

/**
 * 切换主题、提示信息、标题
 * option store
 */
export const useScreenStore = defineStore({
    id: 'screen',
    state: (): ScreenState => {
        return {
            tip: 'Lemon',
            title: 'Screen',
            theme: 'dark',
        };
    },
});

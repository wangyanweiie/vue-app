import { defineStore } from 'pinia';

interface ScreenState {
    tip: string;
    title: string;
    theme: 'dark' | 'light';
}

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

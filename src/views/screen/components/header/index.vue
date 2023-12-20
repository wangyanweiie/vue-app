<template>
    <div class="header">
        <div class="header-left">
            <h2>Big Screen</h2>
        </div>

        <div class="header-center">{{ store.title }}</div>

        <div class="header-right">
            <img :src="githubIcon" />
            <img :src="icon" @click="handleChangeTheme" />
            <span>{{ currentTime }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import dayjs from 'dayjs';
import darkIcon from '@/assets/images/screen/qiehuan_dark.png';
import lightIcon from '@/assets/images/screen/qiehuan_light.png';
import githubIconDark from '@/assets/images/screen/github_dark.svg';
import githubIconLight from '@/assets/images/screen/github_light.svg';
import { useScreenStore } from '@/store/screen';

const store = useScreenStore();
const icon = computed(() => (store.theme === 'dark' ? darkIcon : lightIcon));
const githubIcon = computed(() => (store.theme === 'dark' ? githubIconDark : githubIconLight));

/**
 * @description 切换主题
 */
function handleChangeTheme() {
    store.$patch({
        theme: store.theme === 'dark' ? 'light' : 'dark',
    });
}

const currentTime = ref<string>('');
const timeId = ref();

/**
 * @description 更新时间
 */
function updateTime() {
    timeId.value = setTimeout(() => {
        currentTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss');
        updateTime();
    }, 1000);
}

onBeforeUnmount(() => {
    clearTimeout(timeId.value);
});

updateTime();
</script>

<style lang="scss" scoped>
.header {
    position: relative;
    width: 100%;
    height: var(--header-height);
    background-image: url('@/assets/images/screen/header_border_dark.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    animation: fade 3s;

    &-left {
        display: flex;
        align-items: center;
        width: 100%;
    }

    &-center {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        font-weight: bold;
        letter-spacing: 5px;
        text-shadow: 0px 2px 20px rgba(222, 171, 155, 0.6);
    }

    &-right {
        display: flex;
        align-items: center;
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translateY(-80%);

        img {
            width: 25px;
            margin-right: 10px;
            cursor: pointer;
            transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            &:hover {
                transform: scale(1.2);
            }
        }
    }
}

@keyframes fade {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>

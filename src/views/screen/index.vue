<template>
    <div :class="['container', store.theme]">
        <div ref="screenRef" class="screen">
            <screen-header class="screen-header"></screen-header>
            <screen-main class="screen-main"></screen-main>
        </div>
    </div>
</template>

<script setup lang="ts">
import ScreenHeader from './components/header/index.vue';
import ScreenMain from './components/main/index.vue';
import { useScreenStore } from '@/store/screen';
import { useResize } from '@/views/screen/hooks/useResize';

const store = useScreenStore();
const { screenRef } = useResize();
</script>

<style lang="scss" scoped>
.container {
    --container-bg: #161522;
    --container-color: #eee;

    --screen-width: 1920px;
    --screen-height: 1080px;
    --screen-pd: 10px;

    --header-height: 75px;
    --block-bg: #222733;
    --block-mg: 10px;
    --block-pd: 10px;

    position: relative;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    overflow: hidden;
    background: var(--container-bg);
    color: var(--container-color);
}

.screen {
    position: absolute;
    top: 50%;
    left: 50%;
    width: var(--screen-width);
    height: var(--screen-height);
    margin-left: calc(var(--screen-width) * 0.5 - var(--screen-width));
    margin-top: calc(var(--screen-height) * 0.5 - var(--screen-height));
    padding: var(--screen-pd);
    background-size: 100% 100%;
}

.light {
    --container-bg: #eee;
    --container-color: #161522;
    --block-bg: #fff;
}
</style>

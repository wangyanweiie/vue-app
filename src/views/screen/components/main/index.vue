<template>
    <div class="main">
        <div class="main-left">
            <main-left />
        </div>
        <div class="main-center">
            <main-center />
        </div>
        <div class="main-right">
            <main-right />
        </div>
    </div>
</template>

<script setup lang="ts">
import MainCenter from '../../components/main/center/index.vue';
import MainLeft from '../../components/main/left/index.vue';
import MainRight from '../../components/main/right/index.vue';
</script>

<style lang="scss" scoped>
.main {
    width: 100%;
    height: calc(var(--screen-height) - var(--screen-pd) * 2 - var(--header-height));
    display: flex;

    &-center {
        width: 1000px;
        height: 100%;
        margin: 0 var(--block-mg);
    }

    &-left,
    &-right {
        // 为什么需要减 2 倍的 margin => - var(--block-mg) * 2
        width: calc((var(--screen-width) - 1000px - var(--screen-pd) * 2) / 2 - var(--block-mg) * 2);
        height: 100%;
    }
}
</style>

<template>
    <div class="main">
        <div class="main-left">
            <screen-left />
        </div>
        <div class="main-center">
            <screen-center />
        </div>
        <div class="main-right">
            <screen-right />
        </div>
    </div>
</template>

<script setup lang="ts">
import ScreenLeft from '../../components/main/left/index.vue';
import ScreenRight from '../../components/main/right/index.vue';
import ScreenCenter from '../../components/main/center/index.vue';
</script>

<style lang="scss" scoped>
.main {
    width: 100%;
    height: calc(var(--screen-height) - var(--header-height));
    display: flex;

    &-center {
        width: 1000px;
        height: 100%;
        margin: var(--block-mg);
    }

    &-left,
    &-right {
        width: calc((var(--screen-width) - 1000px - var(--screen-pd) * 2) / 2);
        height: 100%;
        margin: var(--block-mg);
    }
}
</style>

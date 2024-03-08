<template>
    <div class="scroll" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
        <div ref="listRef">
            <div v-for="(item, index) in actions" :key="index" class="scroll-item">
                <el-icon size="32" :color="item.color">
                    <component :is="iconobj[item.icon]" />
                </el-icon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Coffee, Dessert, GobletFull, IceCream, IceTea, KnifeFork } from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';
import { type Component, ref } from 'vue';

import { useSeamlessScroll } from '@/views/screen/hooks/useSeamlessScroll';

const listRef = ref();
const { pause, play } = useSeamlessScroll(listRef);

const iconobj: Component = { KnifeFork, IceTea, Coffee, IceCream, Dessert, GobletFull };
const actions = ref([
    { color: 'rgb(24, 144, 255)', icon: 'KnifeFork' },
    { color: 'rgb(255, 192, 105)', icon: 'IceTea' },
    { color: 'rgb(92, 219, 211)', icon: 'Coffee' },
    { color: 'rgb(179, 127, 235)', icon: 'IceCream' },
    { color: 'rgb(255, 133, 192)', icon: 'Dessert' },
    { color: 'rgb(255, 214, 102)', icon: 'GobletFull' },
    { color: 'rgb(24, 144, 255)', icon: 'KnifeFork' },
    { color: 'rgb(255, 192, 105)', icon: 'IceTea' },
    { color: 'rgb(92, 219, 211)', icon: 'Coffee' },
    { color: 'rgb(179, 127, 235)', icon: 'IceCream' },
    { color: 'rgb(255, 133, 192)', icon: 'Dessert' },
]);

function handleMouseOver() {
    pause();
}

function handleMouseOut() {
    play();
}
</script>

<style lang="scss" scoped>
.scroll {
    position: relative;
    width: 1000px;
    height: calc(var(--screen-height) - var(--screen-pd) * 2 - var(--header-height) - 800px);
    overflow: hidden;

    &-item {
        position: absolute;
        top: 35px;
        left: 0;
        width: 150px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--block-bg);
        font-size: 20px;
        font-weight: bold;
    }
}
</style>

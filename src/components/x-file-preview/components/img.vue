<template>
    <div class="container">
        <el-image :src="imgSrc" :preview-src-list="[imgSrc]" />
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        src: string;
    }>(),
    {
        src: '',
    },
);

const imgSrc = computed(() => props.src);
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;

    :deep(.el-image) {
        height: 95%;
    }
}
</style>

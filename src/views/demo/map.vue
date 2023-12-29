<template>
    <div class="wrap">
        <x-map ref="xmapRef"></x-map>
    </div>
</template>

<script setup lang="ts">
const xmapRef = ref();

// xmapRef.value.map.on('rendercomplete', () => {
//     console.log('渲染完成');
// });
</script>
<style lang="scss" scoped>
.wrap {
    width: 100%;
    height: calc(100vh - 135px);
}
</style>

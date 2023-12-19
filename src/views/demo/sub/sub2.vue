<template>
    <div>
        <el-input v-model="str" placeholder="demo-sub2"></el-input>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    name: 'DemoSub2',
});
</script>

<script setup lang="ts">
const str = ref<string>('');
</script>

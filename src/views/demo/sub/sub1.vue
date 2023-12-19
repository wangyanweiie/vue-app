<template>
    <div>
        <el-input v-model="str" v-copy="str" placeholder="demo-sub1"></el-input>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    name: 'DemoSub1',
});
</script>

<script setup lang="ts">
const str = ref<string>('');
</script>

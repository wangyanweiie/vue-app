<template>
    <div>
        <el-input v-model="str" placeholder="menu1-sub2"></el-input>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    name: 'Menu1Sub2',
});
</script>

<script setup lang="ts">
const str = ref<string>('');
</script>

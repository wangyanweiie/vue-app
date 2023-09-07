<template>
    <div>
        <el-input v-model="str" placeholder="menu1-sub2"></el-input>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const str = ref<string>('');
</script>

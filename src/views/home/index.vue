<template>
    <el-card shadow="hover" class="home">
        <div class="home__greeting">
            <h3>{{ `${greeting}${userInfo?.userName || ''}` }}</h3>
            <p>{{ $t('ykN48J3gPiQaRfBOhoBod') }}</p>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { handleFormatAxis } from '@/utils/hooks';
import { getUserInfo } from '@/utils/storage';

const greeting = handleFormatAxis(new Date());
const userInfo = ref(getUserInfo());
</script>

<style scoped>
.home {
    width: 100%;
}
</style>

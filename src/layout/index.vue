<template>
    <el-config-provider :locale="locale">
        <x-layout :routes="showMenus" :include-list="cacheList">
            <template #logo="{ collapsed }">
                <x-logo logo="/logo.png" :title="APP_NAME" :collapsed="collapsed"></x-logo>
            </template>

            <template #header-right>
                <div class="header-right">
                    <el-button type="primary" text bg @click="handleJudge">screen</el-button>

                    <el-select v-model="language" class="header-right__item" @change="setLanguage">
                        <el-option
                            v-for="item in languageList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>

                    <el-input
                        v-if="ENV !== 'production'"
                        v-model="baseUrl"
                        class="header-right__item"
                        @blur="handleBlur"
                    ></el-input>

                    <x-user
                        :user-name="userInfo?.userName"
                        :dropdown-items="dropdownItems"
                        class="header-right__item"
                    ></x-user>
                </div>
            </template>
        </x-layout>

        <x-dialog-form
            ref="formRef"
            v-model="visible"
            v-model:data="form"
            title="修改密码"
            width="30%"
            :schemas="schemas"
            :loading="loading"
            @submit="changePassword"
        ></x-dialog-form>
    </el-config-provider>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { type LanguageType, useLanguageStore } from '@/store/language';
import { usePermissionStore } from '@/store/permission';
import { ENV, APP_NAME } from '@/constant/global';
import useIndex from './useIndex';

const i18 = useI18n();

/**
 * 语言
 * 整体赋值 ＋ 计算属性可以保持响应性
 */
const languageStore = useLanguageStore();
const language = computed(() => languageStore.language);
const locale = computed(() => languageStore.locale);
const languageList = computed(() => languageStore.languageList);
function setLanguage(e: LanguageType) {
    languageStore.setLanguage(e);
    i18.locale.value = e;
}

/**
 * 权限与路由
 * 直接解构会失去响应性
 */
const { showMenus, cacheList } = usePermissionStore();

/**
 * useIndex
 */
const {
    baseUrl,
    userInfo,
    dropdownItems,
    schemas,
    visible,
    formRef,
    loading,
    form,
    handleJudge,
    handleBlur,
    changePassword,
} = useIndex();
</script>
<style lang="scss" scoped>
.header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &__item {
        max-width: 200px;
        margin-left: 10px;
    }
}
</style>

<template>
    <el-config-provider :locale="locale">
        <x-layout :routes="allRoutes" :include-list="cacheList">
            <template #logo="{ collapsed }">
                <x-logo logo="/logo.png" :title="APP_NAME" :collapsed="collapsed"></x-logo>
            </template>

            <template #header-right>
                <div class="header-right">
                    <!-- baseurl -->
                    <el-input v-if="ENV !== 'production'" v-model="baseUrl" disabled placeholder="自动生成"></el-input>

                    <!-- 数字大屏 -->
                    <el-button type="primary" text bg class="header-right__item" @click="handleJudge">screen</el-button>

                    <!-- 语言切换 -->
                    <el-dropdown class="header-right__item">
                        <img src="/svg/language.svg" alt="" width="20" />
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item
                                    v-for="item in languageList"
                                    :key="item.value"
                                    @click="setLanguage(item.value as LanguageType)"
                                >
                                    {{ item.label }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>

                    <!-- 用户信息 -->
                    <x-user
                        :user-name="userInfo?.userName"
                        :dropdown-items="dropdownItems"
                        class="header-right__item"
                    ></x-user>
                </div>
            </template>
        </x-layout>

        <!-- 修改密码弹窗 -->
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

import { APP_NAME, ENV } from '@/constant/global';
import { type LanguageType, useLanguageStore } from '@/store/language';
import { updateRoute, usePermissionStore } from '@/store/permission';

import useIndex from './useIndex';

const i18 = useI18n();

/**
 * 整体赋值 ＋ 计算属性可以保持响应性；
 * 直接解构会失去响应性；
 */
const languageStore = useLanguageStore();
const locale = computed(() => languageStore.locale);
const languageList = computed(() => languageStore.languageList);

function setLanguage(e: LanguageType) {
    i18.locale.value = e;
    languageStore.setLanguage(e);

    // 更新路由
    updateRoute();
}

const permissionStore = usePermissionStore();
const allRoutes = computed(() => permissionStore.routes);
const cacheList = computed(() => permissionStore.cacheList);

/**
 * useIndex
 */
const { baseUrl, userInfo, dropdownItems, schemas, visible, formRef, loading, form, handleJudge, changePassword } =
    useIndex();
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

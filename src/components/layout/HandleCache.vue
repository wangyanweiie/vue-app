<template>
    <div>
        <slot :is-loading="isLoading" :is-latest-version-available="isLatestVersionAvailable" />
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import packageApp from '../../../package.json';

const appVersion = ref<string>(packageApp.version);
const isLoading = ref<boolean>(true);
const isLatestVersionAvailable = ref<boolean>(false);

/**
 * @description 清除缓存并重新加载页面
 */
function clearCacheAndReload() {
    const caches = window.caches;

    if (caches) {
        caches.keys().then(names => {
            for (const name of names) caches.delete(name);
        });
    }

    window.location.reload();
}

/**
 * @description 检查版本是否有更新
 * @param latestVersion 最新版本
 * @param currentVersion 当前版本
 * @returns {boolean} 是否有更新
 */
function checkVersionMismatch(latestVersion: string, currentVersion: string): boolean {
    const latestVersionArray = latestVersion.split(/\./g);
    const currentVersionArray = currentVersion.split(/\./g);

    while (latestVersionArray.length || currentVersionArray.length) {
        const a = Number(latestVersionArray.shift());
        const b = Number(currentVersionArray.shift());

        if (a === b) continue;
        return a > b || isNaN(b);
    }

    return false;
}

/**
 * @description 加载
 */
function load() {
    fetch(`/meta.json?${new Date().getTime()}`, {
        cache: 'no-cache',
    })
        .then(response => response.json())
        .then(meta => {
            const latestVersion = meta.version;
            const currentVersion = appVersion.value;

            // 如果版本不匹配，应当强制刷新
            const shouldForceRefresh = checkVersionMismatch(latestVersion, currentVersion);

            if (shouldForceRefresh) {
                console.log(`New version - ${latestVersion}. Available, need to force refresh`);
                isLoading.value = false;
                isLatestVersionAvailable.value = false;
            } else {
                console.log(`Already latest version - ${latestVersion}. No refresh required.`);
                isLoading.value = false;
                isLatestVersionAvailable.value = true;
            }
        });
}

onMounted(() => {
    load();
});

defineExpose({
    clearCacheAndReload,
});
</script>

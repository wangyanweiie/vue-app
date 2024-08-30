<template>
    <div>
        <vue-office-excel :src="url" />
    </div>
</template>

<script lang="ts" setup>
import '@vue-office/excel/lib/index.css';

import VueOfficeExcel from '@vue-office/excel';
import { defineProps } from 'vue';

import { downloadFileFromURL } from '@/utils/common-methods';

const props = withDefaults(
    defineProps<{
        url: string;
    }>(),
    {
        url: '',
    },
);

function download() {
    downloadFileFromURL(props.url);
}

defineExpose({
    download,
});
</script>

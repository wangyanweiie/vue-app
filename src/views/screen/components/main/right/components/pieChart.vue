<template>
    <x-chart :option="option" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useScreenStore } from '@/store/screen';

const store = useScreenStore();

const option = ref({
    tooltip: {
        trigger: 'item',
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
            color: store.theme === 'dark' ? '#eee' : '#161522',
        },
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' },
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
    ],
});
</script>

<template>
    <el-card :header="header" :shadow="shadow" :body-style="bodyStyle">
        <el-descriptions
            :title="title"
            :border="border"
            :column="column"
            :size="size"
            :extra="extra"
            :direction="direction"
        >
            <el-descriptions-item v-for="(col, index) in columns" :key="index" v-bind="col">
                <slot :name="`${col.prop}Slot`" :data="data" :column="col" :cell-value="data[col.prop]">
                    <span>
                        {{ col?.formatter?.(data, col, data[col.prop]) ?? data[col.prop] }}
                    </span>
                </slot>
            </el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>
<script setup lang="ts">
import type { XDescriptionProp } from './interface';

/**
 * props
 */
withDefaults(defineProps<XDescriptionProp>(), {
    header: '',
    shadow: 'hover',
    bodyStyle: () => {
        return {
            padding: '15px',
        };
    },
    title: '',
    border: true,
    column: 4,
    size: 'default',
    extra: '',
    direction: 'horizontal',
    columns: () => [],
    data: () => ({}),
});
</script>

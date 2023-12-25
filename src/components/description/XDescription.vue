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
import type { XDescriptionColumn } from './interface';

/**
 * props
 */
withDefaults(
    defineProps<{
        /** el-card-header */
        header: string;
        /** el-card-shadow */
        shadow?: 'hover' | 'always' | 'never';
        /** card-body-style */
        bodyStyle?: Record<string, string>;
        /** 标题 */
        title: string;
        /** 边框 */
        border: boolean;
        /** 列 */
        column: number;
        /** 尺寸 */
        size: 'small' | 'default' | 'large';
        /** 操作区文本 */
        extra: string;
        /** 方向 */
        direction: 'horizontal' | 'vertical';
        /** 描述列列表 */
        columns: XDescriptionColumn[];
        /** 描述列数据 */
        data: Record<string, any>;
    }>(),
    {
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
    },
);
</script>

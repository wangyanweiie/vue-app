<template>
    <div class="setting">
        <el-divider direction="vertical" />

        <el-tooltip class="box-item" effect="dark" content="刷新" placement="top">
            <el-icon class="icon" size="20" @click="reload">
                <refresh />
            </el-icon>
        </el-tooltip>

        <el-tooltip class="box-item" effect="dark" content="列设置" placement="top">
            <div :style="{ display: 'inline-block' }">
                <el-popover placement="bottom" trigger="click">
                    <template #reference>
                        <el-icon class="icon icon-setting" size="20">
                            <setting />
                        </el-icon>
                    </template>

                    <div class="setting__header">
                        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
                            全选
                        </el-checkbox>
                    </div>

                    <el-divider :style="{ margin: '5px 0' }" />

                    <draggable
                        :list="columnList"
                        :group="{ name: 'people', pull: true }"
                        class="list"
                        ghost-class="ghost"
                        drag-class="drag"
                        item-key="prop"
                    >
                        <template #item="{ element }">
                            <div class="list__item">
                                <el-checkbox v-model="element.checked" :label="element.label" size="large" />
                            </div>
                        </template>
                    </draggable>
                </el-popover>
            </div>
        </el-tooltip>
    </div>
</template>

<script lang="ts" setup>
import { Setting, Refresh } from '@element-plus/icons-vue';
import type { CheckboxValueType } from 'element-plus';
import type { XTableColumn } from '../interface';
import { cloneDeep } from 'lodash-es';
import draggable from 'vuedraggable';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        /** 列配置项 */
        modelValue: any;
    }>(),
    {
        modelValue: () => [],
    },
);

/**
 * emits
 */
const emits = defineEmits<{
    (e: 'update:modelValue', value: XTableColumn[]): void;
    (e: 'reload'): void;
}>();

/**
 * 全选
 */
const checkAll = ref<boolean>(true);

/**
 * 半选状态
 */
const isIndeterminate = ref<boolean>(false);

/**
 * 表格列
 */
const columnList = ref<XTableColumn[]>([]);

/**
 * 切换全选状态
 */
const handleCheckAllChange = (val: CheckboxValueType) => {
    // 更新全选与半选状态
    checkAll.value = val as boolean;
    isIndeterminate.value = false;

    // 更新表格列配置子项的选中状态
    columnList.value = checkAll.value
        ? columnList.value.map((item: any) => ({ ...item, checked: true }))
        : cloneDeep(props.modelValue).map((item: XTableColumn) => ({ ...item, checked: false }));
};

/**
 * 更新列表
 */
function reload() {
    emits('reload');
}

/**
 * 监听
 */
watch(
    () => columnList.value,
    newValue => {
        // 过滤出选中状态的表格列配置子项
        const newColumnList = newValue.filter((item: XTableColumn) => item.checked);

        // 更新全选与半选状态
        checkAll.value = newColumnList.length === newValue.length ? true : false;
        isIndeterminate.value = newColumnList.length && !checkAll.value ? true : false;

        emits('update:modelValue', newColumnList);
    },
    {
        deep: true,
    },
);

/**
 * 页面渲染之前
 */
onBeforeMount(() => {
    // 给表格列配置子项添加 checked 字段
    columnList.value = cloneDeep(props.modelValue).map((item: XTableColumn) => ({
        ...item,
        checked: true,
    }));
});
</script>

<style lang="scss" scoped>
.icon {
    vertical-align: middle;
    cursor: pointer;
}

.icon-setting {
    margin-left: 7px;
}

.el-divider--horizontal {
    margin: 10px 0;
}

.list {
    max-height: 500px;
    overflow: scroll;

    &__item {
        display: flex;
        justify-content: space-between;
    }
}

.setting__header {
    display: flex;
    justify-content: space-between;
}

.setting {
    min-width: 65px;
}
</style>

<template>
    <el-table-column v-bind="$attrs" :label="label" :prop="prop" min-width="150" :width="width">
        <template #default="scope">
            <el-form-item
                v-if="edit && isEditing(scope.$index)"
                :prop="required ? `model.${scope.$index}.formData.${prop}` : ''"
                :rules="required ? [{ required: true, message: `${label}不能为空`, trigger: 'blur' }] : []"
            >
                <slot
                    name="edit"
                    :index="scope.$index"
                    :row="getEditRow(scope.$index)"
                    :column="scope.column"
                    :actions="editActions"
                >
                    {{ modelValue(scope) }}
                </slot>
            </el-form-item>

            <slot v-else :index="scope.$index" :row="scope.row" :column="scope.column" :actions="editActions">
                {{ modelValue(scope) }}
            </slot>
        </template>
    </el-table-column>
</template>

<script lang="ts" setup>
import type { EditActions, FormModel, FormModelItem, ColumnScope } from '../interface';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        prop: string;
        label: string;
        width?: string;
        edit?: boolean;
        required?: boolean;
    }>(),
    {
        prop: '',
        label: '',
        width: '',
        edit: true,
        required: false,
    },
);

const defaultEditActions: EditActions = {
    addRow: () => {},
    deleteRow: () => {},
    startEdit: () => {},
    cancelEdit: () => {},
    saveEdit: () => {},
};

/**
 * 注入
 */
const editActions = inject<EditActions | undefined>('editActions') ?? defaultEditActions;
const formModel = inject<Ref<FormModel | undefined>>('formModel');

/**
 * 字段值
 */
const modelValue = (scope: ColumnScope) => scope.row?.[props.prop];

/**
 * 行编辑状态
 * @param index 行索引
 */
const isEditing = (index: number): boolean => getEditModel(index).isEditing ?? false;

/**
 * 获取当前编辑行的对象数据
 * @param index 行索引
 */
const getEditModel = (index: number): FormModelItem => {
    if (!formModel || !formModel.value?.model) {
        return {
            isEditing: false,
            isNew: false,
            formData: {},
            data: {},
        };
    }

    return formModel.value.model[index];
};

/**
 * 获取当前编辑行的表单数据
 * @param index 行索引
 */
const getEditRow = (index: number): Record<string, any> => getEditModel(index).formData;
</script>

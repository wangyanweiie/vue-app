<template>
    <component
        :is="handleElType"
        v-model="visible"
        :title="title"
        :width="width"
        :size="size"
        :show-close="showClose"
        append-to-body
        destroy-on-close
        @opened="handleOpen"
        @close="handleClose"
    >
        <template #header>
            <slot name="title"></slot>
        </template>

        <!-- <x-form
            ref="formRef"
            :model-value="modelForm"
            :el-form-props="elFormProps"
            :schemas="schemas"
            @update:model-value="handleUpdate"
        >
        </x-form> -->

        <el-form ref="formRef" :model="modelForm" v-bind="elFormProps">
            <el-row>
                <el-col v-for="(schema, index) in schemas" :key="index" :span="12" v-bind="schema.colProps">
                    <x-form-item :model-value="modelForm" :schema="schema" @update:model-value="handleUpdate">
                        <template #[customSlotName(schema)]>
                            <slot :name="customSlotName(schema)" :form="modelForm"></slot>
                        </template>
                    </x-form-item>
                </el-col>
            </el-row>

            <slot name="form-append"></slot>
        </el-form>

        <template #footer>
            <div class="actions">
                <slot name="action" :form="modelForm" :form-ref="formRef"></slot>

                <el-button v-if="showConfirm" type="primary" :loading="loading" @click="handleSubmit">
                    {{ confirmText }}
                </el-button>
                <el-button @click="handleCancel"> {{ cancelText }} </el-button>
            </div>
        </template>
    </component>
</template>

<script setup lang="ts">
import { ElDialog, ElDrawer, type FormProps } from 'element-plus';
import { computed, ref } from 'vue';

import type { XFormInstance, XFormItemSchema } from './interface';
// import XForm from './XForm.vue';
import XFormItem from './x-form-item.vue';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        /** 双向绑定：是否打开弹窗 */
        modelValue: boolean;
        /** 组件类型 */
        elType?: 'el-dialog' | 'el-drawer';
        /** 弹窗标题 */
        title?: string;
        /** 弹窗宽度 */
        width?: number | string;
        /** 抽屉尺寸 */
        size?: number | string;
        /** 双向绑定：form 表单 */
        data?: any;
        /** 表单配置 */
        schemas?: XFormItemSchema[];
        /** form props */
        elFormProps?: Partial<FormProps>;
        /** 是否显示关闭按钮 */
        showClose?: boolean;
        /** 是否展示提交按钮 */
        showConfirm?: boolean;
        /** 提交 loading */
        loading?: boolean;
        /** 确认文字 */
        confirmText?: string;
        /** 取消文字 */
        cancelText?: string;
    }>(),
    {
        modelValue: false,
        elType: 'el-dialog',
        title: '新增',
        width: '40%',
        size: '40%',
        data: () => ({}),
        schemas: () => [],
        elFormProps: () => ({
            labelWidth: '100px',
        }),
        showClose: true,
        showConfirm: true,
        loading: false,
        confirmText: '确认',
        cancelText: '取消',
    },
);

/**
 * emits
 */
const emits = defineEmits<{
    /** 双向绑定：弹窗是否打开 */
    (e: 'update:modelValue', value: boolean): void;
    /** 双向绑定：form 表单 */
    (e: 'update:data', value: any): void;
    /** 打开弹窗回调 */
    (e: 'open', form: any): void;
    /** 关闭弹窗回调 */
    (e: 'close'): void;
    /** 提交回调 */
    (e: 'submit', form: any): void;
}>();

/**
 * slot-name
 */
function customSlotName(schema: XFormItemSchema): string {
    return schema.components === 'custom' ? schema.slotName : '';
}

/**
 * 弹窗组件
 */
const handleElType = computed(() => {
    if (props.elType === 'el-drawer') {
        return ElDrawer;
    } else {
        return ElDialog;
    }
});

/**
 * 是否展示弹窗
 */
const visible = computed({
    get: () => props.modelValue,
    set: newValue => {
        emits('update:modelValue', newValue);
    },
});

/**
 * form ref
 */
const formRef = ref<XFormInstance>();

/**
 * form
 */
const modelForm = computed<any>({
    get: () => props.data,
    set: value => emits('update:data', value),
});

/**
 * 更新表单数据
 */
function handleUpdate(): void {
    emits('update:data', modelForm.value);
}

/**
 * 打开弹窗
 */
function handleOpen() {
    emits('open', modelForm.value);
}

/**
 * 关闭弹窗
 */
function handleClose() {
    // 重置表单值
    formRef.value?.resetFields();
    modelForm.value = {};
    emits('close');
}

/**
 * 提交
 */
function handleSubmit() {
    emits('submit', modelForm.value);
}

/**
 * 取消
 */
function handleCancel() {
    visible.value = false;
}

/**
 * 表单校验
 */
async function validate(): Promise<boolean> {
    const valid = await formRef.value?.validate();

    if (!valid) {
        return false;
    }

    return true;
}

/**
 * 重置表单
 */
function resetFields() {
    formRef.value?.resetFields();
}

/**
 * 暴露方法
 */
defineExpose({
    validate,
    resetFields,
});
</script>

<style lang="scss" scoped>
.actions {
    width: 100%;
    display: flex;
    justify-content: end;
}
</style>

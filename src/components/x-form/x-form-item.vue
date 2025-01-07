<template>
    <el-form-item v-bind="formItemProps" :label="schema.label" :prop="schema.prop as string">
        <slot v-if="schema.components === 'custom'" :name="schema.slotName"></slot>

        <component
            :is="isComponent"
            v-model:uploadStatus="uploadStatus"
            :model-value="currentValue"
            v-bind="componentProps"
            class="form-item-element"
            @update:model-value="handleUpdate"
            @keydown.enter="handleEnter"
        >
            <template v-if="schema?.components === 'el-divider'" #default>
                <span>
                    {{ schema.label }}
                </span>
            </template>

            <template v-else-if="schema?.components === 'el-select-v2'" #default="{ item }">
                <span :title="item.label">
                    {{ item.label }}
                </span>
            </template>

            <template v-if="!!schema?.tip" #suffix>
                <el-tooltip :content="schema?.tip">
                    <el-icon>
                        <info-filled />
                    </el-icon>
                </el-tooltip>
            </template>
        </component>
    </el-form-item>
</template>

<script setup lang="ts">
import type { InternalRuleItem } from 'async-validator';
import {
    ElButton,
    ElCascader,
    ElCheckbox,
    ElDatePicker,
    ElDivider,
    ElInput,
    ElInputNumber,
    ElRadio,
    ElSelectV2,
    ElSwitch,
    type UploadStatus,
} from 'element-plus';
import { get, isNumber, isString, set } from 'lodash-es';
import { markRaw, mergeProps } from 'vue';

import XRadio from './components/x-radio.vue';
import XSelect from './components/x-select.vue';
import XUpload from './components/x-upload.vue';
import type { SelectOption, XFormItemSchema } from './interface';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        /** 表单配置子项 */
        schema: XFormItemSchema;
        /** form 表单 */
        modelValue: any;
    }>(),
    {
        schema: () => ({
            components: 'el-input',
            prop: '',
            label: '',
        }),
        modelValue: undefined,
    },
);

/**
 * emits
 */
const emits = defineEmits<{
    (e: 'update:modelValue', value: unknown): void;
    (e: 'enter'): void;
}>();

/**
 * markRaw
 * 可以有选择地避开默认的深度响应/只读转换，并在状态关系谱中嵌入原始的、非代理的对象；
 * 它们可能出于各种各样的原因被使用：有些值不应该是响应式的，例如复杂的第三方类实例或 Vue 组件对象；
 */
const maps = {
    'el-divider': markRaw(ElDivider),
    'el-button': markRaw(ElButton),
    'el-switch': markRaw(ElSwitch),
    'el-radio': markRaw(ElRadio),
    'el-checkbox': markRaw(ElCheckbox),
    'el-input': markRaw(ElInput),
    'el-input-number': markRaw(ElInputNumber),
    'el-select-v2': markRaw(ElSelectV2),
    'el-date-picker': markRaw(ElDatePicker),
    'el-cascader': markRaw(ElCascader),
    'x-radio': markRaw(XRadio),
    'x-select': markRaw(XSelect),
    'x-upload': markRaw(XUpload),
};

/**
 * 当响应式数据为 props 时
 * toRef 复制数据时，一次可以复制 props 中的一个数据
 * toRefs 复制数据时，一次可以复制 props 中的一个或多个数据
 */
const { modelValue: modelForm } = toRefs(props);
const { schema } = toRefs(props);

/**
 * item props
 */
const formItemProps = computed(() => {
    const elFormItemProps =
        typeof schema.value.elFormItemProps === 'function'
            ? schema.value.elFormItemProps(props.modelValue)
            : schema.value.elFormItemProps;

    if (props.schema?.components === 'x-upload') {
        const existingRules: any = elFormItemProps?.rules || [];

        const mergedRules = existingRules?.concat({
            validator: validFileUploading,
        });

        return {
            ...elFormItemProps,
            rules: mergedRules,
        };
    }

    return elFormItemProps;
});

/**
 * is component
 */
const isComponent = computed<any>(() => {
    return get(maps, schema.value.components, undefined);
});

/**
 * _.get(object, path, [defaultValue])
 * 根据 object 对象的 path 路径获取值，如果解析 value 是 undefined 会以 defaultValue 取代；
 *
 * 此处：get(modelForm, schema.value.prop, undefined)
 * 等价于：modelForm[schema.value.prop] ?? undefined
 */
const currentValue = ref<unknown>(get(modelForm, schema.value.prop, undefined));

/**
 * 文件上传状态
 */
const uploadStatus = ref<UploadStatus>();

/**
 * 校验文件是否正在上传
 */
function validFileUploading(_rule: InternalRuleItem, _value: string, callback: (error?: string | Error) => void) {
    if (uploadStatus.value === 'uploading') {
        return callback(new Error('文件正在上传中，请稍后'));
    }

    callback();
}

/**
 * extra props
 * 用于解决 computed 属性不触发更新的问题
 */
const extraProps = ref({
    options: [],
});

/**
 * 查询
 */
function handleEnter(): void {
    emits('enter');
}

/**
 * 获取下拉的 label
 */
function getSelectedLabel(value: any | any[]) {
    if (componentProps.value.multiple) {
        const selectedLabels =
            value
                .map((id: any) => componentProps.value.options.find((item: SelectOption) => item.value === id))
                .map((item: SelectOption) => item.label) ?? '';
        emits('update:modelValue', set(modelForm.value, componentProps.value.labelSchema, selectedLabels.toString()));
    } else {
        const selectedLabel =
            componentProps.value.options.find((item: SelectOption) => item.value === value)?.label ?? '';
        emits('update:modelValue', set(modelForm.value, componentProps.value.labelSchema, selectedLabel));
    }
}

/**
 * 更新当前值
 */
function handleUpdate(value: string | number | null | undefined): void {
    let updateValue = value;

    // 文本字符串/数字
    if (isString(currentValue.value)) {
        updateValue = updateValue ?? '';
    } else if (isNumber(currentValue.value)) {
        if (updateValue === undefined || updateValue === null) {
            updateValue = null;
        }
    }

    // 下拉
    if (['el-select-v2', 'x-select'].includes(schema.value.components)) {
        if (componentProps.value.labelSchema) {
            getSelectedLabel(updateValue);
        }
    }

    currentValue.value = updateValue;
    emits('update:modelValue', set(modelForm.value, schema.value.prop, updateValue));
}

/**
 * 获取下拉列表
 */
async function getResource(): Promise<boolean> {
    if (
        schema.value.components !== 'el-select-v2' &&
        schema.value.components !== 'el-cascader' &&
        schema.value.components !== 'x-select'
    ) {
        return false;
    }

    if (!schema.value.api) {
        return false;
    }

    const res = await schema.value.api(props.modelValue);

    // 更新下拉列表
    extraProps.value = {
        options: res,
    };

    // 通过 label 回显
    const label = props.modelValue[schema.value.elProps?.labelSchema];

    if (!label) {
        return true;
    }

    const item = componentProps.value.options.find((item: SelectOption) => item.label === label);

    if (!item) {
        return true;
    }

    handleUpdate(item.value);
    return true;
}

/**
 * component props
 */
const componentProps = computed<any>(() => {
    const defaultProps = {
        placeholder: schema.value.label,
        clearable: true,
    };

    if (schema.value.components === 'custom') {
        return undefined;
    }

    if (['el-select-v2', 'x-select', 'el-cascader'].includes(schema.value.components)) {
        Object.assign(defaultProps, {
            onVisibleChange: async (val: boolean): Promise<void> => {
                if (!val) {
                    return;
                }

                await getResource();
            },
            filterable: true,
            options: [],
        });
    }

    // merge props
    if (typeof schema.value.elProps === 'function') {
        // props.modelValue => form 表单
        const sec = schema.value.elProps(props.modelValue);
        return mergeProps(defaultProps, extraProps.value, sec);
    } else {
        return mergeProps(defaultProps, extraProps.value, schema.value.elProps);
    }
});

/**
 * 监听外部数据变化
 */
watchEffect(() => {
    currentValue.value = get(modelForm.value, schema.value.prop, undefined);
});

/**
 * 页面渲染
 */
onMounted(() => {
    getResource();
});
</script>

<style lang="scss">
.form-item-element {
    width: 100%;
}
</style>

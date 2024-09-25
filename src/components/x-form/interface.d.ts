import type {
    RadioProps,
    ColProps,
    FormItemProps,
    InputNumberProps,
    InputProps,
    SwitchProps,
    RadioGroupProps,
    CheckboxGroupProps,
    CheckboxProps,
    ButtonProps,
    DividerProps,
    FormValidateCallback,
    FormValidationResult,
    FormItemProp,
    FormProps,
    ElSelect,
    ElSelectV2,
    UploadProps,
} from 'element-plus';
import type { Arrayable } from 'element-plus/es/utils';
import type { ExtractPropTypes } from 'vue';

/**
 * x-form-item 基础类型
 */
interface BaseXFormSchema<T> {
    label: string;
    prop: keyof T | '';
    tip?: string;
    components: ComponentTypes;
    elFormItemProps?: Partial<FormItemProps> | ((form: any) => Partial<FormItemProps>);
    colProps?: Partial<ColProps>;
}

/**
 * x-form-item el-divider
 */
interface XFormItemDividerSchema<T> extends BaseXFormSchema<T> {
    components: 'el-divider';
    elProps?: Partial<DividerProps> | ((form: any) => Partial<DividerProps>);
}

/**
 * x-form-item el-button
 */
interface XFormItemButtonSchema<T> extends BaseXFormSchema<T> {
    components: 'el-button';
    elProps?: Partial<ButtonProps> | ((form: any) => Partial<ButtonProps>);
}

/**
 * x-form-item el-switch
 */
interface XFormItemSwitchSchema<T> extends BaseXFormSchema<T> {
    components: 'el-switch';
    elProps?: Partial<SwitchProps> | ((form: any) => Partial<SwitchProps>);
}

/**
 * x-form-item el-checkbox
 */
interface XFormItemCheckBoxSchema<T> extends BaseXFormSchema<T> {
    components: 'el-checkbox';
    elProps?: Partial<XCheckBoxProps> | ((form: any) => Partial<XCheckBoxProps>);
}

/**
 * x-form-item el-input
 */
interface XFormItemInputSchema<T> extends BaseXFormSchema<T> {
    components: 'el-input';
    elProps?: Partial<InputProps> | ((form: any) => Partial<InputProps>);
}

/**
 * x-form-item el-input-number
 */
interface XFormItemInputNumberSchema<T> extends BaseXFormSchema<T> {
    components: 'el-input-number';
    elProps?: Partial<InputNumberProps> | ((form: any) => Partial<InputNumberProps>);
}

/**
 * x-form-item el-select
 */
interface XFormItemSelectSchema<T> extends BaseXFormSchema<T> {
    components: 'el-select-v2';
    elProps?: XSelectProps | ((form: any) => XSelectProps);
    api?: (data?: any) => Promise<any>;
}

/**
 * x-form-item el-date-picker
 */
interface XFormItemDatePickerSchema<T> extends BaseXFormSchema<T> {
    components: 'el-date-picker';
    elProps?:
        | Partial<DatePickerProps & { onChange: (val: string) => void }>
        | ((form: T, formRef?: FormInstance) => Partial<DatePickerProps & { onChange: (val: string) => void }>);
}

/**
 * x-form-item el-cascader
 */
interface XFormItemCascaderSchema<T> extends BaseXFormSchema<T> {
    components: 'el-cascader';
    elProps?: any | ((form: any) => any);
    api?: (data?: any) => Promise<any>;
}

/**
 * x-form-item x-radio
 */
interface XFormItemRadioSchema<T> extends BaseXFormSchema<T> {
    components: 'x-radio';
    elProps?: XRadioProps | ((form: any) => XRadioProps);
}

/**
 * x-form-item x-select
 */
interface XFormItemSelectMultiSchema<T> extends BaseXFormSchema<T> {
    components: 'x-select';
    elProps?: XSelectMultiProps | ((form: any) => XSelectMultiProps);
    api?: (data?: any) => Promise<any>;
    isAllChoose?: boolean;
}

/**
 * x-form-item x-upload
 */
interface XFormItemUploadSchema<T = any> extends BaseXFormSchema<T> {
    components: 'x-upload';
    valueType?: 'string' | 'array';
    elProps?: Partial<UploadProps> | ((form: T, formRef?: FormInstance) => Partial<UploadProps>);
}

/**
 * x-form-item custom
 */
interface XFormItemCustomSchema<T> extends BaseXFormSchema<T> {
    components: 'custom';
    slotName: string;
}

type ComponentTypes =
    | 'el-divider'
    | 'el-button'
    | 'el-switch'
    | 'el-checkbox'
    | 'el-input'
    | 'el-input-number'
    | 'el-select-v2'
    | 'el-date-picker'
    | 'el-cascader'
    | 'x-radio'
    | 'x-checkbox'
    | 'x-select'
    | 'x-upload'
    | 'custom';

/**
 * x-form-item
 */
type XFormItemSchema<T = any> =
    | XFormItemDividerSchema<T>
    | XFormItemButtonSchema<T>
    | XFormItemSwitchSchema<T>
    | XFormItemCheckBoxSchema<T>
    | XFormItemInputSchema<T>
    | XFormItemInputNumberSchema<T>
    | XFormItemSelectSchema<T>
    | XFormItemDatePickerSchema<T>
    | XFormItemCascaderSchema<T>
    | XFormItemRadioSchema<T>
    | XFormItemSelectMultiSchema<T>
    | XFormItemUploadSchema<T>
    | XFormItemCustomSchema<T>;

/**
 * x-form ref
 */
interface XFormInstance {
    validate: (callback?: FormValidateCallback | undefined) => FormValidationResult;
    resetFields: (props?: Arrayable<FormItemProp> | undefined) => void;
}

/**
 * el-form-props
 */
type ElFormProps = Partial<FormProps>;

/**
 ************* other *************
 */
type RadioType = 'cycle' | 'button';
type CheckboxType = 'box' | 'button';
type RadioValueType = string | number | boolean | undefined;
type SelectValueType = string | number | boolean | undefined;

interface RadioOption extends Partial<RadioProps> {
    labelName?: string;
}

interface CheckBoxOption extends Partial<CheckboxProps> {
    labelName?: string;
}

interface SelectOption {
    label: string;
    value: string | number | boolean | undefined;
}

interface XRadioProps extends Partial<RadioGroupProps> {
    options?: RadioOption[];
}

interface XCheckBoxProps extends Partial<CheckboxGroupProps> {
    options?: CheckBoxOption[];
}

interface XSelectProps extends ExtractPropTypes<typeof ElSelectV2> {
    // label 字段表示
    labelSchema?: string;
}

interface XSelectMultiProps extends ExtractPropTypes<typeof ElSelect> {
    // label 字段表示
    labelSchema?: string;
}

export type {
    BaseXFormSchema,
    XFormItemDividerSchema,
    XFormItemButtonSchema,
    XFormItemSwitchSchema,
    XFormItemCheckBoxSchema,
    XFormItemInputSchema,
    XFormItemInputNumberSchema,
    XFormItemSelectSchema,
    XFormItemDatePickerSchema,
    XFormItemRadioSchema,
    XFormItemSelectMultiSchema,
    XFormItemCascaderSchema,
    XFormItemUploadSchema,
    XFormItemCustomSchema,
    ComponentTypes,
    XFormItemSchema,
    XFormInstance,
    ElFormProps,
    RadioType,
    CheckboxType,
    RadioValueType,
    SelectValueType,
    RadioOption,
    CheckBoxOption,
    SelectOption,
    XRadioProps,
    XCheckBoxProps,
    XSelectProps,
    XSelectMultiProps,
};

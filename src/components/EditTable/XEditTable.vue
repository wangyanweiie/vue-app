<template>
    <el-card :shadow="shadow" :header="header" :body-style="bodyStyle">
        <!-- 顶部区域 -->
        <div class="table__header">
            <div class="table__header__title">
                <slot name="title">
                    <span>{{ title }}</span>

                    <el-tooltip v-if="tooltipContent" :content="tooltipContent" placement="top">
                        <el-icon class="icon">
                            <info-filled />
                        </el-icon>
                    </el-tooltip>
                </slot>
            </div>

            <el-scrollbar>
                <div class="table__header__operation">
                    <slot name="operation"></slot>
                </div>
            </el-scrollbar>
        </div>

        <!-- 表格主体 -->
        <el-form ref="formRef" :model="formModel" class="table__main'">
            <el-table v-bind="$attrs" border size="small" :data="tableData" :row-key="rowKey">
                <!-- 选择列 -->
                <el-table-column v-if="selectable" type="selection" align="center" width="50px" reserve-selection />

                <!-- 索引列 -->
                <el-table-column v-if="showIndex" type="index" align="center" width="50px" label="#" />

                <!-- slot -->
                <slot> </slot>
            </el-table>
        </el-form>
    </el-card>
</template>

<script lang="ts" setup>
import type { RequestFunc, FormModelItem, FormModel, EditActions } from './interface';

/**
 * props
 */
const props = withDefaults(
    defineProps<{
        /** el-card-header */
        header: string;
        /** el-card-shadow */
        shadow?: 'hover' | 'always' | 'never';
        /** card-body-style */
        bodyStyle?: Record<string, string>;
        /** 标题 */
        title?: string;
        /** 感叹号提示内容 */
        tooltipContent?: string;
        /** 是否展示索引 */
        showIndex?: boolean;
        /** 是否可选 */
        selectable?: boolean;
        /** 行数据 key 值 */
        rowKey?: string;
        /** 表格数据 */
        dataSource?: Record<string, unknown>[];
        /** 请求接口 */
        api?: RequestFunc<any> | null;
        /** 请求接口参数 */
        apiParams?: Record<string, string | number>;
    }>(),
    {
        header: '',
        shadow: 'hover',
        bodyStyle: () => {
            return {
                padding: '15px',
            };
        },
        title: '数据列表',
        tooltipContent: '',
        showIndex: false,
        selectable: false,
        rowKey: 'id',
        dataSource: () => [],
        api: null,
        apiParams: () => ({}),
    },
);

/**
 * 表单
 */
const formRef = ref();
const formModel = ref<FormModel>({
    model: [],
});

/**
 * 表格数据
 */
const tableData = computed(() => formModel.value.model.map(({ data }) => data));

/**
 * 结果数据
 */
const resultData = computed(() =>
    formModel.value.model.reduce((result: Record<string, unknown>[], modelItem: FormModelItem) => {
        if (modelItem.isNew) {
            return result;
        }

        result.push({
            ...modelItem.data,
        });

        return result;
    }, []),
);

/**
 * 处理数据结构进行渲染
 */
const convertFormModel = (data: Record<string, unknown>[]): FormModelItem[] =>
    data.map(
        (row: Record<string, unknown>): FormModelItem => ({
            data: { ...row },
            formData: { ...row },
            isEditing: false,
            isNew: false,
        }),
    );

/**
 * 获取数据
 */
async function loadData(): Promise<void> {
    let model = [];

    if (props.api) {
        const res = await props.api({
            ...props.apiParams,
        });

        if (!res) {
            return;
        }

        model = res ?? [];
    } else {
        model = props.dataSource ?? [];
    }

    formModel.value.model = convertFormModel(model);
}

/**
 * 添加行
 * @param row 行数据
 */
const addRow = (row: Record<string, unknown> = {}) => {
    formModel.value.model.push({
        data: { ...row },
        formData: { ...row },
        isEditing: true,
        isNew: true,
    });
};

/**
 * 删除行
 * @param index 行索引
 */
const deleteRow = (index: number) => {
    formModel.value.model.splice(index, 1);
};

/**
 * 编辑行
 * @param index 行索引
 */
const startEdit = (index: number) => {
    formModel.value.model[index].isEditing = true;
};

/**
 * 取消编辑
 * @param index 行索引
 */
const cancelEdit = (index: number) => {
    formRef.value.resetFields();

    // 重置表格结构与行数据
    formModel.value.model[index].formData = {
        ...formModel.value.model[index].data,
    };
    formModel.value.model[index].isNew
        ? formModel.value.model.splice(index, 1)
        : (formModel.value.model[index].isEditing = false);
};

/**
 * 保存编辑
 * @param index 行索引
 */
const saveEdit = async (index: number) => {
    // 循环表单验证
    let formValid = false;
    await formRef.value.validate((valid: boolean) => {
        formValid = valid;
    });

    if (!formValid) {
        return false;
    }

    // 更新表格行数据
    formModel.value.model[index].data = {
        ...formModel.value.model[index].formData,
    };
    formModel.value.model[index].isEditing = false;
    formModel.value.model[index].isNew = false;
};

/**
 * 编辑事件
 */
const editActions: EditActions = {
    addRow,
    deleteRow,
    startEdit,
    cancelEdit,
    saveEdit,
};

/**
 * 监听
 */
watchEffect(() => {
    loadData();
});

/**
 * 提供
 */
provide<Ref<FormModel>>('formModel', formModel);
provide<EditActions>('editActions', editActions);

/**
 * 暴露的属性与方法
 */
defineExpose({
    resultData,
    editActions,
});
</script>
<style lang="scss" scoped>
.table {
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        padding: 0 10px 10px 10px;

        &__title {
            justify-content: left;

            span {
                font-size: 17px;
                font-weight: bold;
            }

            .icon {
                margin-left: 10px;
                transform: translateY(0.1em);
            }
        }

        &__operation {
            display: flex;
            align-items: center;
        }
    }
}
</style>

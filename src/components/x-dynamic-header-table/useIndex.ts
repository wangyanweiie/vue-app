import type { TableInstance } from 'element-plus';
import { cloneDeep } from 'lodash-es';

import type { XDynamicHeaderTableProp, XTableActionButton, XTableColumn, XTablePagination } from './interface';

/**
 * @description useIndex
 * @param props 组件传参
 */
export default function useIndex(props: XDynamicHeaderTableProp) {
    /**
     * 按钮每个字符所占宽度
     */
    const WIDTH_PER_CHAR = 20;

    /**
     * 操作栏最小宽度
     */
    const ACTION_COLUMN_MIN_WIDTH = 150;

    /**
     * table ref
     */
    const tableRef = ref<TableInstance>();

    /**
     * 表格 tableLoading
     */
    const tableLoading = ref<boolean>(props.loading || false);

    /**
     * 表格数据
     */
    const tableData = ref<Record<string, any>[]>([]);

    /**
     * 表格列配置
     */
    const tableColumns = ref<any[]>();

    /**
     * 分页设置
     */
    const pagination = ref<XTablePagination>({
        pageSize: 10,
        currentPage: 1,
        total: 0,
    });

    /**
     * 序号展示
     * @param index 序号
     */
    function handleIndex(index: number) {
        if (props.continuous) {
            return (pagination.value.currentPage - 1) * pagination.value.pageSize + index + 1;
        }

        return index + 1;
    }

    /**
     * 选中的行数据
     */
    const selectedRows = ref<Record<string, any>[]>([]);

    /**
     * 选中的行数据数量
     */
    const selectedCount = computed<number>(() => selectedRows.value.length);

    /**
     * 改变选中状态
     * @param selection 选中行数据
     */
    function handleSelectChange(selection: Record<string, any>[]) {
        selectedRows.value = selection;
    }

    /**
     * 是否可以选中当前行数据
     * @param row 行数据
     */
    function selectableValue(row: Record<string, any>) {
        return row.selected || true;
    }

    /**
     * 数据回显勾选
     */
    function handleToggleRowSelection() {
        if (!props.selectable || !props.rowKey || !props.selectedList || props.selectedList.length === 0) {
            return;
        }

        props.selectedList.forEach(selected => {
            tableData.value.forEach(row => {
                if (selected[props.rowKey as string] === row[props.rowKey as string]) {
                    nextTick(() => {
                        tableRef.value?.toggleRowSelection(row, true);
                    });
                }
            });
        });
    }

    /**
     * 查询条件
     */
    const searchData = ref<Record<string, string | number>>({});

    /**
     * 获取表格数据
     * @param query 查询参数
     */
    async function loadData(query: Record<string, string | number> = {}): Promise<void> {
        searchData.value = query;

        // 1.动态赋值，分页接口
        if (props.api && props.dividePage) {
            tableLoading.value = true;

            const params = {
                ...props.apiParams,
                ...query,
                [props.apiKeyMap?.queryCurrentPageKey || 'page']: pagination.value.currentPage,
                [props.apiKeyMap?.queryPageSizeKey || 'limit']: pagination.value.pageSize,
            };

            const res = await props.api(params);

            if (!res) {
                tableLoading.value = false;
                return;
            }

            tableLoading.value = false;
            tableData.value = res[props.apiKeyMap?.returnRecordKey || 'records'] || [];
            pagination.value.currentPage = res[props.apiKeyMap?.returnCurrentPageKey || 'current'];
            pagination.value.pageSize = res[props.apiKeyMap?.returnCurrentSizeKey || 'limit'];
            pagination.value.total = res[props.apiKeyMap?.returnTotalKey || 'total'];
        }

        // 2.动态赋值，非分页接口，不渲染分页
        if (props.api && !props.dividePage) {
            pagination.value.pageSize = -1;

            const params = {
                ...props.apiParams,
                ...query,
            };

            const res = await props.api(params);

            if (!res) {
                return;
            }

            tableData.value = res || [];
        }

        // 3.静态赋值，假分页
        if (!props.api && props.dividePage && Array.isArray(props.data)) {
            pagination.value.currentPage = 1;
            pagination.value.total = props.data.length;
            tableData.value = props.data.slice(0, pagination.value.pageSize);
        }

        // 4.静态赋值，不渲染分页
        if (!props.api && !props.dividePage && Array.isArray(props.data)) {
            pagination.value.pageSize = -1;
            tableData.value = props.data;
        }

        clearSelection();
        handleToggleRowSelection();
    }

    /**
     * 假分页
     */
    function handleFalsePage() {
        const skipNum = (pagination.value.currentPage - 1) * pagination.value.pageSize;
        tableData.value =
            skipNum + pagination.value.currentPage >= props.data!.length
                ? props.data!.slice(skipNum, props.data!.length)
                : props.data!.slice(skipNum, skipNum + pagination.value.pageSize);

        handleToggleRowSelection();
    }

    /**
     * 改变每页数量
     */
    async function handleSizeChange() {
        if (props.api) {
            loadData(searchData.value);
            selectedRows.value = tableRef.value?.getSelectionRows();
        } else {
            handleFalsePage();
        }
    }

    /**
     * 改变页码
     */
    async function handleCurrentChange() {
        if (props.api) {
            loadData(searchData.value);
            selectedRows.value = tableRef.value?.getSelectionRows();
        } else {
            handleFalsePage();
        }
    }

    /**
     * 是否存在操作列
     */
    const hasActionBtn = ref<boolean>(true);

    /**
     * 操作列的宽度
     */
    const actionsWidth = ref<number | string>(0);

    /**
     * action buttons
     * @param row 行数据
     * @param index 序号
     * @returns 操作按钮
     */
    function actionButtons(row: Record<string, any>, index: number): XTableActionButton[] {
        if (typeof props.actions !== 'function') {
            return [];
        }

        const buttons = props.actions(row, index);

        // 更新是否展示操作列
        hasActionBtn.value = !!buttons.length;

        // 计算操作列的宽度
        const width =
            buttons.reduce((preValue: number, currentValue: XTableActionButton) => {
                return preValue + (currentValue?.label?.length || 0);
            }, 0) * WIDTH_PER_CHAR;

        if (props.actionWidth) {
            actionsWidth.value = props.actionWidth;
        } else {
            actionsWidth.value = width < ACTION_COLUMN_MIN_WIDTH ? ACTION_COLUMN_MIN_WIDTH : width;
        }

        return buttons;
    }

    /**
     * 获取选中值
     */
    function getSelectedRows(): Record<string, any>[] {
        return selectedRows.value;
    }

    /**
     * 清空选中
     */
    function clearSelection(): void {
        tableRef.value?.clearSelection();
    }

    /**
     * 获取表格数据
     */
    function getTableData(): Record<string, any>[] {
        return tableData.value;
    }

    /**
     * 监听表格列配置
     */
    watch(
        () => props.columns,
        (newValue: any[]) => {
            tableColumns.value = cloneDeep(newValue);
        },
    );

    /**
     * 监听表格数据
     */
    watch(
        () => props.data,
        newValue => {
            if (Array.isArray(newValue)) {
                loadData();
            }
        },
        {
            deep: true,
        },
    );

    /**
     * 页面渲染
     */
    onMounted(async () => {
        tableColumns.value = cloneDeep<XTableColumn[]>(props.columns);

        if (!props.lazy) {
            loadData();
        }
    });

    return {
        tableRef,
        tableLoading,
        tableColumns,
        tableData,
        pagination,
        selectedRows,
        selectedCount,
        handleSelectChange,
        handleIndex,
        selectableValue,
        searchData,
        loadData,
        handleSizeChange,
        handleCurrentChange,
        handleToggleRowSelection,
        hasActionBtn,
        actionsWidth,
        actionButtons,
        getSelectedRows,
        clearSelection,
        getTableData,
    };
}

import type { TableInstance } from 'element-plus';
import type {
    XTablePagination,
    XTableColumn,
    XTableActionButton,
    XTableProp,
    XTableSpanMethodProps,
} from './interface';
import { cloneDeep } from 'lodash-es';

/**
 * @description useIndex
 * @param props 组件传参
 */
export default function useIndex(props: XTableProp) {
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
    const tableLoading = ref<boolean>(props.loading ?? false);

    /**
     * 表格数据
     */
    const tableData = ref<Record<string, any>[]>([]);

    /**
     * 表格列配置
     */
    const tableColumns = ref<XTableColumn[]>();

    /**
     * 分页设置
     */
    const pagination = ref<XTablePagination>({
        pageSize: 10,
        currentPage: 1,
        total: 0,
    });

    /**
     * 树形结构
     */
    const treeProps = computed(() => {
        if (props.isTree && props.elTableProps?.treeProps) {
            return props.elTableProps.treeProps;
        } else {
            return {};
        }
    });

    /**
     * 序号展示
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
    const selectedCount = computed<number>(() => selectedRows.value.length ?? 0);

    /**
     * 改变选中状态
     */
    function handleSelectChange(selection: Record<string, any>[]) {
        selectedRows.value = selection;
    }

    /**
     * 是否可以选中当前行数据
     * @param row 行数据
     */
    function selectableValue(row: Record<string, any>) {
        return row.selected ?? true;
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
                [props.apiKeyMap?.queryCurrentPageKey ?? 'page']: pagination.value.currentPage,
                [props.apiKeyMap?.queryPageSizeKey ?? 'limit']: pagination.value.pageSize,
            };

            const res = await props.api(params);

            if (!res) {
                tableLoading.value = false;
                return;
            }

            tableLoading.value = false;
            tableData.value = res[props.apiKeyMap?.returnRecordKey ?? 'records'] ?? [];
            pagination.value.currentPage = res.data[props.apiKeyMap?.returnCurrentPageKey ?? 'current'];
            pagination.value.pageSize = res.data[props.apiKeyMap?.returnCurrentSizeKey ?? 'limit'];
            pagination.value.total = res.data[props.apiKeyMap?.returnTotalKey ?? 'total'];
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

            tableData.value = res.data ?? [];
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
            await loadData(searchData.value);
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
            await loadData(searchData.value);
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
    const actionsWidth = ref<number>(0);

    /**
     * action buttons
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
                return preValue + (currentValue.label?.length ?? 0);
            }, 0) * WIDTH_PER_CHAR;

        actionsWidth.value = width < ACTION_COLUMN_MIN_WIDTH ? ACTION_COLUMN_MIN_WIDTH : width;

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
     * FIXME: 合并单元格方法
     */
    let cellList: number[] = [];
    let count: number = 0;

    /**
     * 遍历单元格
     * @param data 表格数据
     */
    function computeCell(data: Record<string, any>[]) {
        if (!props.combineField) {
            return;
        }

        cellList = [];
        count = 0;
        for (let i = 0; i < data.length; i++) {
            // 先设置第一项
            if (i === 0) {
                // 初始值为 1，若下一项和此项相同，就往 cellList 数组中追加 0
                cellList.push(1);
                // 初始计数为 0
                count = 0;
            } else {
                if (data[i][props.combineField as string] == data[i - 1][props.combineField as string]) {
                    // 增加计数
                    cellList[count] += 1;
                    // 相等就往 cellList 数组中追加 0
                    cellList.push(0);
                } else {
                    // 不等就往 cellList 数组中追加 1
                    cellList.push(1);
                    // 将索引赋值为计数
                    count = i;
                }
            }
        }
    }

    /**
     * 合并单元格-首列
     */
    function spanMethod({ rowIndex, columnIndex }: XTableSpanMethodProps) {
        if (!props.columnIndex || props.columnIndex?.length === 0) {
            return;
        }

        computeCell(tableData.value);

        if (props.columnIndex?.includes(columnIndex)) {
            const rowspan = cellList[rowIndex];
            const colspan = rowspan > 0 ? 1 : 0;

            return {
                rowspan,
                colspan,
            };
        }
    }

    /**
     * 监听表格列配置
     */
    watch(
        () => props.columns,
        (newValue: XTableColumn[]) => {
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
                loadData({});
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
            await loadData();
        }
    });

    return {
        tableRef,
        tableLoading,
        tableColumns,
        tableData,
        pagination,
        treeProps,
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
        spanMethod,
    };
}

import { ElCheckbox, type CheckboxValueType, type Column, type TableV2Instance } from 'element-plus';
import type { XTableV2Pagination, XTableV2Prop } from './interface';
import { cloneDeep } from 'lodash-es';

/**
 * @description useIndex
 * @param props 组件传参
 */
export default function useIndex(props: XTableV2Prop) {
    /**
     * 查询条件
     */
    const searchData = ref<Record<string, string | number>>({});

    /**
     * 表格数据
     */
    const tableData = ref<Record<string, any>[]>([]);

    /**
     * 分页设置
     */
    const pagination = ref<XTableV2Pagination>({
        pageSize: 10,
        currentPage: 1,
        total: 0,
    });

    /**
     * 选中的行数据
     */
    const selectedRows = computed(() => {
        return tableData.value.filter((row: Record<string, any>) => row.checked);
    });

    /**
     * 选中的行数据数量
     */
    const selectedCount = computed<number>(() => selectedRows.value.length);

    /**
     * 初始化表格数据
     * @param query 查询条件
     */
    async function loadData(query: Record<string, string | number> = {}): Promise<void> {
        // 保存请求的查询条件，分页时切换页码时作为入参
        searchData.value = query;

        // 更新每页渲染数量
        pagination.value.pageSize = props.paginationProp?.pageSize || 10;

        // 1.动态赋值，分页接口
        if (props.api && props.dividePage) {
            const params = {
                ...props.apiParams,
                ...query,
                [props.apiKeyMap?.queryCurrentPageKey || 'page']: pagination.value.currentPage,
                [props.apiKeyMap?.queryPageSizeKey || 'limit']: pagination.value.pageSize,
            };

            const res = await props.api(params);

            if (!res) {
                return;
            }

            tableData.value = res.data[props.apiKeyMap?.returnRecordKey || 'records'] || [];
            pagination.value.currentPage = res.data[props.apiKeyMap?.returnCurrentPageKey || 'current'];
            pagination.value.pageSize = res.data[props.apiKeyMap?.returnCurrentSizeKey || 'limit'];
            pagination.value.total = res.data[props.apiKeyMap?.returnTotalKey || 'total'];
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

            tableData.value = res.data || [];
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
    }

    /**
     * 改变每页数量
     */
    async function handleSizeChange() {
        if (props.api) {
            await loadData(searchData.value);
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
        } else {
            handleFalsePage();
        }
    }

    /**
     * 静态赋值时更新 tableData
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
     * 渲染复选框
     * @param param.value 选中状态
     * @param param.intermediate 半选状态
     * @param param.onChange 改变事件
     */
    function SelectionCell({ value, intermediate = false, onChange }: any) {
        return h(ElCheckbox, {
            modelValue: value,
            indeterminate: intermediate,
            onChange: onChange,
        });
    }

    /**
     * 渲染表格选择列
     * @param param.rowData 行数据
     */
    function selectCellRenderer({ rowData }: any) {
        // change 事件
        const onChange = (value: CheckboxValueType) => (rowData.checked = value);

        return SelectionCell({
            value: rowData.checked,
            onChange: onChange,
        });
    }

    /**
     * 渲染表头选择列
     */
    function headerSelectCellRenderer() {
        const data = ref(tableData.value);
        const _data = unref(data);

        // change 事件
        const onChange = (value: CheckboxValueType) =>
            (data.value = _data.map(row => {
                row.checked = value;
                return row;
            }));

        // 是否存在选中状态
        const containsChecked = _data.some(row => row.checked);

        // 是否全选
        const allSelected = _data.every(row => row.checked);

        return SelectionCell({
            value: allSelected,
            intermediate: containsChecked && !allSelected,
            onChange: onChange,
        });
    }

    /**
     * 表格列配置
     */
    const tableColumns = computed(() => {
        // 设置每列默认宽度与默认对齐方式
        const columns: Column<any>[] = cloneDeep(props.columns).map(item => {
            return {
                ...item,
                width: item.width || 150,
                align: item.align || 'center',
            };
        });

        // 添加索引列
        if (props.showIndex) {
            columns.unshift({
                title: '#',
                key: 'index',
                width: 50,
                align: 'center',
                cellRenderer: ({ rowIndex }: any) => h('span', rowIndex + 1),
            });
        }

        // 添加选择列
        if (props.selectable) {
            columns.unshift({
                key: 'selection',
                width: 50,
                align: 'center',
                // 自定义单元格渲染器
                cellRenderer: selectCellRenderer,
                // 自定义头部渲染器
                headerCellRenderer: headerSelectCellRenderer,
            });
        }

        return columns;
    });

    /**
     * 表格实例
     */
    const tableRef = ref<TableV2Instance>();

    /**
     * 滚动行数
     */
    const scrollRows = ref<number>(0);

    /**
     * 自动按行数滚动
     */
    function autoScrollByRows() {
        tableRef.value?.scrollToRow(scrollRows.value++);
        tableRef.value?.scrollToLeft(0);

        // 滚动触底回到第一条
        if (scrollRows.value >= tableData.value.length) {
            scrollRows.value = 0;
        }
    }

    /**
     * 鼠标悬停状态
     */
    const isMouseHover = ref<boolean>(false);

    /**
     * 鼠标悬停事件
     */
    function handleMouseOver() {
        isMouseHover.value = true;
    }

    /**
     * 鼠标离开事件
     */
    function handleMouseLeave() {
        isMouseHover.value = false;
    }

    /**
     * 是否自动滚动
     */
    const autoScroll = computed(() => {
        return props.scroll && !isMouseHover.value;
    });

    /**
     * 轮询调用滚动方法
     */
    const timer = setInterval(() => {
        if (autoScroll.value) {
            autoScrollByRows();
        }
    }, 1000);

    /**
     * 页面挂载
     */
    onMounted(() => {
        loadData({});
    });

    /**
     * 页面卸载
     */
    onUnmounted(() => {
        // 清除轮询
        clearInterval(timer);
    });

    return {
        tableRef,
        selectedRows,
        selectedCount,
        tableColumns,
        tableData,
        pagination,
        handleMouseOver,
        handleMouseLeave,
        loadData,
        handleSizeChange,
        handleCurrentChange,
    };
}

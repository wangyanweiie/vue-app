import type { XTableColumn } from '@/components';
import * as ExcelJs from 'exceljs';
import { saveAs } from 'file-saver';
import { isNumber } from 'lodash-es';

/**
 * use-exceljs
 */
export default function useExcelJs(sheetName = 'sheet1', fileName = 'example.xlsx') {
    /**
     * 对象数组转换成 excel 导出
     * @param { XTableColumn[] } columns 表格配置
     * @param { Record<string, any>[] } data 对象数组
     */
    function exportExcelByList(columns: XTableColumn[], data: Record<string, any>[]) {
        // 创建一个空工作簿
        const workbook = new ExcelJs.Workbook();

        // 添加工作表 sheet
        const worksheet = workbook.addWorksheet(sheetName);

        // 设置 sheet 的默认行高
        worksheet.properties.defaultRowHeight = 20;

        // 添加表头
        worksheet.columns = columns.map(item => {
            return {
                header: item.label,
                key: item.prop,
                width: isNumber(item.width) ? item.width / 10 : 15,
            };
        });

        // 设置表头样式
        // worksheet.getRow(1).eachCell(cell => {
        //     console.log('headerCell', cell);
        // });

        /**
         * addRow 与 addRows
         * 第二个参数
         *   - i：继承上一单元格的样式；
         *   - n：不继承并使用默认样式；
         *   - +：决定空单元格是否继承样式，有 + 则继承，否则不继承；
         */
        // 在工作表中添加行数据
        worksheet.addRows(data, 'i');

        // 导出文件
        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                // type 默认值为 ""，它代表了将会被放入到 blob 中的数组内容的 MIME 类型
                // type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
            });

            saveAs(blob, fileName);
        });
    }

    return {
        exportExcelByList,
    };
}

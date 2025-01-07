import * as ExcelJs from 'exceljs';
import { saveAs } from 'file-saver';
import { isNumber } from 'lodash-es';

import type { XTableColumn } from '@/components/x-table/interface';

/**
 * use-exceljs
 * @param { XTableColumn[] } columns 表格配置
 * @param { T[] } data 表格数据
 * @param sheetName 工作表名称
 * @param fileName 生成的文件名称
 */
export default function useExcelJs<T>(columns: XTableColumn[], data: T[], sheetName = 'sheet1', fileName = 'file') {
    /**
     * 对象数组转换成 excel 导出
     */
    function exportExcel() {
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

        /**
         * 在工作表中添加行数据
         * addRow 与 addRows
         * 第二个参数
         *   - i：继承上一单元格的样式；
         *   - n：不继承并使用默认样式；
         *   - +：决定空单元格是否继承样式，有 + 则继承，否则不继承；
         */
        worksheet.addRows(data, 'i');

        /**
         * 设置表头行的样式
         */
        worksheet.getRow(1).eachCell({ includeEmpty: true }, cell => {
            // 字体
            cell.font = {
                bold: true,
            };

            // 背景颜色
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {
                    argb: '00ccff',
                },
            };
        });

        /**
         * 设置所有行的样式
         */
        worksheet.eachRow(row => {
            row.eachCell(cell => {
                // 字体
                cell.font = {
                    size: 12,
                };

                // 对齐方式
                cell.alignment = {
                    horizontal: 'center',
                    vertical: 'middle',
                };

                // 添加边框
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
            });
        });

        /**
         * 导出文件
         */
        workbook.xlsx.writeBuffer().then((data: any) => {
            // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组拼接组成
            const blob = new Blob([data], {
                /**
                 * options
                 * type：默认值为 ""，它代表了将会被放入到 blob 中的数组内容的 MIME 类型
                 * endings：默认值为 "transparent"，用于指定包含行结束符 \n 的字符串如何被写入
                 *   - "native"，代表行结束符会被更改为适合宿主操作系统文件系统的换行符
                 *   - "transparent"，代表会保持 blob 中保存的结束符不变
                 */
                // type: 'text/plain;charset=utf-8',
                // endings: 'transparent',
            });

            // 保存文件
            saveAs(blob, `${fileName}.xlsx`);
        });
    }

    return {
        exportExcel,
    };
}

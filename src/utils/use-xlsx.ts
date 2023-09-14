// https://github.com/rockboom/SheetJS-docs-zh-CN
// import { utils, writeFile } from 'xlsx';

// /**
//  * use-xlsx
//  * @param { string } sheetName 工作表名称
//  * @param { string } fileName 文件名称
//  */
// export default function useXlsx(sheetName = 'sheet1', fileName = 'example.xlsx') {
//     /**
//      * 对象数组转成 excel 导出
//      * @param { Record<string, any>[] } data 对象数组
//      */
//     function exportExcelByList(data: Record<string, any>[]) {
//         // 创建一个空工作簿
//         const workbook = utils.book_new();

//         // 对象数组转工作表
//         const workSheet = utils.json_to_sheet(data);

//         // 将工作表添加到工作簿
//         utils.book_append_sheet(workbook, workSheet, sheetName);

//         writeFile(workbook, fileName, {
//             // 文件读取类型为二进制字符串
//             type: 'binary',
//         });
//     }

//     /**
//      * table 转成 excel 导出
//      * @param { * } el table 的根 dom 元素
//      */
//     function exportExcelByTable(el: any) {
//         if (!el) {
//             throw new Error('没有获取到表格的根 dom 元素');
//         }

//         // 表格元素转工作表
//         const workbook = utils.table_to_book(el, {
//             // 纯文本解析不解析值
//             raw: true,
//         });

//         writeFile(workbook, fileName, {
//             // 文件读取类型为二进制字符串
//             type: 'binary',
//         });
//     }

//     return {
//         exportExcelByList,
//         exportExcelByTable,
//     };
// }

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * 截图 + 生成 PDF
 * @param domId 截取区域的元素 ID
 * @param wholeNodeClass 不允许被截断元素的样式类名
 * @param ignoreElementsClass 忽略元素的样式类名
 * @param intervalHeight 不允许被截断元素之间的间隔高度
 * @param fileName 生成的文件名称
 */
export default function useJsPDF(
    domId: string,
    wholeNodeClass: string,
    ignoreElementsClass: string,
    intervalHeight = 50,
    fileName = 'file',
) {
    /**
     * A4 纸尺寸
     */
    const A4_WIDTH = 592.28;
    const A4_HEIGHT = 841.89;

    /**
     * dom 是否渲染
     * 导出时会改变页面布局,故导出完毕需要重新渲染 dom
     */
    const showDom = ref<boolean>(true);

    /**
     * 截图 + 生成 PDF
     */
    function generatePDF() {
        // 获取需要截取节点的 dom
        const domElement: any = document.getElementById(domId);

        // 获取目标元素的高度(去除滚动条时高度)
        const domScrollHeight = domElement.scrollHeight;
        const domScrollWidth = domElement.scrollWidth;

        // 根据 A4 的宽高等比计算 dom 页面对应的高度
        const pageWidth = domElement.offsetWidth;
        const pageHeight = (pageWidth / A4_WIDTH) * A4_HEIGHT;

        // 将所有不允许被截断的子元素进行处理
        const wholeNodes: any = domElement.querySelectorAll(`.${wholeNodeClass}`);

        // 插入空白块的总高度
        let allEmptyNodeHeight = 0;

        for (let i = 0; i < wholeNodes.length; i++) {
            // 判断当前的不可分页元素是否在两页显示
            const topPageNum = Math.ceil(wholeNodes[i].offsetTop / pageHeight);
            const bottomPageNum = Math.ceil((wholeNodes[i].offsetTop + wholeNodes[i].offsetHeight) / pageHeight);

            // 说明该 dom 会被截断
            if (topPageNum !== bottomPageNum) {
                // 创建空白块
                const newBlock = document.createElement('div');
                newBlock.className = 'empty-node';
                newBlock.style.background = '#fff';

                // 计算空白块的高度，可以适当留出空间使得内容不会太靠边，根据自己需求而定
                const _H = topPageNum * pageHeight - wholeNodes[i].offsetTop;
                newBlock.style.height = _H + intervalHeight + 'px';

                // 插入空白块
                wholeNodes[i].parentNode.insertBefore(newBlock, wholeNodes[i]);

                // 更新插入空白块的总高度
                allEmptyNodeHeight = allEmptyNodeHeight + _H + intervalHeight;
            }
        }

        // 设置打印区域的高度 (目标元素的高度 + 添加的空白块的高度)
        domElement.setAttribute(
            'style',
            `height: ${domScrollHeight + allEmptyNodeHeight}px; width: ${domScrollWidth}px;`,
        );

        /**
         * 以上完成 dom 层面的分页，可以转为图片进一步处理了
         * options
         *  - useCORS：是否尝试使用 CORS 从服务器加载图像
         *  - scale：用于渲染的比例，默认为浏览器设备像素比
         *  - ignoreElements：忽略的元素
         */
        html2canvas(domElement, {
            width: domElement.offsetWidth,
            height: domElement.offsetHeight,
            useCORS: true,
            scale: 3,
            ignoreElements: (element: Element) => {
                return String(element?.className)?.indexOf(ignoreElementsClass) !== -1;
            },
        }).then(canvas => {
            // dom 已经转换为 canvas 对象，可以将插入的空白块删除了
            const emptyNodes: any = domElement.querySelectorAll('.empty-node');

            for (let i = 0; i < emptyNodes.length; i++) {
                emptyNodes[i].style.height = 0;
                emptyNodes[i].parentNode.removeChild(emptyNodes[i]);
            }

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            // html 页面实际高度
            let htmlHeight = canvasHeight;

            // 页面偏移量
            let position = 0;

            // 根据 A4 的宽高等比计算 pdf 页面对应的高度
            const pageHeight = (canvasWidth / A4_WIDTH) * A4_HEIGHT;

            // html 页面生成的 canvas 在 pdf 中图片的宽高
            const imgWidth = A4_WIDTH;
            const imgHeight = (A4_WIDTH / canvasWidth) * canvasHeight;

            // 将图片转为 base64 格式
            const imageData = canvas.toDataURL('image/jpeg', 1.0);

            /**
             * 生成 pdf 实例
             *  - 方向： l 横向，p 纵向
             *  - 测量单位："pt"，"mm"，"cm"，"m"，"in"，"px"
             *  - 格式：默认 a4
             */
            const PDF = new jsPDF(undefined, 'pt', 'a4');

            // html 页面的实际高度小于生成 pdf 的页面高度时，即内容未超过 pdf 一页显示的范围，无需分页
            if (htmlHeight <= pageHeight) {
                /**
                 * 在 PDF 文档中添加图像
                 *  - 图像数据
                 *  - 图像格式
                 *  - x 轴位置
                 *  - y 轴位置
                 *  - 图像宽度
                 *  - 图像高度
                 */
                PDF.addImage(imageData, 'JPEG', 0, 0, imgWidth, imgHeight);
            } else {
                while (htmlHeight > 0) {
                    PDF.addImage(imageData, 'JPEG', 0, position, imgWidth, imgHeight);

                    // 更新高度与偏移量
                    htmlHeight -= pageHeight;
                    position -= A4_HEIGHT;

                    if (htmlHeight > 0) {
                        // 在 PDF 文档中添加新页面
                        PDF.addPage();
                    }
                }
            }

            // 保存 pdf 文件
            PDF.save(`${fileName}.pdf`);
        });

        // 还原页面展示布局
        showDom.value = false;
        nextTick(() => {
            showDom.value = true;
        });
    }

    return {
        showDom,
        generatePDF,
    };
}

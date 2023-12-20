import { createVNode, render } from 'vue';
import { ElImageViewer, type ImageViewerProps } from 'element-plus';

type PreviewOption = Partial<ImageViewerProps>;

/**
 * @description 图片预览
 * @param option { PreviewOption } 图片预览的选项
 */
export function previewImage(option: PreviewOption) {
    // 创建了一个 div 元素作为容器，用于渲染预览组件
    const container = document.createElement('div');

    // 使用 createVNode 创建了一个 ElImageViewer 组件实例 vm
    const vm = createVNode(ElImageViewer, {
        ...option,
        onClose() {
            // 监听 close 事件删除节点
            render(null, container);
        },
    });

    // 使用 render 方法将 vm 渲染为真实的节点，并将其挂载到之前创建的容器中
    render(vm, container);

    // 添加到 body 页面上
    document.body.appendChild(container.firstElementChild!);
}

// import { type App, defineAsyncComponent } from 'vue';

// /**
//  * @description 导入组件
//  * 函数从文件系统导入多个模块，匹配到的文件默认是懒加载的，通过动态导入实现，并会在构建时分离为独立的 chunk；
//  * 如果倾向于直接引入所有的模块（例如依赖于这些模块中的副作用首先被应用），可以传入 { eager: true } 作为第二个参数；
//  */
// const components = import.meta.glob('./**/*.vue');

// /**
//  * @description 注册组件
//  * @param app vue 实例
//  */
// export default {
//     install: (app: App) => {
//         for (const [key, value] of Object.entries(components)) {
//             const name = key.match(/\w+\.vue$/)?.[0].replace(/.vue/, '');
//             const component = defineAsyncComponent(value as any);
//             app.component(name as string, component);
//         }
//     },
// };

import type { App, Component } from 'vue';

import XChart from './x-chart/XChart.vue';
import XDescription from './x-description/XDescription.vue';
import XEditTable from './x-edit-table/XEditTable.vue';
import XEditTableItem from './x-edit-table/XEditTableItem.vue';
import XFilePreview from './x-file-preview/XFilePreview.vue';
import XCheckbox from './x-form/components/XCheckbox.vue';
import XRadio from './x-form/components/XRadio.vue';
import XSelect from './x-form/components/XSelect.vue';
import XDialogForm from './x-form/XDialogForm.vue';
import XForm from './x-form/XForm.vue';
import XSearchForm from './x-form/XSearchForm.vue';
import ParentMenuView from './x-layout/ParentMenuView.vue';
import ParentView from './x-layout/ParentView.vue';
import XLayout from './x-layout/XLayout.vue';
import XLogo from './x-layout/XLogo.vue';
import XUser from './x-layout/XUser.vue';
import XMap from './x-map/XMap.vue';
import XRichTextEditor from './x-rich-text-editor/XRichTextEditor.vue';
import XTable from './x-table/XTable.vue';
import XTableV2 from './x-table-v2/XTableV2.vue';

interface ComponentItem {
    name: string;
    component: Component;
}

const components = shallowRef<ComponentItem[]>([
    { name: 'XLayout', component: XLayout },
    { name: 'XLogo', component: XLogo },
    { name: 'XUser', component: XUser },
    { name: 'ParentView', component: ParentView },
    { name: 'ParentMenuView', component: ParentMenuView },
    { name: 'XTable', component: XTable },
    { name: 'XTableV2', component: XTableV2 },
    { name: 'XEditTable', component: XEditTable },
    { name: 'XEditTableItem', component: XEditTableItem },
    { name: 'XDialogForm', component: XDialogForm },
    { name: 'XSearchForm', component: XSearchForm },
    { name: 'XForm', component: XForm },
    { name: 'XRadio', component: XRadio },
    { name: 'XCheckbox', component: XCheckbox },
    { name: 'XSelect', component: XSelect },
    { name: 'XDescription', component: XDescription },
    { name: 'XFilePreview', component: XFilePreview },
    { name: 'XRichTextEditor', component: XRichTextEditor },
    { name: 'XChart', component: XChart },
    { name: 'XMap', component: XMap },
]);

/**
 * @description 注册组件
 * @param app vue app
 */
export default {
    install: (app: App) => {
        components.value.forEach(({ name, component }: ComponentItem) => {
            app.component(name, component);
        });
    },
};

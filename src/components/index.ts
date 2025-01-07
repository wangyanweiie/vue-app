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

import XChart from './x-chart/x-chart.vue';
import XCurdPage from './x-curd-page/x-curd-page.vue';
import XDescription from './x-description/x-description.vue';
import XEditTable from './x-edit-table/x-edit-table.vue';
import XEditTableItem from './x-edit-table/x-edit-table-item.vue';
import XFilePreview from './x-file-preview/x-file-preview.vue';
import XCheckbox from './x-form/components/x-checkbox.vue';
import XRadio from './x-form/components/x-radio.vue';
import XSelect from './x-form/components/x-select.vue';
import XDialogForm from './x-form/x-dialog-form.vue';
import XForm from './x-form/x-form.vue';
import XSearchForm from './x-form/x-search-form.vue';
import ParentMenuView from './x-layout/parent-menu-view.vue';
import ParentView from './x-layout/parent-view.vue';
import XLayout from './x-layout/x-layout.vue';
import XLogo from './x-layout/x-logo.vue';
import XUser from './x-layout/x-user.vue';
import XMap from './x-map/x-map.vue';
import XRichTextEditor from './x-rich-text-editor/x-rich-text-editor.vue';
import XTable from './x-table/x-table.vue';
import XTableV2 from './x-table-v2/x-table-v2.vue';

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
    { name: 'XCurdPage', component: XCurdPage },
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

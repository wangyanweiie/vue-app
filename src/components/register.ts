import type { App, Component } from 'vue';
import XLayout from './Layout/XLayout.vue';
import XLogo from './Layout/XLogo.vue';
import XUser from './Layout/XUser.vue';
import ParentView from './Layout/ParentView.vue';
import ParentMenuView from './Layout/ParentMenuView.vue';
import XTable from './Table/index.vue';
import XTableV2 from './TableV2/index.vue';
import XEditTable from './EditTable/XEditTable.vue';
import XEditTableItem from './EditTable/XEditTableItem.vue';
import XSearchForm from './Form/XSearchForm.vue';
import XDialogForm from './Form/XDialogForm.vue';
import XForm from './Form/XForm.vue';
import XRadio from './Form/components/XRadio.vue';
import XCheckbox from './Form/components/XCheckbox.vue';
import XSelect from './Form/components/XSelect.vue';
import XDescription from './Description/index.vue';
import XFilePreview from './FilePreview/index.vue';
import XRichTextEditor from './RichTextEditor/index.vue';
import XChart from './Charts/index.vue';
import XMap from './Map/index.vue';

interface ComponentItem {
    name: string;
    component: Component;
}

/**
 * 组件列表
 */
const componentList: ComponentItem[] = [
    {
        name: 'XLayout',
        component: XLayout,
    },
    {
        name: 'XLogo',
        component: XLogo,
    },
    {
        name: 'XUser',
        component: XUser,
    },
    {
        name: 'ParentView',
        component: ParentView,
    },
    {
        name: 'ParentMenuView',
        component: ParentMenuView,
    },
    {
        name: 'XTable',
        component: XTable,
    },
    {
        name: 'XTableV2',
        component: XTableV2,
    },
    {
        name: 'XEditTable',
        component: XEditTable,
    },
    {
        name: 'XEditTableItem',
        component: XEditTableItem,
    },
    {
        name: 'XDialogForm',
        component: XDialogForm,
    },
    {
        name: 'XSearchForm',
        component: XSearchForm,
    },
    {
        name: 'XForm',
        component: XForm,
    },
    {
        name: 'XRadio',
        component: XRadio,
    },
    {
        name: 'XCheckbox',
        component: XCheckbox,
    },
    {
        name: 'XSelect',
        component: XSelect,
    },
    {
        name: 'XDescription',
        component: XDescription,
    },
    {
        name: 'XFilePreview',
        component: XFilePreview,
    },
    {
        name: 'XRichTextEditor',
        component: XRichTextEditor,
    },
    {
        name: 'XChart',
        component: XChart,
    },
    {
        name: 'XMap',
        component: XMap,
    },
];

/**
 * 收集组件后统一注册组件
 * @param app 实例
 */
export default {
    install: (app: App) => {
        componentList.forEach(({ name, component }) => {
            app.component(name, component);
        });
    },
};

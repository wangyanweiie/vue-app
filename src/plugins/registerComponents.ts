import type { App, Component } from 'vue';
import {
    XLayout,
    ParentView,
    ParentMenuView,
    XLogo,
    XUser,
    XTable,
    XTableV2,
    XDialogForm,
    XSearchForm,
    XForm,
    XRadio,
    XCheckbox,
    XSelect,
    XDescription,
} from '@/components/index';

/**
 * 组件列表
 */
const componentsList: { name: string; component: Component }[] = [
    {
        name: 'XLayout',
        component: XLayout,
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
        name: 'XLogo',
        component: XLogo,
    },
    {
        name: 'XUser',
        component: XUser,
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
];

/**
 * 收集组件后统一注册组件
 * @param app 实例
 */
export function registerComponents(app: App) {
    componentsList.forEach((item: { name: string; component: Component }) => {
        app.component(item.name, item.component);
    });
}
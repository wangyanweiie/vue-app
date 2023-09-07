import XLayout from './layout/x-layout.vue';
import XLogo from './layout/x-logo.vue';
import XUser from './layout/x-user.vue';
import ParentView from './layout/parent-view.vue';
import ParentMenuView from './layout/parent-menu-view.vue';
import XTable from './table/index.vue';
import XTableV2 from './table-v2/index.vue';
import XSearchForm from './form/x-search-form.vue';
import XDialogForm from './form/x-dialog-form.vue';
import XForm from './form/x-form.vue';
import XDescription from './description/index.vue';
import { generateActiveRoutes, generateCacheList, generateShowMenus } from './utils/router-helper';

export * from './form/interface';
export * from './table/interface';
export * from './table-v2/interface';
export * from './description/interface';

export {
    XLayout,
    ParentView,
    ParentMenuView,
    XLogo,
    XUser,
    XTable,
    XTableV2,
    XSearchForm,
    XDialogForm,
    XForm,
    XDescription,
    generateActiveRoutes,
    generateCacheList,
    generateShowMenus,
};

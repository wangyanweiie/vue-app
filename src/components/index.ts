import XLayout from '@/components/layout/x-layout.vue';
import XLogo from '@/components/layout/x-logo.vue';
import XUser from '@/components/layout/x-user.vue';
import ParentView from '@/components/layout/parent-view.vue';
import ParentMenuView from '@/components/layout/parent-menu-view.vue';
import XTable from '@/components/table/index.vue';
import XTableV2 from '@/components/table-v2/index.vue';
import XSearchForm from '@/components/form/x-search-form.vue';
import XDialogForm from '@/components/form/x-dialog-form.vue';
import XForm from '@/components/form/x-form.vue';
import XRadio from '@/components/form/components/x-radio.vue';
import XCheckbox from '@/components/form/components/x-checkbox.vue';
import XSelect from '@/components/form/components/x-select.vue';
import XDescription from '@/components/description/index.vue';
import {
    generateActiveRoutes,
    generateCacheList,
    generateShowMenus,
    type IconTypes,
    type RouteRecordRawTypes,
} from '@/components/utils/router-helper';

export * from '@/components/table/interface';
export * from '@/components/table-v2/interface';
export * from '@/components/form/interface';
export * from '@/components/description/interface';

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
    XRadio,
    XCheckbox,
    XSelect,
    XDescription,
    generateActiveRoutes,
    generateCacheList,
    generateShowMenus,
    type IconTypes,
    type RouteRecordRawTypes,
};

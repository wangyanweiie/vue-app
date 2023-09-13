import XLayout from './Layout/XLayout.vue';
import XLogo from './Layout/XLogo.vue';
import XUser from './Layout/XUser.vue';
import ParentView from './Layout/ParentView.vue';
import ParentMenuView from './Layout/ParentMenuView.vue';
import XTable from './Table/index.vue';
import XTableV2 from './TableV2/index.vue';
import XEditTable from './EditTable/index.vue';
import XEditTableItem from './EditTable/components/EditTableItem.vue';
import XSearchForm from './Form/XSearchForm.vue';
import XDialogForm from './Form/XDialogForm.vue';
import XForm from './Form/XForm.vue';
import XRadio from './Form/components/XRadio.vue';
import XCheckbox from './Form/components/XCheckbox.vue';
import XSelect from './Form/components/XSelect.vue';
import XDescription from './Description/index.vue';

import { type IconTypes, generateActiveRoutes, generateCacheList, generateShowMenus } from './hooks/router-helper';
import { type CommandComponent, useCommandComponent } from './hooks/command-dialog-helper';

export * from './Table/interface';
export * from './TableV2/interface';
export * from './Form/interface';
export * from './Description/interface';

export {
    XLayout,
    ParentView,
    ParentMenuView,
    XLogo,
    XUser,
    XTable,
    XTableV2,
    XEditTable,
    XEditTableItem,
    XSearchForm,
    XDialogForm,
    XForm,
    XRadio,
    XCheckbox,
    XSelect,
    XDescription,
    type IconTypes,
    generateActiveRoutes,
    generateCacheList,
    generateShowMenus,
    type CommandComponent,
    useCommandComponent,
};

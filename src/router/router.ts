import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import appLayout from '@/layout/index.vue';

import { FORBIDDEN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SCREEN_ROUTE } from './base';

const menuRoutes = computed<RouteRecordRaw[]>(() => [
    HOME_ROUTE.value,
    ...[
        {
            path: '/basic-data',
            name: 'basic-data',
            redirect: '/basic-data',
            meta: {
                title: '基础数据',
                icon: 'Folder',
            },
            children: [
                {
                    path: '/basic-data/basic-info',
                    name: 'basic-data/basic-info',
                    redirect: '/basic-data/basic-info',
                    meta: {
                        title: '基础资料',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/basic-data/basic-info/material-list',
                            name: 'basic-data/basic-info/material-list',
                            component: () => import('@/pages/basic-data/basic-info/material-list/material-list.vue'),
                            meta: {
                                title: '物料列表',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/basic-data/basic-info/factory-requirements',
                            name: 'basic-data/basic-info/factory-requirements',
                            component: () =>
                                import('@/pages/basic-data/basic-info/factory-requirements/factory-requirements.vue'),
                            meta: {
                                title: '厂内要求',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/basic-data/basic-info/customer-list',
                            name: 'basic-data/basic-info/customer-list',
                            component: () => import('@/pages/basic-data/basic-info/customer-list/customer-list.vue'),
                            meta: {
                                title: '客户列表',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/basic-data/basic-info/customer-requirements',
                            name: 'basic-data/basic-info/customer-requirements',
                            component: () =>
                                import('@/pages/basic-data/basic-info/customer-requirements/customer-requirements.vue'),
                            meta: {
                                title: '客户要求',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/basic-data/basic-info/supplier-list',
                            name: 'basic-data/basic-info/supplier-list',
                            component: () => import('@/pages/basic-data/basic-info/supplier-list/supplier-list.vue'),
                            meta: {
                                title: '供应商列表',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/basic-data/basic-info/unit-of-measurement',
                            name: 'basic-data/basic-info/unit-of-measurement',
                            component: () =>
                                import('@/pages/basic-data/basic-info/unit-of-measurement/unit-of-measurement.vue'),
                            meta: {
                                title: '计量单位',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/basic-data/basic-info/data-dictionary',
                            name: 'basic-data/basic-info/data-dictionary',
                            component: () =>
                                import('@/pages/basic-data/basic-info/data-dictionary/data-dictionary.vue'),
                            meta: {
                                title: '数据字典',
                                icon: 'Tickets',
                            },
                        },
                    ],
                },
                {
                    path: '/basic-data/production-materials',
                    name: 'basic-data/production-materials',
                    redirect: '/basic-data/production-materials',
                    meta: {
                        title: '生产资料',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/basic-data/production-materials/factory',
                            name: 'basic-data/production-materials/factory',
                            component: () => import('@/pages/basic-data/production-materials/factory/factory.vue'),
                            meta: {
                                title: '工厂',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/basic-data/production-materials/workshop',
                            name: 'basic-data/production-materials/workshop',
                            component: () => import('@/pages/basic-data/production-materials/workshop/workshop.vue'),
                            meta: {
                                title: '车间',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/basic-data/production-materials/storage-tank',
                            name: 'basic-data/production-materials/storage-tank',
                            component: () =>
                                import('@/pages/basic-data/production-materials/storage-tank/storage-tank.vue'),
                            meta: {
                                title: '储罐',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/basic-data/production-materials/team',
                            name: 'basic-data/production-materials/team',
                            component: () => import('@/pages/basic-data/production-materials/team/team.vue'),
                            meta: {
                                title: '班组',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/basic-data/production-materials/production-line',
                            name: 'basic-data/production-materials/production-line',
                            component: () =>
                                import('@/pages/basic-data/production-materials/production-line/production-line.vue'),
                            meta: {
                                title: '生产线',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/basic-data/production-materials/collection-project',
                            name: 'basic-data/production-materials/collection-project',
                            component: () =>
                                import(
                                    '@/pages/basic-data/production-materials/collection-project/collection-project.vue'
                                ),
                            meta: {
                                title: '采集项目',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/basic-data/production-materials/collection-plan',
                            name: 'basic-data/production-materials/collection-plan',
                            component: () =>
                                import('@/pages/basic-data/production-materials/collection-plan/collection-plan.vue'),
                            meta: {
                                title: '采集方案',
                                icon: 'Tickets',
                            },
                        },
                    ],
                },
                {
                    path: '/basic-data/quality-data',
                    name: 'basic-data/quality-data',
                    redirect: '/basic-data/quality-data',
                    meta: {
                        title: '质量资料',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/basic-data/quality-data/inspection-plan',
                            name: 'basic-data/quality-data/inspection-plan',
                            redirect: '/basic-data/quality-data/inspection-plan',
                            meta: {
                                title: '检验方案',
                                icon: 'Folder',
                            },
                            children: [
                                {
                                    path: '/basic-data/quality-data/inspection-plan/inspection-items',
                                    name: 'basic-data/quality-data/inspection-plan/inspection-items',
                                    component: () =>
                                        import(
                                            '@/pages/basic-data/quality-data/inspection-plan/inspection-items/inspection-items.vue'
                                        ),
                                    meta: {
                                        title: '检验项目',
                                        icon: 'Tickets',
                                    },
                                },
                                {
                                    path: '/basic-data/quality-data/inspection-plan/factory-inspection-plan',
                                    name: 'basic-data/quality-data/inspection-plan/factory-inspection-plan',
                                    component: () =>
                                        import(
                                            '@/pages/basic-data/quality-data/inspection-plan/factory-inspection-plan/factory-inspection-plan.vue'
                                        ),
                                    meta: {
                                        title: '厂内检验方案',
                                        icon: 'Tickets',
                                    },
                                },
                                {
                                    path: '/basic-data/quality-data/inspection-plan/customer-inspection-plan',
                                    name: 'basic-data/quality-data/inspection-plan/customer-inspection-plan',
                                    component: () =>
                                        import(
                                            '@/pages/basic-data/quality-data/inspection-plan/customer-inspection-plan/customer-inspection-plan.vue'
                                        ),
                                    meta: {
                                        title: '客户检验方案',
                                        icon: 'Tickets',
                                    },
                                },
                            ],
                        },
                        {
                            path: '/basic-data/quality-data/spc-judgment',
                            name: 'basic-data/quality-data/spc-judgment',
                            redirect: '/basic-data/quality-data/spc-judgment',
                            meta: {
                                title: 'SPC判异',
                                icon: 'Folder',
                            },
                            children: [
                                {
                                    path: '/basic-data/quality-data/spc-judgment/discrimination-rule-setting',
                                    name: 'basic-data/quality-data/spc-judgment/discrimination-rule-setting',
                                    component: () =>
                                        import(
                                            '@/pages/basic-data/quality-data/spc-judgment/discrimination-rule-setting/discrimination-rule-setting.vue'
                                        ),
                                    meta: {
                                        title: '判异规则设置',
                                        icon: 'Tickets',
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    path: '/basic-data/warehouse-information',
                    name: 'basic-data/warehouse-information',
                    redirect: '/basic-data/warehouse-information',
                    meta: {
                        title: '仓库资料',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/basic-data/warehouse-information/warehouse-list',
                            name: 'basic-data/warehouse-information/warehouse-list',
                            component: () =>
                                import('@/pages/basic-data/warehouse-information/warehouse-list/warehouse-list.vue'),
                            meta: {
                                title: '仓库列表',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/basic-data/warehouse-information/inventory-warning',
                            name: 'basic-data/warehouse-information/inventory-warning',
                            component: () =>
                                import(
                                    '@/pages/basic-data/warehouse-information/inventory-warning/inventory-warning.vue'
                                ),
                            meta: {
                                title: '库存预警',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/basic-data/warehouse-information/logistics-list',
                            name: 'basic-data/warehouse-information/logistics-list',
                            component: () =>
                                import('@/pages/basic-data/warehouse-information/logistics-list/logistics-list.vue'),
                            meta: {
                                title: '物流列表',
                                icon: 'Tickets',
                            },
                        },
                    ],
                },
            ],
        },
        {
            path: '/plan-management',
            name: 'plan-management',
            redirect: '/plan-management',
            meta: {
                title: '计划管理',
                icon: 'Folder',
            },
            children: [
                {
                    path: '/plan-management/sales-order',
                    name: 'plan-management/sales-order',
                    component: () => import('@/pages/plan-management/sales-order/sales-order.vue'),
                    meta: {
                        title: '销售订单',
                        icon: 'Tickets',
                    },
                },
                {
                    path: '/plan-management/raw-material-arrival-order',
                    name: 'plan-management/raw-material-arrival-order',
                    component: () =>
                        import('@/pages/plan-management/raw-material-arrival-order/raw-material-arrival-order.vue'),
                    meta: {
                        title: '原料到货单',
                        icon: 'Tickets',
                    },
                },
                {
                    path: '/plan-management/production-line-operation-order',
                    name: 'plan-management/production-line-operation-order',
                    component: () =>
                        import(
                            '@/pages/plan-management/production-line-operation-order/production-line-operation-order.vue'
                        ),
                    meta: {
                        title: '产线运行单',
                        icon: 'Tickets',
                    },
                },
                {
                    path: '/plan-management/production-plan-order',
                    name: 'plan-management/production-plan-order',
                    component: () => import('@/pages/plan-management/production-plan-order/production-plan-order.vue'),
                    meta: {
                        title: '生产计划单',
                        icon: 'Tickets',
                    },
                },
                {
                    path: '/plan-management/filling-plan-order',
                    name: 'plan-management/filling-plan-order',
                    component: () => import('@/pages/plan-management/filling-plan-order/filling-plan-order.vue'),
                    meta: {
                        title: '充装计划单',
                        icon: 'Tickets',
                    },
                },
                {
                    path: '/plan-management/delivery-notice',
                    name: 'plan-management/delivery-notice',
                    component: () => import('@/pages/plan-management/delivery-notice/delivery-notice.vue'),
                    meta: {
                        title: '发货通知单',
                        icon: 'Tickets',
                    },
                },
            ],
        },
        {
            path: '/production-management',
            name: 'production-management',
            redirect: '/production-management',
            meta: {
                title: '生产管理',
                icon: 'Folder',
            },
            children: [
                {
                    path: '/production-management/operation-record',
                    name: 'production-management/operation-record',
                    redirect: '/production-management/operation-record',
                    meta: {
                        title: '操作记录',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/production-management/operation-record/production-registration-record',
                            name: 'production-management/operation-record/production-registration-record',
                            component: () =>
                                import(
                                    '@/pages/production-management/operation-record/production-registration-record/production-registration-record.vue'
                                ),
                            meta: {
                                title: '生产登记记录',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/production-management/operation-record/filling-registration-record',
                            name: 'production-management/operation-record/filling-registration-record',
                            component: () =>
                                import(
                                    '@/pages/production-management/operation-record/filling-registration-record/filling-registration-record.vue'
                                ),
                            meta: {
                                title: '充装登记记录',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/production-management/operation-record/material-recycling-record',
                            name: 'production-management/operation-record/material-recycling-record',
                            component: () =>
                                import(
                                    '@/pages/production-management/operation-record/material-recycling-record/material-recycling-record.vue'
                                ),
                            meta: {
                                title: '物料回收记录',
                                icon: 'Tickets',
                            },
                        },
                    ],
                },
                {
                    path: '/production-management/production-report',
                    name: 'production-management/production-report',
                    redirect: '/production-management/production-report',
                    meta: {
                        title: '生产报表',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/production-management/production-report/daily-production-report',
                            name: 'production-management/production-report/daily-production-report',
                            component: () =>
                                import(
                                    '@/pages/production-management/production-report/daily-production-report/daily-production-report.vue'
                                ),
                            meta: {
                                title: '日生产报表',
                                icon: 'Tickets',
                            },
                        },
                    ],
                },
            ],
        },
        {
            path: '/container-management',
            name: 'container-management',
            redirect: '/container-management',
            meta: {
                title: '容器管理',
                icon: 'Folder',
            },
            children: [
                {
                    path: '/container-management/container-archives',
                    name: 'container-management/container-archives',
                    redirect: '/container-management/container-archives',
                    meta: {
                        title: '容器档案',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/container-management/container-archives/container-archives',
                            name: 'container-management/container-archives/container-archives',
                            component: () =>
                                import(
                                    '@/pages/container-management/container-archives/container-archives/container-archives.vue'
                                ),
                            meta: {
                                title: '容器档案',
                                icon: 'Tickets',
                            },
                        },
                    ],
                },
                {
                    path: '/container-management/container-processing-records',
                    name: 'container-management/container-processing-records',
                    redirect: '/container-management/container-processing-records',
                    meta: {
                        title: '容器处理记录',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/container-management/container-processing-records/container-processing-records',
                            name: 'container-management/container-processing-records/container-processing-records',
                            component: () =>
                                import(
                                    '@/pages/container-management/container-processing-records/container-processing-records/container-processing-records.vue'
                                ),
                            meta: {
                                title: '容器处理记录',
                                icon: 'Tickets',
                            },
                        },
                    ],
                },
                {
                    path: '/container-management/statistics-on-bottles-outside-the-factory',
                    name: 'container-management/statistics-on-bottles-outside-the-factory',
                    redirect: '/container-management/statistics-on-bottles-outside-the-factory',
                    meta: {
                        title: '厂外存瓶统计',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/container-management/statistics-on-bottles-outside-the-factory/statistics-on-bottles-outside-the-factory',
                            name: 'container-management/statistics-on-bottles-outside-the-factory/statistics-on-bottles-outside-the-factory',
                            component: () =>
                                import(
                                    '@/pages/container-management/statistics-on-bottles-outside-the-factory/statistics-on-bottles-outside-the-factory/statistics-on-bottles-outside-the-factory.vue'
                                ),
                            meta: {
                                title: '厂外存瓶统计',
                                icon: 'Tickets',
                            },
                        },
                    ],
                },
                {
                    path: '/container-management/container-circulation-history',
                    name: 'container-management/container-circulation-history',
                    redirect: '/container-management/container-circulation-history',
                    meta: {
                        title: '容器流转履历',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/container-management/container-circulation-history/container-circulation-history',
                            name: 'container-management/container-circulation-history/container-circulation-history',
                            component: () =>
                                import(
                                    '@/pages/container-management/container-circulation-history/container-circulation-history/container-circulation-history.vue'
                                ),
                            meta: {
                                title: '容器流转履历',
                                icon: 'Tickets',
                            },
                        },
                    ],
                },
            ],
        },
        {
            path: '/quality-management',
            name: 'quality-management',
            redirect: '/quality-management',
            meta: {
                title: '质量管理',
                icon: 'Folder',
            },
            children: [
                {
                    path: '/quality-management/analysis-equipment-management',
                    name: 'quality-management/analysis-equipment-management',
                    redirect: '/quality-management/analysis-equipment-management',
                    meta: {
                        title: '分析设备管理',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/quality-management/analysis-equipment-management/equipment-archives',
                            name: 'quality-management/analysis-equipment-management/equipment-archives',
                            redirect: '/quality-management/analysis-equipment-management/equipment-archives',
                            meta: {
                                title: '设备档案',
                                icon: 'Folder',
                            },
                            children: [
                                {
                                    path: '/quality-management/analysis-equipment-management/equipment-archives/analysis-equipment-ledger',
                                    name: 'quality-management/analysis-equipment-management/equipment-archives/analysis-equipment-ledger',
                                    component: () =>
                                        import(
                                            '@/pages/quality-management/analysis-equipment-management/equipment-archives/analysis-equipment-ledger/analysis-equipment-ledger.vue'
                                        ),
                                    meta: {
                                        title: '分析设备台账',
                                        icon: 'Tickets',
                                    },
                                },
                            ],
                        },
                        {
                            path: '/quality-management/analysis-equipment-management/equipment-maintenance',
                            name: 'quality-management/analysis-equipment-management/equipment-maintenance',
                            redirect: '/quality-management/analysis-equipment-management/equipment-maintenance',
                            meta: {
                                title: '设备保养',
                                icon: 'Folder',
                            },
                            children: [
                                {
                                    path: '/quality-management/analysis-equipment-management/equipment-maintenance/maintenance-schema',
                                    name: 'quality-management/analysis-equipment-management/equipment-maintenance/maintenance-schema',
                                    component: () =>
                                        import(
                                            '@/pages/quality-management/analysis-equipment-management/equipment-maintenance/maintenance-schema/maintenance-schema.vue'
                                        ),
                                    meta: {
                                        title: '保养方案',
                                        icon: 'Tickets',
                                    },
                                },
                                {
                                    path: '/quality-management/analysis-equipment-management/equipment-maintenance/maintenance-plan',
                                    name: 'quality-management/analysis-equipment-management/equipment-maintenance/maintenance-plan',
                                    component: () =>
                                        import(
                                            '@/pages/quality-management/analysis-equipment-management/equipment-maintenance/maintenance-plan/maintenance-plan.vue'
                                        ),
                                    meta: {
                                        title: '保养计划',
                                        icon: 'Tickets',
                                    },
                                },
                                {
                                    path: '/quality-management/analysis-equipment-management/equipment-maintenance/maintenance-record',
                                    name: 'quality-management/analysis-equipment-management/equipment-maintenance/maintenance-record',
                                    component: () =>
                                        import(
                                            '@/pages/quality-management/analysis-equipment-management/equipment-maintenance/maintenance-record/maintenance-record.vue'
                                        ),
                                    meta: {
                                        title: '保养记录',
                                        icon: 'Tickets',
                                    },
                                },
                            ],
                        },
                        {
                            path: '/quality-management/analysis-equipment-management/equipment-on-site-inspection',
                            name: 'quality-management/analysis-equipment-management/equipment-on-site-inspection',
                            redirect: '/quality-management/analysis-equipment-management/equipment-on-site-inspection',
                            meta: {
                                title: '设备巡检',
                                icon: 'Folder',
                            },
                            children: [
                                {
                                    path: '/quality-management/analysis-equipment-management/equipment-on-site-inspection/inspection-plan',
                                    name: 'quality-management/analysis-equipment-management/equipment-on-site-inspection/inspection-plan',
                                    component: () =>
                                        import(
                                            '@/pages/quality-management/analysis-equipment-management/equipment-on-site-inspection/inspection-plan/inspection-plan.vue'
                                        ),
                                    meta: {
                                        title: '巡检方案',
                                        icon: 'Tickets',
                                    },
                                },
                                {
                                    path: '/quality-management/analysis-equipment-management/equipment-on-site-inspection/inspection-plan',
                                    name: 'quality-management/analysis-equipment-management/equipment-on-site-inspection/inspection-plan',
                                    component: () =>
                                        import(
                                            '@/pages/quality-management/analysis-equipment-management/equipment-on-site-inspection/inspection-plan/inspection-plan.vue'
                                        ),
                                    meta: {
                                        title: '巡检计划',
                                        icon: 'Tickets',
                                    },
                                },
                                {
                                    path: '/quality-management/analysis-equipment-management/equipment-on-site-inspection/inspection-record',
                                    name: 'quality-management/analysis-equipment-management/equipment-on-site-inspection/inspection-record',
                                    component: () =>
                                        import(
                                            '@/pages/quality-management/analysis-equipment-management/equipment-on-site-inspection/inspection-record/inspection-record.vue'
                                        ),
                                    meta: {
                                        title: '巡检记录',
                                        icon: 'Tickets',
                                    },
                                },
                            ],
                        },
                        {
                            path: '/quality-management/analysis-equipment-management/equipment-periodical-inspection',
                            name: 'quality-management/analysis-equipment-management/equipment-periodical-inspection',
                            redirect:
                                '/quality-management/analysis-equipment-management/equipment-periodical-inspection',
                            meta: {
                                title: '设备定检',
                                icon: 'Folder',
                            },
                            children: [
                                {
                                    path: '/quality-management/analysis-equipment-management/equipment-periodical-inspection/equipment-periodical-inspection',
                                    name: 'quality-management/analysis-equipment-management/equipment-periodical-inspection/equipment-periodical-inspection',
                                    component: () =>
                                        import(
                                            '@/pages/quality-management/analysis-equipment-management/equipment-periodical-inspection/equipment-periodical-inspection/equipment-periodical-inspection.vue'
                                        ),
                                    meta: {
                                        title: '设备定检',
                                        icon: 'Tickets',
                                    },
                                },
                            ],
                        },
                        {
                            path: '/quality-management/analysis-equipment-management/equipment-verification',
                            name: 'quality-management/analysis-equipment-management/equipment-verification',
                            redirect: '/quality-management/analysis-equipment-management/equipment-verification',
                            meta: {
                                title: '设备校验',
                                icon: 'Folder',
                            },
                            children: [
                                {
                                    path: '/quality-management/analysis-equipment-management/equipment-verification/equipment-verification',
                                    name: 'quality-management/analysis-equipment-management/equipment-verification/equipment-verification',
                                    component: () =>
                                        import(
                                            '@/pages/quality-management/analysis-equipment-management/equipment-verification/equipment-verification/equipment-verification.vue'
                                        ),
                                    meta: {
                                        title: '设备校验',
                                        icon: 'Tickets',
                                    },
                                },
                            ],
                        },
                        {
                            path: '/quality-management/analysis-equipment-management/equipment-repair',
                            name: 'quality-management/analysis-equipment-management/equipment-repair',
                            redirect: '/quality-management/analysis-equipment-management/equipment-repair',
                            meta: {
                                title: '设备检修',
                                icon: 'Folder',
                            },
                            children: [
                                {
                                    path: '/quality-management/analysis-equipment-management/equipment-repair/equipment-repair',
                                    name: 'quality-management/analysis-equipment-management/equipment-repair/equipment-repair',
                                    component: () =>
                                        import(
                                            '@/pages/quality-management/analysis-equipment-management/equipment-repair/equipment-repair/equipment-repair.vue'
                                        ),
                                    meta: {
                                        title: '设备检修',
                                        icon: 'Tickets',
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    path: '/quality-management/quality-inspection',
                    name: 'quality-management/quality-inspection',
                    redirect: '/quality-management/quality-inspection',
                    meta: {
                        title: '质量检验',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/quality-management/quality-inspection/quality-inspection',
                            name: 'quality-management/quality-inspection/quality-inspection',
                            component: () =>
                                import(
                                    '@/pages/quality-management/quality-inspection/quality-inspection/quality-inspection.vue'
                                ),
                            meta: {
                                title: '质量检验',
                                icon: 'Tickets',
                            },
                        },
                    ],
                },
                {
                    path: '/quality-management/quality-report',
                    name: 'quality-management/quality-report',
                    redirect: '/quality-management/quality-report',
                    meta: {
                        title: '质量报告',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/quality-management/quality-report/quality-report-configuration',
                            name: 'quality-management/quality-report/quality-report-configuration',
                            component: () =>
                                import(
                                    '@/pages/quality-management/quality-report/quality-report-configuration/quality-report-configuration.vue'
                                ),
                            meta: {
                                title: '质量报告配置',
                                icon: 'Tickets',
                            },
                        },
                    ],
                },
                {
                    path: '/quality-management/spc-control',
                    name: 'quality-management/spc-control',
                    redirect: '/quality-management/spc-control',
                    meta: {
                        title: 'SPC控制',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/quality-management/spc-control/metered-spc',
                            name: 'quality-management/spc-control/metered-spc',
                            component: () =>
                                import('@/pages/quality-management/spc-control/metered-spc/metered-spc.vue'),
                            meta: {
                                title: '计量型SPC',
                                icon: 'Tickets',
                            },
                        },
                    ],
                },
            ],
        },
        {
            path: '/warehouse-management',
            name: 'warehouse-management',
            redirect: '/warehouse-management',
            meta: {
                title: '仓库管理',
                icon: 'Folder',
            },
            children: [
                {
                    path: '/warehouse-management/wms-warehouse',
                    name: 'warehouse-management/wms-warehouse',
                    redirect: '/warehouse-management/wms-warehouse',
                    meta: {
                        title: 'WMS仓',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/warehouse-management/wms-warehouse/empty-bottle-warehouse-inventory',
                            name: 'warehouse-management/wms-warehouse/empty-bottle-warehouse-inventory',
                            component: () =>
                                import(
                                    '@/pages/warehouse-management/wms-warehouse/empty-bottle-warehouse-inventory/empty-bottle-warehouse-inventory.vue'
                                ),
                            meta: {
                                title: '空瓶仓库存',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/warehouse-management/wms-warehouse/raw-material-warehouse-inventory',
                            name: 'warehouse-management/wms-warehouse/raw-material-warehouse-inventory',
                            component: () =>
                                import(
                                    '@/pages/warehouse-management/wms-warehouse/raw-material-warehouse-inventory/raw-material-warehouse-inventory.vue'
                                ),
                            meta: {
                                title: '原料仓库存',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/warehouse-management/wms-warehouse/finished-product-inventory',
                            name: 'warehouse-management/wms-warehouse/finished-product-inventory',
                            component: () =>
                                import(
                                    '@/pages/warehouse-management/wms-warehouse/finished-product-inventory/finished-product-inventory.vue'
                                ),
                            meta: {
                                title: '成品库存',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/warehouse-management/wms-warehouse/storage-tank-inventory',
                            name: 'warehouse-management/wms-warehouse/storage-tank-inventory',
                            component: () =>
                                import(
                                    '@/pages/warehouse-management/wms-warehouse/storage-tank-inventory/storage-tank-inventory.vue'
                                ),
                            meta: {
                                title: '储罐库存',
                                icon: 'Tickets',
                            },
                        },
                    ],
                },
                {
                    path: '/warehouse-management/entry-and-exit-record',
                    name: 'warehouse-management/entry-and-exit-record',
                    redirect: '/warehouse-management/entry-and-exit-record',
                    meta: {
                        title: '出入库记录',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/warehouse-management/entry-and-exit-record/factory-inspection',
                            name: 'warehouse-management/entry-and-exit-record/factory-inspection',
                            component: () =>
                                import(
                                    '@/pages/warehouse-management/entry-and-exit-record/factory-inspection/factory-inspection.vue'
                                ),
                            meta: {
                                title: '入厂检验',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/warehouse-management/entry-and-exit-record/raw-material-inventory',
                            name: 'warehouse-management/entry-and-exit-record/raw-material-inventory',
                            component: () =>
                                import(
                                    '@/pages/warehouse-management/entry-and-exit-record/raw-material-inventory/raw-material-inventory.vue'
                                ),
                            meta: {
                                title: '原料入库',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/warehouse-management/entry-and-exit-record/finished-product-inventory',
                            name: 'warehouse-management/entry-and-exit-record/finished-product-inventory',
                            component: () =>
                                import(
                                    '@/pages/warehouse-management/entry-and-exit-record/finished-product-inventory/finished-product-inventory.vue'
                                ),
                            meta: {
                                title: '成品入库',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/warehouse-management/entry-and-exit-record/empty-bottle-export',
                            name: 'warehouse-management/entry-and-exit-record/empty-bottle-export',
                            component: () =>
                                import(
                                    '@/pages/warehouse-management/entry-and-exit-record/empty-bottle-export/empty-bottle-export.vue'
                                ),
                            meta: {
                                title: '空瓶出厂',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/warehouse-management/entry-and-exit-record/raw-materials-out-of-factory',
                            name: 'warehouse-management/entry-and-exit-record/raw-materials-out-of-factory',
                            component: () =>
                                import(
                                    '@/pages/warehouse-management/entry-and-exit-record/raw-materials-out-of-factory/raw-materials-out-of-factory.vue'
                                ),
                            meta: {
                                title: '原料出厂',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/warehouse-management/entry-and-exit-record/sales-out-of-factory',
                            name: 'warehouse-management/entry-and-exit-record/sales-out-of-factory',
                            redirect: '/warehouse-management/entry-and-exit-record/sales-out-of-factory',
                            meta: {
                                title: '销售出厂',
                                icon: 'Folder',
                            },
                            children: [
                                {
                                    path: '/warehouse-management/entry-and-exit-record/sales-out-of-factory/out-of-warehouse-inspection',
                                    name: 'warehouse-management/entry-and-exit-record/sales-out-of-factory/out-of-warehouse-inspection',
                                    component: () =>
                                        import(
                                            '@/pages/warehouse-management/entry-and-exit-record/sales-out-of-factory/out-of-warehouse-inspection/out-of-warehouse-inspection.vue'
                                        ),
                                    meta: {
                                        title: '出库检验',
                                        icon: 'Tickets',
                                    },
                                },
                                {
                                    path: '/warehouse-management/entry-and-exit-record/sales-out-of-factory/oqc',
                                    name: 'warehouse-management/entry-and-exit-record/sales-out-of-factory/oqc',
                                    component: () =>
                                        import(
                                            '@/pages/warehouse-management/entry-and-exit-record/sales-out-of-factory/oqc/oqc.vue'
                                        ),
                                    meta: {
                                        title: 'OQC',
                                        icon: 'Tickets',
                                    },
                                },
                                {
                                    path: '/warehouse-management/entry-and-exit-record/sales-out-of-factory/shipment-out-of-factory',
                                    name: 'warehouse-management/entry-and-exit-record/sales-out-of-factory/shipment-out-of-factory',
                                    component: () =>
                                        import(
                                            '@/pages/warehouse-management/entry-and-exit-record/sales-out-of-factory/shipment-out-of-factory/shipment-out-of-factory.vue'
                                        ),
                                    meta: {
                                        title: '发货出厂',
                                        icon: 'Tickets',
                                    },
                                },
                                {
                                    path: '/warehouse-management/entry-and-exit-record/sales-out-of-factory/customer-reception',
                                    name: 'warehouse-management/entry-and-exit-record/sales-out-of-factory/customer-reception',
                                    component: () =>
                                        import(
                                            '@/pages/warehouse-management/entry-and-exit-record/sales-out-of-factory/customer-reception/customer-reception.vue'
                                        ),
                                    meta: {
                                        title: '客户接收',
                                        icon: 'Tickets',
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            path: '/equipment-management',
            name: 'equipment-management',
            redirect: '/equipment-management',
            meta: {
                title: '设备管理',
                icon: 'Folder',
            },
            children: [
                {
                    path: '/equipment-management/equipment-archives',
                    name: 'equipment-management/equipment-archives',
                    redirect: '/equipment-management/equipment-archives',
                    meta: {
                        title: '设备档案',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/equipment-management/equipment-archives/production-equipment-ledger',
                            name: 'equipment-management/equipment-archives/production-equipment-ledger',
                            component: () =>
                                import(
                                    '@/pages/equipment-management/equipment-archives/production-equipment-ledger/production-equipment-ledger.vue'
                                ),
                            meta: {
                                title: '生产设备台账',
                                icon: 'Tickets',
                            },
                        },
                    ],
                },
                {
                    path: '/equipment-management/equipment-on-site-inspection',
                    name: 'equipment-management/equipment-on-site-inspection',
                    redirect: '/equipment-management/equipment-on-site-inspection',
                    meta: {
                        title: '设备巡检',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/equipment-management/equipment-on-site-inspection/inspection-plan',
                            name: 'equipment-management/equipment-on-site-inspection/inspection-plan',
                            component: () =>
                                import(
                                    '@/pages/equipment-management/equipment-on-site-inspection/inspection-plan/inspection-plan.vue'
                                ),
                            meta: {
                                title: '巡检方案',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/equipment-management/equipment-on-site-inspection/inspection-plan',
                            name: 'equipment-management/equipment-on-site-inspection/inspection-plan',
                            component: () =>
                                import(
                                    '@/pages/equipment-management/equipment-on-site-inspection/inspection-plan/inspection-plan.vue'
                                ),
                            meta: {
                                title: '巡检计划',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/equipment-management/equipment-on-site-inspection/inspection-record',
                            name: 'equipment-management/equipment-on-site-inspection/inspection-record',
                            component: () =>
                                import(
                                    '@/pages/equipment-management/equipment-on-site-inspection/inspection-record/inspection-record.vue'
                                ),
                            meta: {
                                title: '巡检记录',
                                icon: 'Tickets',
                            },
                        },
                    ],
                },
                {
                    path: '/equipment-management/equipment-maintenance',
                    name: 'equipment-management/equipment-maintenance',
                    redirect: '/equipment-management/equipment-maintenance',
                    meta: {
                        title: '设备保养',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/equipment-management/equipment-maintenance/maintenance-schema',
                            name: 'equipment-management/equipment-maintenance/maintenance-schema',
                            component: () =>
                                import(
                                    '@/pages/equipment-management/equipment-maintenance/maintenance-schema/maintenance-schema.vue'
                                ),
                            meta: {
                                title: '保养方案',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/equipment-management/equipment-maintenance/maintenance-plan',
                            name: 'equipment-management/equipment-maintenance/maintenance-plan',
                            component: () =>
                                import(
                                    '@/pages/equipment-management/equipment-maintenance/maintenance-plan/maintenance-plan.vue'
                                ),
                            meta: {
                                title: '保养计划',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/equipment-management/equipment-maintenance/maintenance-record',
                            name: 'equipment-management/equipment-maintenance/maintenance-record',
                            component: () =>
                                import(
                                    '@/pages/equipment-management/equipment-maintenance/maintenance-record/maintenance-record.vue'
                                ),
                            meta: {
                                title: '保养记录',
                                icon: 'Tickets',
                            },
                        },
                    ],
                },
                {
                    path: '/equipment-management/equipment-periodical-inspection',
                    name: 'equipment-management/equipment-periodical-inspection',
                    redirect: '/equipment-management/equipment-periodical-inspection',
                    meta: {
                        title: '设备定检',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/equipment-management/equipment-periodical-inspection/equipment-periodical-inspection',
                            name: 'equipment-management/equipment-periodical-inspection/equipment-periodical-inspection',
                            component: () =>
                                import(
                                    '@/pages/equipment-management/equipment-periodical-inspection/equipment-periodical-inspection/equipment-periodical-inspection.vue'
                                ),
                            meta: {
                                title: '设备定检',
                                icon: 'Tickets',
                            },
                        },
                    ],
                },
                {
                    path: '/equipment-management/equipment-verification',
                    name: 'equipment-management/equipment-verification',
                    redirect: '/equipment-management/equipment-verification',
                    meta: {
                        title: '设备校验',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/equipment-management/equipment-verification/equipment-verification',
                            name: 'equipment-management/equipment-verification/equipment-verification',
                            component: () =>
                                import(
                                    '@/pages/equipment-management/equipment-verification/equipment-verification/equipment-verification.vue'
                                ),
                            meta: {
                                title: '设备校验',
                                icon: 'Tickets',
                            },
                        },
                    ],
                },
                {
                    path: '/equipment-management/equipment-repair',
                    name: 'equipment-management/equipment-repair',
                    redirect: '/equipment-management/equipment-repair',
                    meta: {
                        title: '设备检修',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/equipment-management/equipment-repair/equipment-repair',
                            name: 'equipment-management/equipment-repair/equipment-repair',
                            component: () =>
                                import(
                                    '@/pages/equipment-management/equipment-repair/equipment-repair/equipment-repair.vue'
                                ),
                            meta: {
                                title: '设备检修',
                                icon: 'Tickets',
                            },
                        },
                    ],
                },
            ],
        },
        {
            path: '/abnormal-management',
            name: 'abnormal-management',
            redirect: '/abnormal-management',
            meta: {
                title: '异常管理',
                icon: 'Folder',
            },
            children: [
                {
                    path: '/abnormal-management/production-process-abnormal-handling-order',
                    name: 'abnormal-management/production-process-abnormal-handling-order',
                    component: () =>
                        import(
                            '@/pages/abnormal-management/production-process-abnormal-handling-order/production-process-abnormal-handling-order.vue'
                        ),
                    meta: {
                        title: '生产过程异常处置单',
                        icon: 'Tickets',
                    },
                },
                {
                    path: '/abnormal-management/return-handling-order',
                    name: 'abnormal-management/return-handling-order',
                    component: () =>
                        import('@/pages/abnormal-management/return-handling-order/return-handling-order.vue'),
                    meta: {
                        title: '退货处置单',
                        icon: 'Tickets',
                    },
                },
                {
                    path: '/abnormal-management/finished-product-abnormal-handling-order',
                    name: 'abnormal-management/finished-product-abnormal-handling-order',
                    component: () =>
                        import(
                            '@/pages/abnormal-management/finished-product-abnormal-handling-order/finished-product-abnormal-handling-order.vue'
                        ),
                    meta: {
                        title: '成品异常处置单',
                        icon: 'Tickets',
                    },
                },
                {
                    path: '/abnormal-management/online-analysis-abnormal-handling-single',
                    name: 'abnormal-management/online-analysis-abnormal-handling-single',
                    component: () =>
                        import(
                            '@/pages/abnormal-management/online-analysis-abnormal-handling-single/online-analysis-abnormal-handling-single.vue'
                        ),
                    meta: {
                        title: '在线分析异常处置单',
                        icon: 'Tickets',
                    },
                },
                {
                    path: '/abnormal-management/disposal-of-unqualified-areas',
                    name: 'abnormal-management/disposal-of-unqualified-areas',
                    component: () =>
                        import(
                            '@/pages/abnormal-management/disposal-of-unqualified-areas/disposal-of-unqualified-areas.vue'
                        ),
                    meta: {
                        title: '不合格区处置',
                        icon: 'Tickets',
                    },
                },
            ],
        },
        {
            path: '/system-management',
            name: 'system-management',
            redirect: '/system-management',
            meta: {
                title: '系统管理',
                icon: 'Folder',
            },
            children: [
                {
                    path: '/system-management/system-permissions',
                    name: 'system-management/system-permissions',
                    redirect: '/system-management/system-permissions',
                    meta: {
                        title: '系统权限',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/system-management/system-permissions/organization-management',
                            name: 'system-management/system-permissions/organization-management',
                            component: () =>
                                import(
                                    '@/pages/system-management/system-permissions/organization-management/organization-management.vue'
                                ),
                            meta: {
                                title: '组织管理',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/system-management/system-permissions/department-management',
                            name: 'system-management/system-permissions/department-management',
                            component: () =>
                                import(
                                    '@/pages/system-management/system-permissions/department-management/department-management.vue'
                                ),
                            meta: {
                                title: '部门管理',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/system-management/system-permissions/role-management',
                            name: 'system-management/system-permissions/role-management',
                            component: () =>
                                import(
                                    '@/pages/system-management/system-permissions/role-management/role-management.vue'
                                ),
                            meta: {
                                title: '角色管理',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/system-management/system-permissions/user-management',
                            name: 'system-management/system-permissions/user-management',
                            component: () =>
                                import(
                                    '@/pages/system-management/system-permissions/user-management/user-management.vue'
                                ),
                            meta: {
                                title: '用户管理',
                                icon: 'Tickets',
                            },
                        },
                    ],
                },
                {
                    path: '/system-management/log-management',
                    name: 'system-management/log-management',
                    redirect: '/system-management/log-management',
                    meta: {
                        title: '日志管理',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/system-management/log-management/login-log',
                            name: 'system-management/log-management/login-log',
                            component: () => import('@/pages/system-management/log-management/login-log/login-log.vue'),
                            meta: {
                                title: '登录日志',
                                icon: 'Tickets',
                            },
                        },
                        {
                            path: '/system-management/log-management/operation-log',
                            name: 'system-management/log-management/operation-log',
                            component: () =>
                                import('@/pages/system-management/log-management/operation-log/operation-log.vue'),
                            meta: {
                                title: '操作日志',
                                icon: 'Tickets',
                            },
                        },
                    ],
                },
            ],
        },
    ],
]);

const routes = computed<RouteRecordRaw[]>(() => [
    {
        path: '/',
        name: '/',
        component: markRaw(appLayout),
        redirect: '/home',
        meta: {
            icon: 'HomeFilled',
            title: 'index',
        },
        children: menuRoutes.value,
    },

    LOGIN_ROUTE,
    FORBIDDEN_ROUTE,
    SCREEN_ROUTE,
]);

const router = createRouter({
    history: createWebHistory(),
    routes: routes.value,
});

export default router;
export { menuRoutes, routes };

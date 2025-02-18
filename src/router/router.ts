import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import appLayout from '@/layout/index.vue';

import { FORBIDDEN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SCREEN_ROUTE } from './base';

const menuRoutes: RouteRecordRaw[] = [
    HOME_ROUTE.value,
    ...[
        {
            path: '/ji-chu-shu-ju',
            name: 'ji-chu-shu-ju',
            redirect: '/ji-chu-shu-ju',
            meta: {
                title: '基础数据',
                icon: 'Folder',
            },
            children: [
                {
                    path: '/ji-chu-shu-ju/ji-chu-zi-liao',
                    name: 'ji-chu-shu-ju/ji-chu-zi-liao',
                    redirect: '/ji-chu-shu-ju/ji-chu-zi-liao',
                    meta: {
                        title: '基础资料（已完成）',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/ji-chu-shu-ju/ji-chu-zi-liao/wu-liao-lie-biao',
                            name: 'ji-chu-shu-ju/ji-chu-zi-liao/wu-liao-lie-biao',
                            redirect: '',
                            component:
                                "() => import('@/pages/ji-chu-shu-ju/ji-chu-zi-liao/wu-liao-lie-biao/wu-liao-lie-biao.vue')",
                            meta: {
                                title: '物料列表',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/ji-chu-shu-ju/ji-chu-zi-liao/chang-nei-yao-qiu',
                            name: 'ji-chu-shu-ju/ji-chu-zi-liao/chang-nei-yao-qiu',
                            redirect: '',
                            component:
                                "() => import('@/pages/ji-chu-shu-ju/ji-chu-zi-liao/chang-nei-yao-qiu/chang-nei-yao-qiu.vue')",
                            meta: {
                                title: '厂内要求',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/ji-chu-shu-ju/ji-chu-zi-liao/ke-hu-lie-biao',
                            name: 'ji-chu-shu-ju/ji-chu-zi-liao/ke-hu-lie-biao',
                            redirect: '',
                            component:
                                "() => import('@/pages/ji-chu-shu-ju/ji-chu-zi-liao/ke-hu-lie-biao/ke-hu-lie-biao.vue')",
                            meta: {
                                title: '客户列表',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/ji-chu-shu-ju/ji-chu-zi-liao/ke-hu-yao-qiu',
                            name: 'ji-chu-shu-ju/ji-chu-zi-liao/ke-hu-yao-qiu',
                            redirect: '',
                            component:
                                "() => import('@/pages/ji-chu-shu-ju/ji-chu-zi-liao/ke-hu-yao-qiu/ke-hu-yao-qiu.vue')",
                            meta: {
                                title: '客户要求',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/ji-chu-shu-ju/ji-chu-zi-liao/gong-ying-shang-lie-biao',
                            name: 'ji-chu-shu-ju/ji-chu-zi-liao/gong-ying-shang-lie-biao',
                            redirect: '',
                            component:
                                "() => import('@/pages/ji-chu-shu-ju/ji-chu-zi-liao/gong-ying-shang-lie-biao/gong-ying-shang-lie-biao.vue')",
                            meta: {
                                title: '供应商列表',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/ji-chu-shu-ju/ji-chu-zi-liao/ji-liang-dan-wei',
                            name: 'ji-chu-shu-ju/ji-chu-zi-liao/ji-liang-dan-wei',
                            redirect: '',
                            component:
                                "() => import('@/pages/ji-chu-shu-ju/ji-chu-zi-liao/ji-liang-dan-wei/ji-liang-dan-wei.vue')",
                            meta: {
                                title: '计量单位',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/ji-chu-shu-ju/ji-chu-zi-liao/shu-ju-zi-dian',
                            name: 'ji-chu-shu-ju/ji-chu-zi-liao/shu-ju-zi-dian',
                            redirect: '',
                            component:
                                "() => import('@/pages/ji-chu-shu-ju/ji-chu-zi-liao/shu-ju-zi-dian/shu-ju-zi-dian.vue')",
                            meta: {
                                title: '数据字典',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                    ],
                },
                {
                    path: '/ji-chu-shu-ju/sheng-chan-zi-liao',
                    name: 'ji-chu-shu-ju/sheng-chan-zi-liao',
                    redirect: '/ji-chu-shu-ju/sheng-chan-zi-liao',
                    meta: {
                        title: '生产资料（已完成）',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/ji-chu-shu-ju/sheng-chan-zi-liao/gong-chang',
                            name: 'ji-chu-shu-ju/sheng-chan-zi-liao/gong-chang',
                            redirect: '',
                            component:
                                "() => import('@/pages/ji-chu-shu-ju/sheng-chan-zi-liao/gong-chang/gong-chang.vue')",
                            meta: {
                                title: '工厂',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/ji-chu-shu-ju/sheng-chan-zi-liao/che-jian',
                            name: 'ji-chu-shu-ju/sheng-chan-zi-liao/che-jian',
                            redirect: '',
                            component: "() => import('@/pages/ji-chu-shu-ju/sheng-chan-zi-liao/che-jian/che-jian.vue')",
                            meta: {
                                title: '车间',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/ji-chu-shu-ju/sheng-chan-zi-liao/chu-guan',
                            name: 'ji-chu-shu-ju/sheng-chan-zi-liao/chu-guan',
                            redirect: '',
                            component: "() => import('@/pages/ji-chu-shu-ju/sheng-chan-zi-liao/chu-guan/chu-guan.vue')",
                            meta: {
                                title: '储罐',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/ji-chu-shu-ju/sheng-chan-zi-liao/ban-zu',
                            name: 'ji-chu-shu-ju/sheng-chan-zi-liao/ban-zu',
                            redirect: '',
                            component: "() => import('@/pages/ji-chu-shu-ju/sheng-chan-zi-liao/ban-zu/ban-zu.vue')",
                            meta: {
                                title: '班组',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/ji-chu-shu-ju/sheng-chan-zi-liao/sheng-chan-xian',
                            name: 'ji-chu-shu-ju/sheng-chan-zi-liao/sheng-chan-xian',
                            redirect: '',
                            component:
                                "() => import('@/pages/ji-chu-shu-ju/sheng-chan-zi-liao/sheng-chan-xian/sheng-chan-xian.vue')",
                            meta: {
                                title: '生产线',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/ji-chu-shu-ju/sheng-chan-zi-liao/cai-ji-xiang-mu',
                            name: 'ji-chu-shu-ju/sheng-chan-zi-liao/cai-ji-xiang-mu',
                            redirect: '',
                            component:
                                "() => import('@/pages/ji-chu-shu-ju/sheng-chan-zi-liao/cai-ji-xiang-mu/cai-ji-xiang-mu.vue')",
                            meta: {
                                title: '采集项目',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/ji-chu-shu-ju/sheng-chan-zi-liao/cai-ji-fang-an',
                            name: 'ji-chu-shu-ju/sheng-chan-zi-liao/cai-ji-fang-an',
                            redirect: '',
                            component:
                                "() => import('@/pages/ji-chu-shu-ju/sheng-chan-zi-liao/cai-ji-fang-an/cai-ji-fang-an.vue')",
                            meta: {
                                title: '采集方案',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                    ],
                },
                {
                    path: '/ji-chu-shu-ju/zhi-liang-zi-liao',
                    name: 'ji-chu-shu-ju/zhi-liang-zi-liao',
                    redirect: '/ji-chu-shu-ju/zhi-liang-zi-liao',
                    meta: {
                        title: '质量资料（已完成）',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/ji-chu-shu-ju/zhi-liang-zi-liao/jian-yan-fang-an',
                            name: 'ji-chu-shu-ju/zhi-liang-zi-liao/jian-yan-fang-an',
                            redirect: '/ji-chu-shu-ju/zhi-liang-zi-liao/jian-yan-fang-an',
                            meta: {
                                title: '检验方案',
                                icon: 'Folder',
                            },
                            children: [
                                {
                                    path: '/ji-chu-shu-ju/zhi-liang-zi-liao/jian-yan-fang-an/jian-yan-xiang-mu',
                                    name: 'ji-chu-shu-ju/zhi-liang-zi-liao/jian-yan-fang-an/jian-yan-xiang-mu',
                                    redirect: '',
                                    component:
                                        "() => import('@/pages/ji-chu-shu-ju/zhi-liang-zi-liao/jian-yan-fang-an/jian-yan-xiang-mu/jian-yan-xiang-mu.vue')",
                                    meta: {
                                        title: '检验项目',
                                        icon: 'Tickets',
                                    },
                                    children: [],
                                },
                                {
                                    path: '/ji-chu-shu-ju/zhi-liang-zi-liao/jian-yan-fang-an/chang-nei-jian-yan-fang-an',
                                    name: 'ji-chu-shu-ju/zhi-liang-zi-liao/jian-yan-fang-an/chang-nei-jian-yan-fang-an',
                                    redirect: '',
                                    component:
                                        "() => import('@/pages/ji-chu-shu-ju/zhi-liang-zi-liao/jian-yan-fang-an/chang-nei-jian-yan-fang-an/chang-nei-jian-yan-fang-an.vue')",
                                    meta: {
                                        title: '厂内检验方案',
                                        icon: 'Tickets',
                                    },
                                    children: [],
                                },
                                {
                                    path: '/ji-chu-shu-ju/zhi-liang-zi-liao/jian-yan-fang-an/ke-hu-jian-yan-fang-an',
                                    name: 'ji-chu-shu-ju/zhi-liang-zi-liao/jian-yan-fang-an/ke-hu-jian-yan-fang-an',
                                    redirect: '',
                                    component:
                                        "() => import('@/pages/ji-chu-shu-ju/zhi-liang-zi-liao/jian-yan-fang-an/ke-hu-jian-yan-fang-an/ke-hu-jian-yan-fang-an.vue')",
                                    meta: {
                                        title: '客户检验方案',
                                        icon: 'Tickets',
                                    },
                                    children: [],
                                },
                            ],
                        },
                        {
                            path: '/ji-chu-shu-ju/zhi-liang-zi-liao/SPC-pan-yi',
                            name: 'ji-chu-shu-ju/zhi-liang-zi-liao/SPC-pan-yi',
                            redirect: '/ji-chu-shu-ju/zhi-liang-zi-liao/SPC-pan-yi',
                            meta: {
                                title: 'SPC判异',
                                icon: 'Folder',
                            },
                            children: [
                                {
                                    path: '/ji-chu-shu-ju/zhi-liang-zi-liao/SPC-pan-yi/pan-yi-gui-ze-she-zhi',
                                    name: 'ji-chu-shu-ju/zhi-liang-zi-liao/SPC-pan-yi/pan-yi-gui-ze-she-zhi',
                                    redirect: '',
                                    component:
                                        "() => import('@/pages/ji-chu-shu-ju/zhi-liang-zi-liao/SPC-pan-yi/pan-yi-gui-ze-she-zhi/pan-yi-gui-ze-she-zhi.vue')",
                                    meta: {
                                        title: '判异规则设置',
                                        icon: 'Tickets',
                                    },
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    path: '/ji-chu-shu-ju/cang-ku-zi-liao',
                    name: 'ji-chu-shu-ju/cang-ku-zi-liao',
                    redirect: '/ji-chu-shu-ju/cang-ku-zi-liao',
                    meta: {
                        title: '仓库资料（已完成）',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/ji-chu-shu-ju/cang-ku-zi-liao/cang-ku-lie-biao',
                            name: 'ji-chu-shu-ju/cang-ku-zi-liao/cang-ku-lie-biao',
                            redirect: '',
                            component:
                                "() => import('@/pages/ji-chu-shu-ju/cang-ku-zi-liao/cang-ku-lie-biao/cang-ku-lie-biao.vue')",
                            meta: {
                                title: '仓库列表',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/ji-chu-shu-ju/cang-ku-zi-liao/ku-cun-yu-jing',
                            name: 'ji-chu-shu-ju/cang-ku-zi-liao/ku-cun-yu-jing',
                            redirect: '',
                            component:
                                "() => import('@/pages/ji-chu-shu-ju/cang-ku-zi-liao/ku-cun-yu-jing/ku-cun-yu-jing.vue')",
                            meta: {
                                title: '库存预警',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/ji-chu-shu-ju/cang-ku-zi-liao/wu-liu-lie-biao',
                            name: 'ji-chu-shu-ju/cang-ku-zi-liao/wu-liu-lie-biao',
                            redirect: '',
                            component:
                                "() => import('@/pages/ji-chu-shu-ju/cang-ku-zi-liao/wu-liu-lie-biao/wu-liu-lie-biao.vue')",
                            meta: {
                                title: '物流列表',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                    ],
                },
            ],
        },
        {
            path: '/ji-hua-guan-li',
            name: 'ji-hua-guan-li',
            redirect: '/ji-hua-guan-li',
            meta: {
                title: '计划管理',
                icon: 'Folder',
            },
            children: [
                {
                    path: '/ji-hua-guan-li/xiao-shou-ding-dan',
                    name: 'ji-hua-guan-li/xiao-shou-ding-dan',
                    redirect: '',
                    component: "() => import('@/pages/ji-hua-guan-li/xiao-shou-ding-dan/xiao-shou-ding-dan.vue')",
                    meta: {
                        title: '销售订单',
                        icon: 'Tickets',
                    },
                    children: [],
                },
                {
                    path: '/ji-hua-guan-li/yuan-liao-dao-huo-dan',
                    name: 'ji-hua-guan-li/yuan-liao-dao-huo-dan',
                    redirect: '',
                    component: "() => import('@/pages/ji-hua-guan-li/yuan-liao-dao-huo-dan/yuan-liao-dao-huo-dan.vue')",
                    meta: {
                        title: '原料到货单',
                        icon: 'Tickets',
                    },
                    children: [],
                },
                {
                    path: '/ji-hua-guan-li/chan-xian-yun-xing-dan',
                    name: 'ji-hua-guan-li/chan-xian-yun-xing-dan',
                    redirect: '',
                    component:
                        "() => import('@/pages/ji-hua-guan-li/chan-xian-yun-xing-dan/chan-xian-yun-xing-dan.vue')",
                    meta: {
                        title: '产线运行单',
                        icon: 'Tickets',
                    },
                    children: [],
                },
                {
                    path: '/ji-hua-guan-li/sheng-chan-ji-hua-dan',
                    name: 'ji-hua-guan-li/sheng-chan-ji-hua-dan',
                    redirect: '',
                    component: "() => import('@/pages/ji-hua-guan-li/sheng-chan-ji-hua-dan/sheng-chan-ji-hua-dan.vue')",
                    meta: {
                        title: '生产计划单',
                        icon: 'Tickets',
                    },
                    children: [],
                },
                {
                    path: '/ji-hua-guan-li/chong-zhuang-ji-hua-dan',
                    name: 'ji-hua-guan-li/chong-zhuang-ji-hua-dan',
                    redirect: '',
                    component:
                        "() => import('@/pages/ji-hua-guan-li/chong-zhuang-ji-hua-dan/chong-zhuang-ji-hua-dan.vue')",
                    meta: {
                        title: '充装计划单',
                        icon: 'Tickets',
                    },
                    children: [],
                },
                {
                    path: '/ji-hua-guan-li/fa-huo-tong-zhi-dan',
                    name: 'ji-hua-guan-li/fa-huo-tong-zhi-dan',
                    redirect: '',
                    component: "() => import('@/pages/ji-hua-guan-li/fa-huo-tong-zhi-dan/fa-huo-tong-zhi-dan.vue')",
                    meta: {
                        title: '发货通知单',
                        icon: 'Tickets',
                    },
                    children: [],
                },
            ],
        },
        {
            path: '/sheng-chan-guan-li',
            name: 'sheng-chan-guan-li',
            redirect: '/sheng-chan-guan-li',
            meta: {
                title: '生产管理',
                icon: 'Folder',
            },
            children: [
                {
                    path: '/sheng-chan-guan-li/cao-zuo-ji-lu',
                    name: 'sheng-chan-guan-li/cao-zuo-ji-lu',
                    redirect: '/sheng-chan-guan-li/cao-zuo-ji-lu',
                    meta: {
                        title: '操作记录',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/sheng-chan-guan-li/cao-zuo-ji-lu/sheng-chan-deng-ji-ji-lu',
                            name: 'sheng-chan-guan-li/cao-zuo-ji-lu/sheng-chan-deng-ji-ji-lu',
                            redirect: '',
                            component:
                                "() => import('@/pages/sheng-chan-guan-li/cao-zuo-ji-lu/sheng-chan-deng-ji-ji-lu/sheng-chan-deng-ji-ji-lu.vue')",
                            meta: {
                                title: '生产登记记录',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/sheng-chan-guan-li/cao-zuo-ji-lu/chong-zhuang-deng-ji-ji-lu',
                            name: 'sheng-chan-guan-li/cao-zuo-ji-lu/chong-zhuang-deng-ji-ji-lu',
                            redirect: '',
                            component:
                                "() => import('@/pages/sheng-chan-guan-li/cao-zuo-ji-lu/chong-zhuang-deng-ji-ji-lu/chong-zhuang-deng-ji-ji-lu.vue')",
                            meta: {
                                title: '充装登记记录',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/sheng-chan-guan-li/cao-zuo-ji-lu/wu-liao-hui-shou-ji-lu',
                            name: 'sheng-chan-guan-li/cao-zuo-ji-lu/wu-liao-hui-shou-ji-lu',
                            redirect: '',
                            component:
                                "() => import('@/pages/sheng-chan-guan-li/cao-zuo-ji-lu/wu-liao-hui-shou-ji-lu/wu-liao-hui-shou-ji-lu.vue')",
                            meta: {
                                title: '物料回收记录',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                    ],
                },
                {
                    path: '/sheng-chan-guan-li/sheng-chan-bao-biao',
                    name: 'sheng-chan-guan-li/sheng-chan-bao-biao',
                    redirect: '/sheng-chan-guan-li/sheng-chan-bao-biao',
                    meta: {
                        title: '生产报表',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/sheng-chan-guan-li/sheng-chan-bao-biao/ri-sheng-chan-bao-biao',
                            name: 'sheng-chan-guan-li/sheng-chan-bao-biao/ri-sheng-chan-bao-biao',
                            redirect: '',
                            component:
                                "() => import('@/pages/sheng-chan-guan-li/sheng-chan-bao-biao/ri-sheng-chan-bao-biao/ri-sheng-chan-bao-biao.vue')",
                            meta: {
                                title: '日生产报表',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                    ],
                },
            ],
        },
        {
            path: '/rong-qi-guan-li',
            name: 'rong-qi-guan-li',
            redirect: '/rong-qi-guan-li',
            meta: {
                title: '容器管理',
                icon: 'Folder',
            },
            children: [
                {
                    path: '/rong-qi-guan-li/rong-qi-dang-an',
                    name: 'rong-qi-guan-li/rong-qi-dang-an',
                    redirect: '/rong-qi-guan-li/rong-qi-dang-an',
                    meta: {
                        title: '容器档案',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/rong-qi-guan-li/rong-qi-dang-an/rong-qi-dang-an',
                            name: 'rong-qi-guan-li/rong-qi-dang-an/rong-qi-dang-an',
                            redirect: '',
                            component:
                                "() => import('@/pages/rong-qi-guan-li/rong-qi-dang-an/rong-qi-dang-an/rong-qi-dang-an.vue')",
                            meta: {
                                title: '容器档案',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                    ],
                },
                {
                    path: '/rong-qi-guan-li/rong-qi-chu-li-ji-lu',
                    name: 'rong-qi-guan-li/rong-qi-chu-li-ji-lu',
                    redirect: '/rong-qi-guan-li/rong-qi-chu-li-ji-lu',
                    meta: {
                        title: '容器处理记录',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/rong-qi-guan-li/rong-qi-chu-li-ji-lu/rong-qi-chu-li-ji-lu',
                            name: 'rong-qi-guan-li/rong-qi-chu-li-ji-lu/rong-qi-chu-li-ji-lu',
                            redirect: '',
                            component:
                                "() => import('@/pages/rong-qi-guan-li/rong-qi-chu-li-ji-lu/rong-qi-chu-li-ji-lu/rong-qi-chu-li-ji-lu.vue')",
                            meta: {
                                title: '容器处理记录',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                    ],
                },
                {
                    path: '/rong-qi-guan-li/chang-wai-cun-ping-tong-ji',
                    name: 'rong-qi-guan-li/chang-wai-cun-ping-tong-ji',
                    redirect: '/rong-qi-guan-li/chang-wai-cun-ping-tong-ji',
                    meta: {
                        title: '厂外存瓶统计',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/rong-qi-guan-li/chang-wai-cun-ping-tong-ji/chang-wai-cun-ping-tong-ji',
                            name: 'rong-qi-guan-li/chang-wai-cun-ping-tong-ji/chang-wai-cun-ping-tong-ji',
                            redirect: '',
                            component:
                                "() => import('@/pages/rong-qi-guan-li/chang-wai-cun-ping-tong-ji/chang-wai-cun-ping-tong-ji/chang-wai-cun-ping-tong-ji.vue')",
                            meta: {
                                title: '厂外存瓶统计',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                    ],
                },
                {
                    path: '/rong-qi-guan-li/rong-qi-liu-zhuan-lü-li',
                    name: 'rong-qi-guan-li/rong-qi-liu-zhuan-lü-li',
                    redirect: '/rong-qi-guan-li/rong-qi-liu-zhuan-lü-li',
                    meta: {
                        title: '容器流转履历',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/rong-qi-guan-li/rong-qi-liu-zhuan-lü-li/rong-qi-liu-zhuan-lü-li',
                            name: 'rong-qi-guan-li/rong-qi-liu-zhuan-lü-li/rong-qi-liu-zhuan-lü-li',
                            redirect: '',
                            component:
                                "() => import('@/pages/rong-qi-guan-li/rong-qi-liu-zhuan-lü-li/rong-qi-liu-zhuan-lü-li/rong-qi-liu-zhuan-lü-li.vue')",
                            meta: {
                                title: '容器流转履历',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                    ],
                },
            ],
        },
        {
            path: '/zhi-liang-guan-li',
            name: 'zhi-liang-guan-li',
            redirect: '/zhi-liang-guan-li',
            meta: {
                title: '质量管理',
                icon: 'Folder',
            },
            children: [
                {
                    path: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li',
                    name: 'zhi-liang-guan-li/fen-xi-she-bei-guan-li',
                    redirect: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li',
                    meta: {
                        title: '分析设备管理（已完成）',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-dang-an',
                            name: 'zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-dang-an',
                            redirect: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-dang-an',
                            meta: {
                                title: '设备档案',
                                icon: 'Folder',
                            },
                            children: [
                                {
                                    path: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-dang-an/fen-xi-she-bei-tai-zhang',
                                    name: 'zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-dang-an/fen-xi-she-bei-tai-zhang',
                                    redirect: '',
                                    component:
                                        "() => import('@/pages/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-dang-an/fen-xi-she-bei-tai-zhang/fen-xi-she-bei-tai-zhang.vue')",
                                    meta: {
                                        title: '分析设备台账',
                                        icon: 'Tickets',
                                    },
                                    children: [],
                                },
                            ],
                        },
                        {
                            path: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-bao-yang',
                            name: 'zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-bao-yang',
                            redirect: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-bao-yang',
                            meta: {
                                title: '设备保养',
                                icon: 'Folder',
                            },
                            children: [
                                {
                                    path: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-bao-yang/bao-yang-fang-an',
                                    name: 'zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-bao-yang/bao-yang-fang-an',
                                    redirect: '',
                                    component:
                                        "() => import('@/pages/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-bao-yang/bao-yang-fang-an/bao-yang-fang-an.vue')",
                                    meta: {
                                        title: '保养方案',
                                        icon: 'Tickets',
                                    },
                                    children: [],
                                },
                                {
                                    path: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-bao-yang/bao-yang-ji-hua',
                                    name: 'zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-bao-yang/bao-yang-ji-hua',
                                    redirect: '',
                                    component:
                                        "() => import('@/pages/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-bao-yang/bao-yang-ji-hua/bao-yang-ji-hua.vue')",
                                    meta: {
                                        title: '保养计划',
                                        icon: 'Tickets',
                                    },
                                    children: [],
                                },
                                {
                                    path: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-bao-yang/bao-yang-ji-lu',
                                    name: 'zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-bao-yang/bao-yang-ji-lu',
                                    redirect: '',
                                    component:
                                        "() => import('@/pages/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-bao-yang/bao-yang-ji-lu/bao-yang-ji-lu.vue')",
                                    meta: {
                                        title: '保养记录',
                                        icon: 'Tickets',
                                    },
                                    children: [],
                                },
                            ],
                        },
                        {
                            path: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-xun-jian',
                            name: 'zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-xun-jian',
                            redirect: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-xun-jian',
                            meta: {
                                title: '设备巡检',
                                icon: 'Folder',
                            },
                            children: [
                                {
                                    path: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-xun-jian/xun-jian-fang-an',
                                    name: 'zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-xun-jian/xun-jian-fang-an',
                                    redirect: '',
                                    component:
                                        "() => import('@/pages/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-xun-jian/xun-jian-fang-an/xun-jian-fang-an.vue')",
                                    meta: {
                                        title: '巡检方案',
                                        icon: 'Tickets',
                                    },
                                    children: [],
                                },
                                {
                                    path: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-xun-jian/xun-jian-ji-hua',
                                    name: 'zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-xun-jian/xun-jian-ji-hua',
                                    redirect: '',
                                    component:
                                        "() => import('@/pages/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-xun-jian/xun-jian-ji-hua/xun-jian-ji-hua.vue')",
                                    meta: {
                                        title: '巡检计划',
                                        icon: 'Tickets',
                                    },
                                    children: [],
                                },
                                {
                                    path: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-xun-jian/xun-jian-ji-lu',
                                    name: 'zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-xun-jian/xun-jian-ji-lu',
                                    redirect: '',
                                    component:
                                        "() => import('@/pages/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-xun-jian/xun-jian-ji-lu/xun-jian-ji-lu.vue')",
                                    meta: {
                                        title: '巡检记录',
                                        icon: 'Tickets',
                                    },
                                    children: [],
                                },
                            ],
                        },
                        {
                            path: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-ding-jian',
                            name: 'zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-ding-jian',
                            redirect: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-ding-jian',
                            meta: {
                                title: '设备定检',
                                icon: 'Folder',
                            },
                            children: [
                                {
                                    path: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-ding-jian/she-bei-ding-jian',
                                    name: 'zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-ding-jian/she-bei-ding-jian',
                                    redirect: '',
                                    component:
                                        "() => import('@/pages/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-ding-jian/she-bei-ding-jian/she-bei-ding-jian.vue')",
                                    meta: {
                                        title: '设备定检',
                                        icon: 'Tickets',
                                    },
                                    children: [],
                                },
                            ],
                        },
                        {
                            path: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-jiao-yan',
                            name: 'zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-jiao-yan',
                            redirect: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-jiao-yan',
                            meta: {
                                title: '设备校验',
                                icon: 'Folder',
                            },
                            children: [
                                {
                                    path: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-jiao-yan/she-bei-jiao-yan',
                                    name: 'zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-jiao-yan/she-bei-jiao-yan',
                                    redirect: '',
                                    component:
                                        "() => import('@/pages/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-jiao-yan/she-bei-jiao-yan/she-bei-jiao-yan.vue')",
                                    meta: {
                                        title: '设备校验',
                                        icon: 'Tickets',
                                    },
                                    children: [],
                                },
                            ],
                        },
                        {
                            path: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-jian-xiu',
                            name: 'zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-jian-xiu',
                            redirect: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-jian-xiu',
                            meta: {
                                title: '设备检修',
                                icon: 'Folder',
                            },
                            children: [
                                {
                                    path: '/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-jian-xiu/she-bei-jian-xiu',
                                    name: 'zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-jian-xiu/she-bei-jian-xiu',
                                    redirect: '',
                                    component:
                                        "() => import('@/pages/zhi-liang-guan-li/fen-xi-she-bei-guan-li/she-bei-jian-xiu/she-bei-jian-xiu/she-bei-jian-xiu.vue')",
                                    meta: {
                                        title: '设备检修',
                                        icon: 'Tickets',
                                    },
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    path: '/zhi-liang-guan-li/zhi-liang-jian-yan',
                    name: 'zhi-liang-guan-li/zhi-liang-jian-yan',
                    redirect: '/zhi-liang-guan-li/zhi-liang-jian-yan',
                    meta: {
                        title: '质量检验',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/zhi-liang-guan-li/zhi-liang-jian-yan/zhi-liang-jian-yan',
                            name: 'zhi-liang-guan-li/zhi-liang-jian-yan/zhi-liang-jian-yan',
                            redirect: '',
                            component:
                                "() => import('@/pages/zhi-liang-guan-li/zhi-liang-jian-yan/zhi-liang-jian-yan/zhi-liang-jian-yan.vue')",
                            meta: {
                                title: '质量检验',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                    ],
                },
                {
                    path: '/zhi-liang-guan-li/zhi-liang-bao-gao',
                    name: 'zhi-liang-guan-li/zhi-liang-bao-gao',
                    redirect: '/zhi-liang-guan-li/zhi-liang-bao-gao',
                    meta: {
                        title: '质量报告',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/zhi-liang-guan-li/zhi-liang-bao-gao/zhi-liang-bao-gao-pei-zhi',
                            name: 'zhi-liang-guan-li/zhi-liang-bao-gao/zhi-liang-bao-gao-pei-zhi',
                            redirect: '',
                            component:
                                "() => import('@/pages/zhi-liang-guan-li/zhi-liang-bao-gao/zhi-liang-bao-gao-pei-zhi/zhi-liang-bao-gao-pei-zhi.vue')",
                            meta: {
                                title: '质量报告配置',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                    ],
                },
                {
                    path: '/zhi-liang-guan-li/SPC-kong-zhi',
                    name: 'zhi-liang-guan-li/SPC-kong-zhi',
                    redirect: '/zhi-liang-guan-li/SPC-kong-zhi',
                    meta: {
                        title: 'SPC控制',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/zhi-liang-guan-li/SPC-kong-zhi/ji-liang-xing-SPC',
                            name: 'zhi-liang-guan-li/SPC-kong-zhi/ji-liang-xing-SPC',
                            redirect: '',
                            component:
                                "() => import('@/pages/zhi-liang-guan-li/SPC-kong-zhi/ji-liang-xing-SPC/ji-liang-xing-SPC.vue')",
                            meta: {
                                title: '计量型SPC',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                    ],
                },
            ],
        },
        {
            path: '/cang-ku-guan-li',
            name: 'cang-ku-guan-li',
            redirect: '/cang-ku-guan-li',
            meta: {
                title: '仓库管理',
                icon: 'Folder',
            },
            children: [
                {
                    path: '/cang-ku-guan-li/WMS-cang',
                    name: 'cang-ku-guan-li/WMS-cang',
                    redirect: '/cang-ku-guan-li/WMS-cang',
                    meta: {
                        title: 'WMS仓',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/cang-ku-guan-li/WMS-cang/kong-ping-cang-ku-cun',
                            name: 'cang-ku-guan-li/WMS-cang/kong-ping-cang-ku-cun',
                            redirect: '',
                            component:
                                "() => import('@/pages/cang-ku-guan-li/WMS-cang/kong-ping-cang-ku-cun/kong-ping-cang-ku-cun.vue')",
                            meta: {
                                title: '空瓶仓库存',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/cang-ku-guan-li/WMS-cang/yuan-liao-cang-ku-cun',
                            name: 'cang-ku-guan-li/WMS-cang/yuan-liao-cang-ku-cun',
                            redirect: '',
                            component:
                                "() => import('@/pages/cang-ku-guan-li/WMS-cang/yuan-liao-cang-ku-cun/yuan-liao-cang-ku-cun.vue')",
                            meta: {
                                title: '原料仓库存',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/cang-ku-guan-li/WMS-cang/cheng-pin-ku-cun',
                            name: 'cang-ku-guan-li/WMS-cang/cheng-pin-ku-cun',
                            redirect: '',
                            component:
                                "() => import('@/pages/cang-ku-guan-li/WMS-cang/cheng-pin-ku-cun/cheng-pin-ku-cun.vue')",
                            meta: {
                                title: '成品库存',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/cang-ku-guan-li/WMS-cang/chu-guan-ku-cun',
                            name: 'cang-ku-guan-li/WMS-cang/chu-guan-ku-cun',
                            redirect: '',
                            component:
                                "() => import('@/pages/cang-ku-guan-li/WMS-cang/chu-guan-ku-cun/chu-guan-ku-cun.vue')",
                            meta: {
                                title: '储罐库存',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                    ],
                },
                {
                    path: '/cang-ku-guan-li/chu-ru-ku-ji-lu',
                    name: 'cang-ku-guan-li/chu-ru-ku-ji-lu',
                    redirect: '/cang-ku-guan-li/chu-ru-ku-ji-lu',
                    meta: {
                        title: '出入库记录',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/cang-ku-guan-li/chu-ru-ku-ji-lu/ru-chang-jian-yan',
                            name: 'cang-ku-guan-li/chu-ru-ku-ji-lu/ru-chang-jian-yan',
                            redirect: '',
                            component:
                                "() => import('@/pages/cang-ku-guan-li/chu-ru-ku-ji-lu/ru-chang-jian-yan/ru-chang-jian-yan.vue')",
                            meta: {
                                title: '入厂检验（已完成）',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/cang-ku-guan-li/chu-ru-ku-ji-lu/yuan-liao-ru-ku',
                            name: 'cang-ku-guan-li/chu-ru-ku-ji-lu/yuan-liao-ru-ku',
                            redirect: '',
                            component:
                                "() => import('@/pages/cang-ku-guan-li/chu-ru-ku-ji-lu/yuan-liao-ru-ku/yuan-liao-ru-ku.vue')",
                            meta: {
                                title: '原料入库',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/cang-ku-guan-li/chu-ru-ku-ji-lu/cheng-pin-ru-ku',
                            name: 'cang-ku-guan-li/chu-ru-ku-ji-lu/cheng-pin-ru-ku',
                            redirect: '',
                            component:
                                "() => import('@/pages/cang-ku-guan-li/chu-ru-ku-ji-lu/cheng-pin-ru-ku/cheng-pin-ru-ku.vue')",
                            meta: {
                                title: '成品入库',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/cang-ku-guan-li/chu-ru-ku-ji-lu/kong-ping-chu-chang',
                            name: 'cang-ku-guan-li/chu-ru-ku-ji-lu/kong-ping-chu-chang',
                            redirect: '',
                            component:
                                "() => import('@/pages/cang-ku-guan-li/chu-ru-ku-ji-lu/kong-ping-chu-chang/kong-ping-chu-chang.vue')",
                            meta: {
                                title: '空瓶出厂',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/cang-ku-guan-li/chu-ru-ku-ji-lu/yuan-liao-chu-chang',
                            name: 'cang-ku-guan-li/chu-ru-ku-ji-lu/yuan-liao-chu-chang',
                            redirect: '',
                            component:
                                "() => import('@/pages/cang-ku-guan-li/chu-ru-ku-ji-lu/yuan-liao-chu-chang/yuan-liao-chu-chang.vue')",
                            meta: {
                                title: '原料出厂',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/cang-ku-guan-li/chu-ru-ku-ji-lu/xiao-shou-chu-chang',
                            name: 'cang-ku-guan-li/chu-ru-ku-ji-lu/xiao-shou-chu-chang',
                            redirect: '/cang-ku-guan-li/chu-ru-ku-ji-lu/xiao-shou-chu-chang',
                            meta: {
                                title: '销售出厂',
                                icon: 'Folder',
                            },
                            children: [
                                {
                                    path: '/cang-ku-guan-li/chu-ru-ku-ji-lu/xiao-shou-chu-chang/chu-ku-jian-yan',
                                    name: 'cang-ku-guan-li/chu-ru-ku-ji-lu/xiao-shou-chu-chang/chu-ku-jian-yan',
                                    redirect: '',
                                    component:
                                        "() => import('@/pages/cang-ku-guan-li/chu-ru-ku-ji-lu/xiao-shou-chu-chang/chu-ku-jian-yan/chu-ku-jian-yan.vue')",
                                    meta: {
                                        title: '出库检验',
                                        icon: 'Tickets',
                                    },
                                    children: [],
                                },
                                {
                                    path: '/cang-ku-guan-li/chu-ru-ku-ji-lu/xiao-shou-chu-chang/OQC',
                                    name: 'cang-ku-guan-li/chu-ru-ku-ji-lu/xiao-shou-chu-chang/OQC',
                                    redirect: '',
                                    component:
                                        "() => import('@/pages/cang-ku-guan-li/chu-ru-ku-ji-lu/xiao-shou-chu-chang/OQC/OQC.vue')",
                                    meta: {
                                        title: 'OQC',
                                        icon: 'Tickets',
                                    },
                                    children: [],
                                },
                                {
                                    path: '/cang-ku-guan-li/chu-ru-ku-ji-lu/xiao-shou-chu-chang/fa-huo-chu-chang',
                                    name: 'cang-ku-guan-li/chu-ru-ku-ji-lu/xiao-shou-chu-chang/fa-huo-chu-chang',
                                    redirect: '',
                                    component:
                                        "() => import('@/pages/cang-ku-guan-li/chu-ru-ku-ji-lu/xiao-shou-chu-chang/fa-huo-chu-chang/fa-huo-chu-chang.vue')",
                                    meta: {
                                        title: '发货出厂',
                                        icon: 'Tickets',
                                    },
                                    children: [],
                                },
                                {
                                    path: '/cang-ku-guan-li/chu-ru-ku-ji-lu/xiao-shou-chu-chang/ke-hu-jie-shou',
                                    name: 'cang-ku-guan-li/chu-ru-ku-ji-lu/xiao-shou-chu-chang/ke-hu-jie-shou',
                                    redirect: '',
                                    component:
                                        "() => import('@/pages/cang-ku-guan-li/chu-ru-ku-ji-lu/xiao-shou-chu-chang/ke-hu-jie-shou/ke-hu-jie-shou.vue')",
                                    meta: {
                                        title: '客户接收',
                                        icon: 'Tickets',
                                    },
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            path: '/she-bei-guan-li',
            name: 'she-bei-guan-li',
            redirect: '/she-bei-guan-li',
            meta: {
                title: '设备管理',
                icon: 'Folder',
            },
            children: [
                {
                    path: '/she-bei-guan-li/she-bei-dang-an',
                    name: 'she-bei-guan-li/she-bei-dang-an',
                    redirect: '/she-bei-guan-li/she-bei-dang-an',
                    meta: {
                        title: '设备档案',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/she-bei-guan-li/she-bei-dang-an/sheng-chan-she-bei-tai-zhang',
                            name: 'she-bei-guan-li/she-bei-dang-an/sheng-chan-she-bei-tai-zhang',
                            redirect: '',
                            component:
                                "() => import('@/pages/she-bei-guan-li/she-bei-dang-an/sheng-chan-she-bei-tai-zhang/sheng-chan-she-bei-tai-zhang.vue')",
                            meta: {
                                title: '生产设备台账',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                    ],
                },
                {
                    path: '/she-bei-guan-li/she-bei-xun-jian',
                    name: 'she-bei-guan-li/she-bei-xun-jian',
                    redirect: '/she-bei-guan-li/she-bei-xun-jian',
                    meta: {
                        title: '设备巡检',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/she-bei-guan-li/she-bei-xun-jian/xun-jian-fang-an',
                            name: 'she-bei-guan-li/she-bei-xun-jian/xun-jian-fang-an',
                            redirect: '',
                            component:
                                "() => import('@/pages/she-bei-guan-li/she-bei-xun-jian/xun-jian-fang-an/xun-jian-fang-an.vue')",
                            meta: {
                                title: '巡检方案',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/she-bei-guan-li/she-bei-xun-jian/xun-jian-ji-hua',
                            name: 'she-bei-guan-li/she-bei-xun-jian/xun-jian-ji-hua',
                            redirect: '',
                            component:
                                "() => import('@/pages/she-bei-guan-li/she-bei-xun-jian/xun-jian-ji-hua/xun-jian-ji-hua.vue')",
                            meta: {
                                title: '巡检计划',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/she-bei-guan-li/she-bei-xun-jian/xun-jian-ji-lu',
                            name: 'she-bei-guan-li/she-bei-xun-jian/xun-jian-ji-lu',
                            redirect: '',
                            component:
                                "() => import('@/pages/she-bei-guan-li/she-bei-xun-jian/xun-jian-ji-lu/xun-jian-ji-lu.vue')",
                            meta: {
                                title: '巡检记录',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                    ],
                },
                {
                    path: '/she-bei-guan-li/she-bei-bao-yang',
                    name: 'she-bei-guan-li/she-bei-bao-yang',
                    redirect: '/she-bei-guan-li/she-bei-bao-yang',
                    meta: {
                        title: '设备保养',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/she-bei-guan-li/she-bei-bao-yang/bao-yang-fang-an',
                            name: 'she-bei-guan-li/she-bei-bao-yang/bao-yang-fang-an',
                            redirect: '',
                            component:
                                "() => import('@/pages/she-bei-guan-li/she-bei-bao-yang/bao-yang-fang-an/bao-yang-fang-an.vue')",
                            meta: {
                                title: '保养方案',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/she-bei-guan-li/she-bei-bao-yang/bao-yang-ji-hua',
                            name: 'she-bei-guan-li/she-bei-bao-yang/bao-yang-ji-hua',
                            redirect: '',
                            component:
                                "() => import('@/pages/she-bei-guan-li/she-bei-bao-yang/bao-yang-ji-hua/bao-yang-ji-hua.vue')",
                            meta: {
                                title: '保养计划',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/she-bei-guan-li/she-bei-bao-yang/bao-yang-ji-lu',
                            name: 'she-bei-guan-li/she-bei-bao-yang/bao-yang-ji-lu',
                            redirect: '',
                            component:
                                "() => import('@/pages/she-bei-guan-li/she-bei-bao-yang/bao-yang-ji-lu/bao-yang-ji-lu.vue')",
                            meta: {
                                title: '保养记录',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                    ],
                },
                {
                    path: '/she-bei-guan-li/she-bei-ding-jian',
                    name: 'she-bei-guan-li/she-bei-ding-jian',
                    redirect: '/she-bei-guan-li/she-bei-ding-jian',
                    meta: {
                        title: '设备定检',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/she-bei-guan-li/she-bei-ding-jian/she-bei-ding-jian',
                            name: 'she-bei-guan-li/she-bei-ding-jian/she-bei-ding-jian',
                            redirect: '',
                            component:
                                "() => import('@/pages/she-bei-guan-li/she-bei-ding-jian/she-bei-ding-jian/she-bei-ding-jian.vue')",
                            meta: {
                                title: '设备定检',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                    ],
                },
                {
                    path: '/she-bei-guan-li/she-bei-jiao-yan',
                    name: 'she-bei-guan-li/she-bei-jiao-yan',
                    redirect: '/she-bei-guan-li/she-bei-jiao-yan',
                    meta: {
                        title: '设备校验',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/she-bei-guan-li/she-bei-jiao-yan/she-bei-jiao-yan',
                            name: 'she-bei-guan-li/she-bei-jiao-yan/she-bei-jiao-yan',
                            redirect: '',
                            component:
                                "() => import('@/pages/she-bei-guan-li/she-bei-jiao-yan/she-bei-jiao-yan/she-bei-jiao-yan.vue')",
                            meta: {
                                title: '设备校验',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                    ],
                },
                {
                    path: '/she-bei-guan-li/she-bei-jian-xiu',
                    name: 'she-bei-guan-li/she-bei-jian-xiu',
                    redirect: '/she-bei-guan-li/she-bei-jian-xiu',
                    meta: {
                        title: '设备检修',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/she-bei-guan-li/she-bei-jian-xiu/she-bei-jian-xiu',
                            name: 'she-bei-guan-li/she-bei-jian-xiu/she-bei-jian-xiu',
                            redirect: '',
                            component:
                                "() => import('@/pages/she-bei-guan-li/she-bei-jian-xiu/she-bei-jian-xiu/she-bei-jian-xiu.vue')",
                            meta: {
                                title: '设备检修',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                    ],
                },
            ],
        },
        {
            path: '/yi-chang-guan-li',
            name: 'yi-chang-guan-li',
            redirect: '/yi-chang-guan-li',
            meta: {
                title: '异常管理',
                icon: 'Folder',
            },
            children: [
                {
                    path: '/yi-chang-guan-li/sheng-chan-guo-cheng-yi-chang-chu-zhi-dan',
                    name: 'yi-chang-guan-li/sheng-chan-guo-cheng-yi-chang-chu-zhi-dan',
                    redirect: '',
                    component:
                        "() => import('@/pages/yi-chang-guan-li/sheng-chan-guo-cheng-yi-chang-chu-zhi-dan/sheng-chan-guo-cheng-yi-chang-chu-zhi-dan.vue')",
                    meta: {
                        title: '生产过程异常处置单',
                        icon: 'Tickets',
                    },
                    children: [],
                },
                {
                    path: '/yi-chang-guan-li/tui-huo-chu-zhi-dan',
                    name: 'yi-chang-guan-li/tui-huo-chu-zhi-dan',
                    redirect: '',
                    component: "() => import('@/pages/yi-chang-guan-li/tui-huo-chu-zhi-dan/tui-huo-chu-zhi-dan.vue')",
                    meta: {
                        title: '退货处置单',
                        icon: 'Tickets',
                    },
                    children: [],
                },
                {
                    path: '/yi-chang-guan-li/cheng-pin-yi-chang-chu-zhi-dan',
                    name: 'yi-chang-guan-li/cheng-pin-yi-chang-chu-zhi-dan',
                    redirect: '',
                    component:
                        "() => import('@/pages/yi-chang-guan-li/cheng-pin-yi-chang-chu-zhi-dan/cheng-pin-yi-chang-chu-zhi-dan.vue')",
                    meta: {
                        title: '成品异常处置单',
                        icon: 'Tickets',
                    },
                    children: [],
                },
                {
                    path: '/yi-chang-guan-li/zai-xian-fen-xi-yi-chang-chu-zhi-dan',
                    name: 'yi-chang-guan-li/zai-xian-fen-xi-yi-chang-chu-zhi-dan',
                    redirect: '',
                    component:
                        "() => import('@/pages/yi-chang-guan-li/zai-xian-fen-xi-yi-chang-chu-zhi-dan/zai-xian-fen-xi-yi-chang-chu-zhi-dan.vue')",
                    meta: {
                        title: '在线分析异常处置单',
                        icon: 'Tickets',
                    },
                    children: [],
                },
                {
                    path: '/yi-chang-guan-li/bu-he-ge-qu-chu-zhi',
                    name: 'yi-chang-guan-li/bu-he-ge-qu-chu-zhi',
                    redirect: '',
                    component: "() => import('@/pages/yi-chang-guan-li/bu-he-ge-qu-chu-zhi/bu-he-ge-qu-chu-zhi.vue')",
                    meta: {
                        title: '不合格区处置',
                        icon: 'Tickets',
                    },
                    children: [],
                },
            ],
        },
        {
            path: '/xi-tong-guan-li',
            name: 'xi-tong-guan-li',
            redirect: '/xi-tong-guan-li',
            meta: {
                title: '系统管理',
                icon: 'Folder',
            },
            children: [
                {
                    path: '/xi-tong-guan-li/xi-tong-quan-xian',
                    name: 'xi-tong-guan-li/xi-tong-quan-xian',
                    redirect: '/xi-tong-guan-li/xi-tong-quan-xian',
                    meta: {
                        title: '系统权限',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/xi-tong-guan-li/xi-tong-quan-xian/zu-zhi-guan-li',
                            name: 'xi-tong-guan-li/xi-tong-quan-xian/zu-zhi-guan-li',
                            redirect: '',
                            component:
                                "() => import('@/pages/xi-tong-guan-li/xi-tong-quan-xian/zu-zhi-guan-li/zu-zhi-guan-li.vue')",
                            meta: {
                                title: '组织管理',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/xi-tong-guan-li/xi-tong-quan-xian/bu-men-guan-li',
                            name: 'xi-tong-guan-li/xi-tong-quan-xian/bu-men-guan-li',
                            redirect: '',
                            component:
                                "() => import('@/pages/xi-tong-guan-li/xi-tong-quan-xian/bu-men-guan-li/bu-men-guan-li.vue')",
                            meta: {
                                title: '部门管理',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/xi-tong-guan-li/xi-tong-quan-xian/jue-se-guan-li',
                            name: 'xi-tong-guan-li/xi-tong-quan-xian/jue-se-guan-li',
                            redirect: '',
                            component:
                                "() => import('@/pages/xi-tong-guan-li/xi-tong-quan-xian/jue-se-guan-li/jue-se-guan-li.vue')",
                            meta: {
                                title: '角色管理',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/xi-tong-guan-li/xi-tong-quan-xian/yong-hu-guan-li',
                            name: 'xi-tong-guan-li/xi-tong-quan-xian/yong-hu-guan-li',
                            redirect: '',
                            component:
                                "() => import('@/pages/xi-tong-guan-li/xi-tong-quan-xian/yong-hu-guan-li/yong-hu-guan-li.vue')",
                            meta: {
                                title: '用户管理',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                    ],
                },
                {
                    path: '/xi-tong-guan-li/ri-zhi-guan-li',
                    name: 'xi-tong-guan-li/ri-zhi-guan-li',
                    redirect: '/xi-tong-guan-li/ri-zhi-guan-li',
                    meta: {
                        title: '日志管理',
                        icon: 'Folder',
                    },
                    children: [
                        {
                            path: '/xi-tong-guan-li/ri-zhi-guan-li/deng-lu-ri-zhi',
                            name: 'xi-tong-guan-li/ri-zhi-guan-li/deng-lu-ri-zhi',
                            redirect: '',
                            component:
                                "() => import('@/pages/xi-tong-guan-li/ri-zhi-guan-li/deng-lu-ri-zhi/deng-lu-ri-zhi.vue')",
                            meta: {
                                title: '登录日志',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                        {
                            path: '/xi-tong-guan-li/ri-zhi-guan-li/cao-zuo-ri-zhi',
                            name: 'xi-tong-guan-li/ri-zhi-guan-li/cao-zuo-ri-zhi',
                            redirect: '',
                            component:
                                "() => import('@/pages/xi-tong-guan-li/ri-zhi-guan-li/cao-zuo-ri-zhi/cao-zuo-ri-zhi.vue')",
                            meta: {
                                title: '操作日志',
                                icon: 'Tickets',
                            },
                            children: [],
                        },
                    ],
                },
            ],
        },
    ],
];

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: '/',
        component: markRaw(appLayout),
        redirect: '/home',
        meta: {
            icon: 'HomeFilled',
            title: 'index',
        },
        children: menuRoutes,
    },

    LOGIN_ROUTE,
    FORBIDDEN_ROUTE,
    SCREEN_ROUTE,
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
export { menuRoutes, routes };

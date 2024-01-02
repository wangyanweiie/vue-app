# permission

## VUE 自定义指令控制按钮权限

> 本文只讨论按钮权限，页面菜单即路由权限需另行配置

### 前提

- 系统需要以更小粒度的控制划分权限时；
- 在系统权限配置的地方，需要渲染可以配置到操作按钮的权限树，权限树层级与页面层级对应；
- 根据整个权限树的权限标识，声明一个常量对象与权限树层级及标识对应，权限标识跟后台接口对应；
- 登录系统时，可从登录接口获取当前角色对应的权限标识列表，存在本地即可；

### 配置

#### 自定义指令

``` typescript
// directive/permission.ts
import { getStorage } from '@/utils/storage.ts';
import type { App } from 'vue';

export default {
    install(app: App) {
        /**
         * @description 注册全局指令
         * @params { string } name 指令名
         * @params { Function | Object } definition 具有7个生命周期
         */
        app.directive('permission', {
            /**
             * @description 指令是具有一组生命周期的钩子，钩子函数的有3-4个参数，如下：
             * @param el 指令绑定到的元素，这可用于直接操作 DOM。
             * @param binding 一个对象包含一些属性，binding.value 是传递给指令的值。
             * @param vnode 代表绑定元素的底层 VNode。
             * @param prevNode 之前的渲染中代表指令所绑定元素的 VNode，仅在 beforeUpdate 和 updated 钩子中可用。
             */
            mounted(el, binding) {
                // getStorage 封装方法：获取 localStorage 中的信息
                const permissions: string[] = getStorage('pcPerms') || [];
                if (!binding.value.some((permission: string) => permissions.includes(permission))) {
                    el.style.display = 'none';
                }
            },

            updated(el, binding) {
                const permissions: string[] = getStorage('pcPerms') || [];
                if (!binding.value.some((permission: string) => permissions.includes(permission))) {
                    el.style.display = 'none';
                } else {
                    el.style.display = '';
                }
            },
        });
    },
};
```

#### 全局注册指令

``` typescript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import permission from './directive/permission';

(async () => {
    // 创建 app 实例
    const app = createApp(App);

    // 全局注册指令
    app.use(permission);

    app.mount('#app');
})();
```

#### 声明权限树常量

``` typescript
// constant/permission.ts
export const PERMISSION = {
    /**
     * 基础数据
     */
    BASIC_DATA: {
        /**主数据*/
        MASTER_DATA: {
            /**列表*/
            USER_LIST: {
                /**查询*/
                QUERY: 'user:select',
                /**新增 编辑*/
                EDIT: 'user:insert',
                /**删除 */
                DELETE: 'user:delete',
                /**导入 */
                IMPORT: 'user:import',
                /**导出 */
                EXPORT: 'user:export',
            },
            // ...
        }
        // ...
    }
    // ...
} 
```

#### 页面应用

``` typescript
import { PERMISSION } from '@/constant/permission';
```

``` html
<el-button v-permission="[PERMISSION.BASIC_DATA.MASTER_DATA.USER_LIST.EDIT]">
    新增
</el-button>
```

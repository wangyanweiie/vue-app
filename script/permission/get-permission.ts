import axios from 'axios';
import { writeFileSync } from 'fs';

/**
 * 权限
 */
interface Permission {
    id: string;
    label: string;
    api: string | null;
    children: Permission[] | null;
}

/**
 * 获取并写入配置
 */
async function getPermissionListAndWrite() {
    // 获取
    const res = await axios.get('http://192.168.3.200:8061/api/v1/user/permission/list?permissionType=1&roleId=1');

    // 权限
    const allPermissions: Permission[] = res.data.data.systemPermissions;

    // 转换
    const transformData = Object.fromEntries(createEntries(allPermissions));

    writeFileSync('./src/json/permission.json', JSON.stringify(transformData));
}

/**
 * 根据权限创建key-value[]
 */
function createEntries(list: Permission[]): Iterable<[PropertyKey, any]> {
    console.log(list, 'list');
    const res: [PropertyKey, any][] = [];

    for (let index = 0; index < list.length; index++) {
        const item = list[index];
        const children = item.children;
        let keyValue: [PropertyKey, any];

        if (children) {
            keyValue = [item.label, Object.fromEntries(createEntries(children))];
        } else {
            keyValue = [item.label, item.id];
        }

        res.push(keyValue);
    }

    return res;
}

getPermissionListAndWrite();

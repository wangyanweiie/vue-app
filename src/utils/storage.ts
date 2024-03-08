import store from 'store2';

import {
    LOCAL_BASE_URL_KEY,
    LOCAL_LANGUAGE_KEY,
    LOCAL_PERMISSION_KEY,
    LOCAL_TOKEN_KEY,
    LOCAL_USER_INFO_KEY,
} from '@/constant/global';

/**
 * 后端地址
 */
export function saveBaseUrl(url: string): void {
    store.local.set(LOCAL_BASE_URL_KEY, url);
}

export function getBaseUrl(): string {
    return store.local.get(LOCAL_BASE_URL_KEY) as string;
}

export function removeBaseUrl() {
    store.local.remove(LOCAL_BASE_URL_KEY);
}
/**
 * 用户 token
 */
export function saveUserToken(token: string): void {
    store.local.set(LOCAL_TOKEN_KEY, token);
}

export function getUserToken(): string {
    return store.local.get(LOCAL_TOKEN_KEY) as string;
}

export function removeUserToken() {
    store.local.remove(LOCAL_TOKEN_KEY);
}
/**
 * 用户信息
 */
export function saveUserInfo(userInfo: any): void {
    store.local.set(LOCAL_USER_INFO_KEY, userInfo);
}

export function getUserInfo(): any {
    return store.local.get(LOCAL_USER_INFO_KEY) as any;
}

export function removeUserInfo() {
    store.local.remove(LOCAL_USER_INFO_KEY);
}

/**
 * 权限信息
 */
export function savePermission(permission: string[]): void {
    store.local.set(LOCAL_PERMISSION_KEY, permission);
}

export function getPermission(): string[] {
    return store.local.get(LOCAL_PERMISSION_KEY) as string[];
}

export function removePermission() {
    store.local.remove(LOCAL_PERMISSION_KEY);
}

/**
 * 语言信息
 */
export function saveLanguage(permission: string): void {
    store.local.set(LOCAL_LANGUAGE_KEY, permission);
}

export function getLanguage(): string {
    return store.local.get(LOCAL_LANGUAGE_KEY) as string;
}

export function removeLanguage() {
    store.local.remove(LOCAL_LANGUAGE_KEY);
}

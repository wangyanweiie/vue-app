<script setup lang="ts">
/**
 * props
 */
const props = withDefaults(
    defineProps<{
        visible: boolean;
        title?: string;
        width?: string;
    }>(),
    {
        visible: false,
        title: '弹窗标题',
        width: '40%',
    },
);

/**
 * emits
 */
const emits = defineEmits<{
    (event: 'update:visible', visible: boolean): void;
    (event: 'close'): void;
}>();

/**
 * 是否展示弹窗
 */
const dialogVisible = computed<boolean>({
    get: () => props.visible,
    set: visible => {
        emits('update:visible', visible);

        if (!visible) {
            emits('close');
        }
    },
});
</script>

<template>
    <el-dialog v-model="dialogVisible" :title="title" :width="width" append-to-body destroy-on-close>
        <span>This is a message</span>

        <template #footer>
            <span>
                <el-button type="primary" @click="dialogVisible = false"> 确认 </el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </span>
        </template>
    </el-dialog>
</template>

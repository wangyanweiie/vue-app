# WebSocket

## 一、简述

WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。  
WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。  

现在，很多网站为了实现推送技术，所用的技术都是 Ajax 轮询。轮询是在特定的的时间间隔（如每1秒），由浏览器对服务器发出 HTTP 请求，然后由服务器返回最新的数据给客户端的浏览器。这种传统的模式带来很明显的缺点，即浏览器需要不断的向服务器发出请求，然而 HTTP 请求可能包含较长的头部，其中真正有效的数据可能只是很小的一部分，显然这样会浪费很多的带宽等资源。

HTML5 定义的 WebSocket 协议，能更好的节省服务器资源和带宽，并且能够更实时地进行通讯。

### 1. 属性

| 属性 | 描述 |
|------|------|
| Socket.readyState | 只读属性 readyState 表示连接状态，可以是以下值：  0 - 表示连接尚未建立；1 - 表示连接已建立，可以进行通信；2 - 表示连接正在进行关闭；3 - 表示连接已经关闭或者连接不能打开。 |
| Socket.bufferedAmount | 只读属性 bufferedAmount 已被 send() 放入正在队列中等待传输，但是还没有发出的 UTF-8 文本字节数 |

### 2. 事件

| 属性 | 描述 |
|------|------|
| onopen | 连接建立时触发 |
| onmessage | 客户端接收服务端数据时触发 |
| onerror | 通信发生错误时触发 |
| onclose | 连接关闭时触发 |

### 3. 方法

| 属性 | 描述 |
|------|------|
| send | 使用连接发送数据 |
| close | 关闭连接 |

## 二、应用

- `useWebSocket.ts`

``` typescript
import { ref, onMounted } from 'vue';

/**
 * 连接状态
 */
enum READY_STATUS {
    '连接尚未建立' = 0,
    '连接已建立，可以进行通信' = 1,
    '连接正在进行关闭' = 2,
    '连接已经关闭或者连接不能打开' = 3,
}

/**
 * @description use websocket
 * @param handleReceive 服务端信息的处理方法
 */
export default function useWebSocket(
    url: string,
    openCallback?: () => void,
    messageCallback?: (data: any) => void,
    closeCallback?: () => void,
) {
    /**
     * 实例
     */
    const ws = ref();

    /**
     * 初始化
     */
    function initWebSocket() {
        if ('WebSocket' in window) {
            // 创建 websocket 实例
            ws.value = new WebSocket(url);

            ws.value.onopen = onopen;
            ws.value.onmessage = onmessage;
            ws.value.onclose = onclose;
            ws.value.onerror = () => onerror;
        } else {
            alert('您的浏览器不支持 webSocket');
        }
    }

    function onopen() {
        // 开启心跳
        heartCheck.start();
        openCallback && openCallback();
    }

    function onmessage(event: any) {
        const res = JSON.parse(event.data);

        // 收到服务端心跳，则重置心跳
        if (res.type === 'heartbeat') {
            heartCheck.reset();
        } else {
            messageCallback && messageCallback(res);
        }
    }

    function onclose() {
        closeCallback && closeCallback();
    }

    function onerror() {
        reconnect();
    }

    /**
     * 重新连接
     */
    let timer: any = null;
    const timeout = 5 * 1000;

    function reconnect() {
        // WebSocket.OPEN <==> READY_STATUS['连接已建立，可以进行通信']
        if (ws.value.readyState === READY_STATUS['连接已建立，可以进行通信']) {
            return;
        }

        // 没连上会一直重连，设置延时避免请求过多
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            initWebSocket();
        }, timeout);
    }

    /**
     * 心跳检测（需要服务端配合）
     */
    let heartTimer: any = null;
    let serverTimer: any = null;
    const heartTimeout = 10 * 1000;
    const serverTimeout = 60 * 1000;

    const heartCheck = {
        // 重置心跳
        reset: function () {
            clearTimeout(heartTimer);
            clearTimeout(serverTimer);
            heartTimer = null;
            serverTimer = null;
        },

        // 开启心跳
        start: function () {
            heartTimer && clearTimeout(heartTimer);
            serverTimer && clearTimeout(serverTimer);

            heartTimer = setTimeout(() => {
                // 连接正常时
                if (ws.value.readyState === READY_STATUS['连接已建立，可以进行通信']) {
                    // 定时向服务端发送心跳，服务端收到后返回一个心跳，可在 onmessage 事件中重置心跳
                    ws.value.send('heartbeat');
                } else {
                    // 否则重新连接
                    reconnect();
                }

                // 超时关闭 websocket
                serverTimer = setTimeout(() => {
                    ws.value.close();
                }, serverTimeout);
            }, heartTimeout);
        },
    };

    /**
     * 页面挂载
     */
    onMounted(() => {
        initWebSocket();
    });

    /**
     * 监听窗口关闭事件
     * 当窗口关闭时，主动去关闭 websocket 连接，防止连接还没断开就关闭窗口，服务端会抛异常
     */
    window.onbeforeunload = () => {
        ws.value.close();
    };

    return {
        ws,
    };
}
```

- `demo.vue`

``` typescript

<script lang="ts" setup>
import { ElNotification } from 'element-plus';
import useWebSocket from '@/utils/use-webSocket';

/**
 * uuid
 */
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

/**
 * websocket
 */
const webSocketUrl = `ws://192.168.3.30:3000/websocket/qualityOrderInspection/${guid()}`;

function handleOpen() {
    console.log('onopen');
}

function handleOpen(data) {
    console.log('onmessage', data);
    ElNotification({
        title: '',
        message: '数据已更新',
        type: 'success',
    });
}

function handleClose(data) {
    ElNotification({
        title: '',
        message: 'websocket 连接已关闭',
        type: 'warning',
    });
}

const { ws } = useWebSocket(webSocketUrl, handleOpen, handleMessage, handleClose);
</script>

```

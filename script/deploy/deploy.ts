import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

const SERVER_CONFIG = {
    200: {
        host: '192.168.3.200',
        username: 'root',
        password: 'wwzh@52e711eec55',
    },
    100: {
        host: '192.168.3.100',
        username: 'root',
        password: 'xl123456..',
    },
};

const LOCAL_PROJECT_PATH = 'dist';
const SERVER_PROJECT_PATH = '/home/static/leyuan/dist';

async function deploy() {
    await ssh.connect(SERVER_CONFIG[200]);

    /**
     * LOCAL_PROJECT_PATH：本地目录（项目根目录下的 dist 文件夹）
     * SERVER_PROJECT_PATH：远程服务器路径（/home/static/leyuan/dist）
     * 配置选项：
     *   - recursive: true：递归上传，包含所有子目录和文件
     *   - concurrency: 5：并发上传 5 个文件，提高上传速度
     */
    await ssh.putDirectory(LOCAL_PROJECT_PATH, SERVER_PROJECT_PATH, {
        recursive: true,
        concurrency: 5,
    });

    console.info('部署成功！');
    ssh.dispose();
}

deploy();

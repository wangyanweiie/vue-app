import axios from 'axios';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

/**
 * 去除生成的 json 数据中的 extensions
 */
function handleApiData(apiData: Record<string, any>) {
    const data = apiData;
    data.tags = data.tags.map((item: any) => {
        if (item.extensions) {
            delete item.extensions;
        }

        return item;
    });

    Object.keys(data.paths).forEach(key => {
        Object.keys(data.paths[key]).forEach(childKey => {
            if (data.paths[key][childKey].extensions) {
                delete data.paths[key][childKey].extensions;
            }
        });
    });

    return data;
}

async function writeAPI() {
    if (existsSync('./src/gen-api') && !existsSync('./src/gen-api/.openapi-generator-ignore')) {
        writeFileSync(
            './src/gen-api/.openapi-generator-ignore',
            `
                common.ts
                configuration.ts
                git_push.sh
                .npmignore
                .gitignore
            `,
        );
    }
    if (!existsSync('./src/gen-api') && !existsSync('./src/gen-api/.openapi-generator-ignore')) {
        mkdirSync('./src/gen-api');
        writeFileSync(
            './src/gen-api/.openapi-generator-ignore',
            `
                common.ts
                configuration.ts
                git_push.sh
                .npmignore
                .gitignore
            `,
        );
    }

    try {
        const response = await axios.get(
            'http://192.168.4.34:8066/v3/api-docs?group=%E7%B3%BB%E7%BB%9F%E6%9C%8D%E5%8A%A1',
        );

        const json = JSON.stringify(response.data).replace(/\«|»|\s+/g, '_');
        const apiObj = JSON.parse(json);

        const apiInfo = handleApiData(apiObj);

        for (const key in apiInfo.paths) {
            const funName = key
                .split('/')
                .filter(item => item && item !== 'api' && item !== 'v1')
                .map((item, index) => {
                    if (index === 0) {
                        return item;
                    } else {
                        return `${item[0].toUpperCase()}${item.slice(1)}`;
                    }
                })
                .join('');

            const method = Object.keys(apiObj.paths[key])[0];
            apiObj.paths[key][method].operationId = `${funName}${method.toUpperCase()}`;
        }

        if (!existsSync('./src/json')) {
            mkdirSync('./src/json');
        }

        writeFileSync('./src/json/api.json', JSON.stringify(apiObj));
    } catch (error) {
        console.log('出错了');
    }
}

writeAPI();

const axios = require('axios');

const token = 'fac37ad0-2322-4daf-a27c-949cb2f932de';
const url = '/cylinder/storage/transfer/history';

axios.defaults.baseURL = 'http://192.168.3.200:8061';
axios.defaults.headers['v-token'] = token;
axios.defaults.headers['Content-Type'] = 'application/json';

(async () => {
    console.time('answer time');

    await axios({
        url: url,
        method: 'get',
        params: {
            page: 1,
            limit: 10,
        },
    });

    // await axios({
    //     url: url,
    //     method: 'post',
    //     data: {},
    // });

    console.timeEnd('answer time');
})();

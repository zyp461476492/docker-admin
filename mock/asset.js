import { delay } from 'roadhog-api-doc';
import { appendFile } from 'fs';

const list = [];

for (let i = 0; i < 50; i++) {
    let obj = {
        id: i + 1,
        assetName: 'docker-test' + i,
        ip: '192.168.1.1' + i,
        port: '220' + i,
        apiVersion: '1.048',
        status: i % 2 === 0 ? '1' : '0'
    };
    list.push(obj);
}

const getFakeList = (req, res) => {
    const { page, limit } = req.query;
    const start = (page - 1) * limit;
    const end = page * limit;
    const resData = {
        currentPage: page,
        total: list.length,
        data: list.slice(start, end)
    }
    res.json(resData);
}

const append = (req, res) => {

};

const remove = (req, res) => {
    let { keys } = req.body;
    keys = keys.split(',');
    const indexList = [];
    for (let {obj, index} in list) {
        if (obj.id in keys) {
            indexList.push(index);
        }
    }

    for (let i in indexList) {
        list.splice(i, 1);
    }

    res.json({res: true});
};

const proxy = {
    'GET /api/asset/list': getFakeList,

    'POST /api/asset/new': append,

    'POST /api/asset/remove': remove
}

export default delay(proxy, 500);
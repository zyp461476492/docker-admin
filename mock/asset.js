import { delay } from 'roadhog-api-doc';
import list from '../mock/data/dockerInfo';

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
    
    for (let key in keys) {
        if (list.indexOf(key) >= 0) {
            list.splice(list.indexOf(key), 1);
        }
    }

    res.json({res: true});
};

const proxy = {
    'GET /api/asset/list': getFakeList,

    'POST /api/asset/new': append,

    'POST /api/asset/remove': remove
}

export default delay(proxy, 500);
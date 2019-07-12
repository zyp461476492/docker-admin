const list = [];

for (let i = 0; i < 15; i++) {
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
    console.log(list);
    res.json(list);
}


export default {
    'GET /api/asset/list': getFakeList
}
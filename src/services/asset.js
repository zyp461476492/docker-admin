import request from '@/utils/request';

export async function queryList({ page = 1, limit = 5 }) {
    return request(`/api/asset/list?page=${page}&limit=${limit}`);
}

export async function removeAsset(keys = {}) {
    return request.post(`/api/asset/del`, { data: { keys: keys } });
}

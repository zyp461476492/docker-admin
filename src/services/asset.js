import request from '@/utils/request';

export async function queryDockerInfo(id) {
  return request(`/api/asset/list?id=${id}`);
}

export async function queryList({ page = 1, limit = 5 }) {
  return request(`/api/asset/list?page=${page}&pageSize=${limit}`);
}

export async function addAsset(asset) {
  return request('/api/asset/add', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(asset),
  });
}

export async function removeAsset(keys = {}) {
  return request('/api/asset/delete', {
    method: 'POST',
    requestType: 'form',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    data: {
      info: keys,
    },
  });
}

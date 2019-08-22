import request from '@/utils/request';

export async function queryDockerInfo({ id }) {
    return request(`/api/asset/info?index=${id}`);
}

export async function queryImageList({id}) {
    return request(`/api/asset/list?index=${id}`);
}

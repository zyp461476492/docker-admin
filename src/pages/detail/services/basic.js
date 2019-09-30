import request from '@/utils/request';

export async function queryDockerInfo({ id }) {
  return request(`/api/asset/info?index=${id}`);
}

export async function queryImageList({ id }) {
  return request(`/api/image/list?index=${id}`);
}

export async function queryImageHistory({ assetId, imageId }) {
  return request(`/api/image/history?assetId=${assetId}&imageId=${imageId}`);
}

export async function queryContainerList({ id }) {
  return request(`/api/container/list?index=${id}`);
}

export async function imageSearch({ assetId, term }) {
  return request(`/api/image/search?assetId=${assetId}&term=${term}`);
}

export async function imageDel({ assetId, imageId }) {
  return request(`/api/image/del?assetId=${assetId}&imageId=${imageId}`);
}

export async function containerCreate(requestBody) {
  return request('/api/container/create', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(requestBody),
  });
}

export async function containerRemove({ assetId, containerId }) {
  return request(`/api/container/remove?assetId=${assetId}&containerId=${containerId}`);
}

export async function containerStart({ assetId, containerId }) {
  return request(`/api/container/start?assetId=${assetId}&containerId=${containerId}`);
}

export async function containerPause({ assetId, containerId }) {
  return request(`/api/container/pause?assetId=${assetId}&containerId=${containerId}`);
}

export async function containerUnpause({ assetId, containerId }) {
  return request(`/api/container/unpause?assetId=${assetId}&containerId=${containerId}`);
}

export async function containerStop({ assetId, containerId }) {
  return request(`/api/container/stop?assetId=${assetId}&containerId=${containerId}`);
}

import request from '@/utils/request';
import { func } from 'prop-types';

export async function queryDockerInfo({ id }) {
  return request(`/api/asset/info?index=${id}`);
}

export async function queryImageList({ id }) {
  return request(`/api/image/list?index=${id}`);
}

export async function queryContainerList({ id }) {
  return request(`/api/container/list?index=${id}`);
}

import * as basicService from '../services/basic';

export default {
  namespace: 'dockerBasic',
  state: {
    dockerInfo: null,
    imageInfo: null,
    containerInfo: null,
    res: null
  },
  reducers: {
    putDockerInfo(
      state,
      {
        payload: { res },
      },
    ) {
      return { ...state, dockerInfo: res };
    },
    putImageInfo(
      state,
      {
        payload: { res },
      },
    ) {
      return { ...state, imageInfo: res };
    },
    putContainerInfo(
      state,
      {
        payload: { res },
      },
    ) {
      return { ...state, containerInfo: res };
    },
    putAsynRes(
      state,
      {
        payload: { res },
      },
    ) {
      return { ...state, res: res };
    },
  },
  effects: {
    *dockerInfo(
      {
        payload: { id },
      },
      { call, put },
    ) {
      const res = yield call(basicService.queryDockerInfo, { id });
      yield put({ type: 'putDockerInfo', payload: { res } });
    },
    *imageList(
      {
        payload: { id },
      },
      { call, put },
    ) {
      const res = yield call(basicService.queryImageList, { id });
      yield put({ type: 'putImageInfo', payload: { res } });
    },
    *containerList(
      {
        payload: { id },
      },
      { call, put },
    ) {
      const res = yield call(basicService.queryContainerList, { id });
      yield put({ type: 'putContainerInfo', payload: { res } });
    },
    *containerStart(
      {
        payload: { assetId, containerId },
        callback
      },
      { call, put },
    ) {
      const res = yield call(basicService.containerStart, { assetId, containerId });
      if (callback && typeof callback === 'function') {
        callback(res.Res);
      }
    },
    *containerPause(
      {
        payload: { assetId, containerId },
        callback
      },
      { call, put },
    ) {
      const res = yield call(basicService.containerPause, { assetId, containerId });
      if (callback && typeof callback === 'function') {
        callback(res.Res);
      }
    },
    *containerStop(
      {
        payload: { assetId, containerId },
        callback
      },
      { call, put },
    ) {
      const res = yield call(basicService.containerStop, { assetId, containerId });
      if (callback && typeof callback === 'function') {
        callback(res.Res);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(location => {
       
      });
    },
  },
};

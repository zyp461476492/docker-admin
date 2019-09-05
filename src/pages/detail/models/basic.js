import * as basicService from '../services/basic';

export default {
  namespace: 'dockerBasic',
  state: {
    dockerInfo: null,
    imageInfo: null,
    containerInfo: null,
    imageSearchInfo: null,
    imageHistory: null,
    res: null,
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
    putImageHistoryInfo(
      state,
      {
        payload: { res },
      },
    ) {
      return { ...state, imageHistory: res };
    },
    putContainerInfo(
      state,
      {
        payload: { res },
      },
    ) {
      return { ...state, containerInfo: res };
    },
    putImageSearchInfo(
      state,
      {
        payload: { res },
      },
    ) {
      return { ...state, imageSearchInfo: res };
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
    *imageHistory(
      {
        payload: { assetId, imageId },
      },
      { call, put },
    ) {
      const res = yield call(basicService.queryImageHistory, { assetId, imageId });
      yield put({ type: 'putImageHistoryInfo', payload: { res } });
    },
    *imageSearch(
      {
        payload: { assetId, term },
      },
      { call, put },
    ) {
      const res = yield call(basicService.imageSearch, { assetId, term });
      yield put({ type: 'putImageSearchInfo', payload: { res } });
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
    *ImageDel(
      {
        payload: { assetId, imageId },
        callback,
      },
      { call, put },
    ) {
      const res = yield call(basicService.imageDel, { assetId, imageId });
      if (callback && typeof callback === 'function') {
        callback(res.Res);
      }
      yield put({ type: 'imageList', payload: { assetId } });
    },
    *containerStart(
      {
        payload: { assetId, containerId },
        callback,
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
        callback,
      },
      { call, put },
    ) {
      const res = yield call(basicService.containerPause, { assetId, containerId });
      if (callback && typeof callback === 'function') {
        callback(res.Res);
      }
    },
    *containerUnpause(
      {
        payload: { assetId, containerId },
        callback,
      },
      { call, put },
    ) {
      const res = yield call(basicService.containerUnpause, { assetId, containerId });
      if (callback && typeof callback === 'function') {
        callback(res.Res);
      }
    },
    *containerStop(
      {
        payload: { assetId, containerId },
        callback,
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
      return history.listen(location => {});
    },
  },
};

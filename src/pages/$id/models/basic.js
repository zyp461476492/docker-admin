import * as basicService from '../services/basic';

export default {
  namespace: 'dockerBasic',
  state: {
    dockerInfo: null,
    imageInfo: null,
    containerInfo: null
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
      const res = yield call(basicService.queryImageList, { id });
      yield put({ type: 'putContainerInfo', payload: { res } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(location => {
       
      });
    },
  },
};

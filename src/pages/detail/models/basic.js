import * as basicService from '../services/basic';

export default {
  namespace: 'dockerBasic',
  state: {
    dockerInfo: null,
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
      return { ...state, imageList: res };
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
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(location => {
        if (location.pathname.startsWith('/detail')) {
          let id = location.pathname.split('/')[2];
          dispatch({ type: 'dockerInfo', payload: { id } });
        }
      });
    },
  },
};

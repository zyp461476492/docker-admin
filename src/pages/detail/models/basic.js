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
      return { dockerInfo: res };
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

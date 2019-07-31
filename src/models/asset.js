import * as assetService from '../services/asset';

const defaultPageSize = 5;

export default {
  namespace: 'asset',
  state: {
    visible: false,
    list: [],
    pagination: { defaultPageSize: defaultPageSize },
  },
  reducers: {
    save(
      state,
      {
        payload: { res, page },
      },
    ) {
      const pagination = state.pagination;
      pagination.total = res.Obj.total;
      pagination.current = page;
      return { list: res.Obj.list, pagination: pagination, visible: false };
    },
    del(
      state,
      {
        payload: { keys },
      },
    ) {},
    showDialog(state) {
      return { ...state, visible: true };
    },
    closeDialog(state) {
      return { ...state, visible: false };
    },
  },
  effects: {
    *fetch(
      {
        payload: { page, limit },
      },
      { call, put },
    ) {
      const res = yield call(assetService.queryList, { page, limit });
      yield put({ type: 'save', payload: { res, page } });
    },
    *add(
      {
        payload: { asset },
      },
      { call, put },
    ) {
      const res = yield call(assetService.addAsset, { asset });
      if (res.Res) {
      } else {
      }
    },
    *remove(
      {
        payload: { keys },
      },
      { call, put },
    ) {
      yield call(assetService.removeAsset, { keys });
      yield put({ type: 'fetch', payload: {} });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'fetch', payload: {} });
        }
      });
    },
  },
};

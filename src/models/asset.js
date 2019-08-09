import * as assetService from '../services/asset';

const defaultPageSize = 5;

export default {
  namespace: 'asset',
  state: {
    visible: false,
    messageInfo: undefined,
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
    showTip(
      state,
      {
        payload: { messageInfo },
      },
    ) {
      return { ...state, messageInfo: messageInfo };
    },
    showDialog(state) {
      return { ...state, visible: true };
    },
    closeDialog(state) {
      return { ...state, visible: false };
    },
    putDockerInfo(
      state,
      {
        payload: { res },
      },
    ) {
      return {dockerInfo: res.Obj};
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
    *dockerInfo(
      {
        payload: { id },
      },
      { call, put },
    ) {
      const res = yield call(assetService.queryDockerInfo, { id });
      yield put({ type: 'putDockerInfo', payload: { res } });
    },
    *add(
      {
        payload: { asset },
      },
      { call, put },
    ) {
      const res = yield call(assetService.addAsset, asset);
      const messageInfo = {};
      if (res.Res) {
        messageInfo.type = 'success';
        messageInfo.info = '保存成功';
      } else {
        messageInfo.type = 'error';
        messageInfo.info = `保存失败，原因：${res.Info}`;
      }
      yield put({ type: 'fetch', payload: {} });
      yield put({ type: 'showTip', payload: { messageInfo } });
    },
    *remove(
      {
        payload: { keys },
      },
      { call, put },
    ) {
      const res = yield call(assetService.removeAsset, keys);
      const messageInfo = {};
      if (res.Res) {
        messageInfo.type = 'success';
        messageInfo.info = '删除成功';
      } else {
        messageInfo.type = 'error';
        messageInfo.info = `保存失败，原因：${res.Info}`;
      }
      yield put({ type: 'fetch', payload: {} });
      yield put({ type: 'showTip', payload: { messageInfo } });
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

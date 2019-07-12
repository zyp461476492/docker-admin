import * as assetService from '../services/asset';

export default {
    namespace: 'asset',
    state: {
        list: [],
    },
    reducers: {
        save(state, { payload: { res: list } }) {
            return { ...state, list };
        },
    },
    effects: {
        *fetch({payload}, { call, put }) {
            const res = yield call(assetService.queryList);
            console.log(res);
            yield put({ type: 'save', payload: { res } });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
              if (pathname === '/') {
                dispatch({ type: 'fetch'});
              }
            });
          },
    },
};
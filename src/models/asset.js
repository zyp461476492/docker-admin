import * as assetService from '../services/asset';

const defaultPageSize = 5;

export default {
    namespace: 'asset',
    state: {
        list: [],
        pagination: { defaultPageSize: defaultPageSize }
    },
    reducers: {
        save(state, { payload: { res} }) {
            const pagination = state.pagination;
            pagination.total = res.total;
            return {list: res.data, pagination: pagination};
        },
    },
    effects: {
        *fetch({ payload: { page, limit } }, { call, put }) {
            const res = yield call(assetService.queryList, { page, limit });
            yield put({ type: 'save', payload: { res } });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/') {
                    dispatch({ type: 'fetch', payload: query });
                }
            });
        },
    },
};
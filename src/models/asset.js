import * as assetService from '../services/asset';

const defaultPageSize = 5;

export default {
    namespace: 'asset',
    state: {
        list: [],
        pagination: { defaultPageSize: defaultPageSize }
    },
    reducers: {
        save(state, { payload: { res } }) {
            const pagination = state.pagination;
            pagination.total = res.total;
            return { list: res.data, pagination: pagination };
        },
        del(state, { payload: { keys } }) {

        }
    },
    effects: {
        *fetch({ payload: { page, limit } }, { call, put }) {
            const res = yield call(assetService.queryList, { page, limit });
            yield put({ type: 'save', payload: { res } });
        },
        *remove({ payload: { keys } }, { call, put }) {
            yield call(assetService.removeAsset, { keys });
            yield put({ type: 'fetch', payload: {} });
        }
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
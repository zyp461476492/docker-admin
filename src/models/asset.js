import * as assetService from '../services/asset';

const defaultPageSize = 5;

export default {
    namespace: 'asset',
    state: {
        list: [],
        pagination: { defaultPageSize: defaultPageSize }
    },
    reducers: {
        save(state, { payload: { res, page, limit } }) {
            const pagination = state.pagination;
            pagination.total = res.total;
            pagination.current = page;
            return { list: res.data, pagination: pagination };
        },
        del(state, { payload: { keys } }) {

        }
    },
    effects: {
        *fetch({ payload: { page, limit } }, { call, put }) {
            const res = yield call(assetService.queryList, { page, limit });
            yield put({ type: 'save', payload: { res, page, limit } });
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
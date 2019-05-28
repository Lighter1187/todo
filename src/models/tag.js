import { request, addTag, delTag } from '../util/request';


export default {
    namespace: 'myTag',
    state: {
        dataList: []
    },
    effects: {
        *queryInitTags(_, { call, put }) {
            const endPointURI = '/dev/tag';
            const tag = yield call(request, endPointURI);
            yield put({ type: 'save', payload: tag });
        },
        *addTags({ payload }, { call, put }) {
            const tag = yield call(addTag, payload);
            yield put({ type: 'save', payload: tag });
        },
        *delTags({ payload }, { call, put }) {
            const tag = yield call(delTag, payload);
            yield put({ type: 'save', payload: tag });
        },
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                dataList: action.payload,
            }
        },
    }

}
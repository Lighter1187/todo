import { serachTask } from '../util/request';

export default {
    namespace: 'search',
    state: {
        dataList: [],
    },
    effects: {
        *queryTasks({ payload }, { call, put }) {
            const response = yield call(serachTask, payload);
            yield put({ type: 'save', payload: response });
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
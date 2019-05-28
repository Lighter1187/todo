import { request, queryTask, addTask, delTask, updateTask } from '../util/request';

export default {
    namespace: 'task',
    state: {
        dataList: [],
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryTask, payload);
            yield put({ type: 'save', payload: response });
        },
        *queryInitTasks(_, { call, put }) {
            const endPointURI = '/dev/task';
            const response = yield call(request, endPointURI);
            yield put({ type: 'save', payload: response });
        },
        *addTasks({ payload }, { call, put }) {
            const response = yield call(addTask, payload);
            yield put({ type: 'save', payload: response });
        },
        *updateTasks({ payload }, { call, put }) {
            const response = yield call(updateTask, payload);
            yield put({ type: 'save', payload: response });
        },
        *delTasks({ payload }, { call, put }) {
            const response = yield call(delTask, payload);
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
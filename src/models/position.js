import { request, addPosition, delPosition } from '../util/request';

export default {
    namespace: 'position',
    state: {
        dataList: [],
    },
    effects: {
        *queryInitPositions(_, { call, put }) {
            const endPointURI = '/dev/position';
            const position = yield call(request, endPointURI);
            yield put({ type: 'save', payload: position });
        },
        *savePositions({ payload }, { call, put }) {
            const position = yield call(addPosition, payload);
            yield put({ type: 'save', payload: position });
        },
        *delPositions({ payload }, { call, put }) {
            const position = yield call(delPosition, payload);
            yield put({ type: 'save', payload: position });
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
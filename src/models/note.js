import { request, addNote, delNote } from '../util/request';

export default {
    namespace: 'note',
    state: {
        dataList: [],
    },
    effects: {
        *queryInitNotes(_, { call, put }) {
            const endPointURI = '/dev/note';
            const note = yield call(request, endPointURI);
            yield put({ type: 'save', payload: note });
        },
        *addNotes({ payload }, { call, put }) {
            const note = yield call(addNote, payload);
            yield put({ type: 'save', payload: note });
        },
        *delNotes({ payload }, { call, put }) {
            const note = yield call(delNote, payload);
            yield put({ type: 'save', payload: note });
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
import { request, addProject, delProject } from '../util/request';

export default {
    namespace: "project",
    state: {
        dataList: [],
    },
    effects: {
        *queryInitProjects(_, { call, put }) {
            const endPointURI = '/dev/project';
            const project = yield call(request, endPointURI);
            yield put({ type: 'save', payload: project });
        },
        *addProjects({ payload }, { call, put }) {
            const project = yield call(addProject, payload);
            yield put({ type: 'save', payload: project });
        },
        *delProjects({ payload }, { call, put }) {
            const project = yield call(delProject, payload);
            yield put({ type: 'save', payload: project });
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
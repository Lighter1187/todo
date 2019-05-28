import moment from 'moment';
let note_dataList = [
    {
        noteId: '10001',
        noteName: 'note01',
        noteDate: '2018-12-08 09:33:05',
    }, {
        noteId: '10002',
        noteName: 'note02',
        noteDate: '2018-12-08 09:34:05',
    }, {
        noteId: '10003',
        noteName: 'note03',
        noteDate: '2018-12-08 09:35:05',
    },
];

let project_dataList = [
    {
        projectId: '20001',
        projectName: 'project01',
        projectText: 'Just Test',
        project_total_task: 3,
        project_finish_task: 0,
    }, {
        projectId: '20002',
        projectName: 'project02',
        projectText: 'Just Test',
        project_total_task: 1,
        project_finish_task: 0,
    }, {
        projectId: '20003',
        projectName: 'project03',
        projectText: 'Just Test',
        project_total_task: 0,
        project_finish_task: 0,
    },
];

let position_dataList = [
    {
        positionId: '30001',
        positionName: 'position01',
        position_total_task: 3,
    }, {
        positionId: '30002',
        positionName: 'position02',
        position_total_task: 1,
    },
];

let tag_dataList = [
    {
        tagId: '40001',
        tagName: 'tag01',
        tag_total_task: 3,
    }, {
        tagId: '40002',
        tagName: 'tag02',
        tag_total_task: 1,
    }, {
        tagId: '40003',
        tagName: 'tag03',
        tag_total_task: 0,
    },
];

let task_dataList = [
    {
        taskId: '10001',
        taskName: 'task01',
        level: 1,
        finished: false,
        dateStart: '2018-12-8 09:28',
        dateEnd: '2018-12-8 10:28',
        projectId: '20001',
        positionId: '30001',
        tagId: '40001',
    }
    , {
        taskId: '10002',
        taskName: 'task02',
        level: 2,
        finished: false,
        dateStart: '2018-12-9 09:28',
        dateEnd: '2018-12-9 10:28',
        projectId: '20002',
        positionId: '30002',
        tagId: '40002',
    }, {
        taskId: '10003',
        taskName: 'task03',
        level: 3,
        finished: false,
        dateStart: '2018-12-8 09:28',
        dateEnd: '2018-12-8 10:28',
        projectId: '20001',
        positionId: '30001',
        tagId: '40001',
    }, {
        taskId: '10004',
        taskName: 'task04',
        level: 4,
        finished: false,
        dateStart: '2018-12-8 09:28',
        dateEnd: '2018-12-8 10:28',
        projectId: '20001',
        positionId: '30001',
        tagId: '40001',
    },
]
let level1_task = [{
    taskId: '10001',
    taskName: 'task01',
    level: 1,
    finished: false,
    dateStart: '2018-12-8 09:28',
    dateEnd: '2018-12-8 10:28',
    projectId: '20001',
    positionId: '30001',
    tagId: '40001',
}];
let level2_task = [{
    taskId: '10002',
    taskName: 'task02',
    level: 2,
    finished: false,
    dateStart: '2018-12-9 09:28',
    dateEnd: '2018-12-9 10:28',
    projectId: '20002',
    positionId: '30002',
    tagId: '40002',
}];
let level3_task = [{
    taskId: '10003',
    taskName: 'task03',
    level: 3,
    finished: false,
    dateStart: '2018-12-8 09:28',
    dateEnd: '2018-12-8 10:28',
    projectId: '20001',
    positionId: '30001',
    tagId: '40001',
}];
let level4_task = [{
    taskId: '10004',
    taskName: 'task04',
    level: 4,
    finished: false,
    dateStart: '2018-12-8 09:28',
    dateEnd: '2018-12-8 10:28',
    projectId: '20001',
    positionId: '30001',
    tagId: '40001',
}];
let task_Select = {
    taskId: null,
    taskName: null,
    level: 1,
    finished: false,
    dateStart: moment(),
    dateEnd: moment().add(1, 'h'),
    projectId: null,
    positionId: null,
    tagId: null,
};
let user = [
    {
        userid: '101111',
        avatar: 'user',
        task: task_dataList,
        note: note_dataList,
        project: project_dataList,
        position: position_dataList,
        tag: tag_dataList,
    }
];

function delTask(id) {
    try {
        let dTask = task_dataList.filter(t => t.projectId === id);
        dTask.filter(d => {
            position_dataList.forEach(p => {
                if (d.positionId === p.positionId) {
                    p.position_total_task--;
                }
            });
            tag_dataList.forEach(p => {
                if (d.tagId === p.tagId) {
                    p.tag_total_task--;
                }
            });
        });
        task_dataList = task_dataList.filter(t => t.projectId !== id);
    } catch (e) {
        console.log(e);
    }

}

function taskToLevel(tasks) {
    level1_task = tasks.filter(t => 1 === t.level);
    level2_task = tasks.filter(t => 2 === t.level);
    level3_task = tasks.filter(t => 3 === t.level);
    level4_task = tasks.filter(t => 4 === t.level);
}

function postNote(req, res, u, b) {

    const body = (b && b.body) || req.body;
    const { noteId, method, noteName, noteDate } = body;

    if (method === 'del') {
        note_dataList = note_dataList.filter(t => t.noteId != noteId);
        return res.json(note_dataList);
    }

    if (method === 'add') {
        let noteId = (10000 + Math.floor(Math.random() * 10000)).toString();

        const result = {
            noteId: noteId,
            noteName: noteName,
            noteDate: noteDate,
        };
        note_dataList = note_dataList.concat(result);
        return res.json(note_dataList);
    }

};

function postProject(req, res, u, b) {

    const body = (b && b.body) || req.body;
    const { method, projectId, projectName, projectText } = body;

    if (method === 'del') {
        project_dataList = project_dataList.filter(t => t.projectId != projectId);
        delTask(projectId);
        return res.json(project_dataList);
    }

    if (method === 'add') {
        let projectId = (20000 + Math.floor(Math.random() * 10000)).toString();

        const result = {
            projectId: projectId,
            projectName: projectName,
            projectText: projectText,
            project_total_task: 0,
            project_finish_task: 0,
        };
        project_dataList = project_dataList.concat(result);
        return res.json(project_dataList);
    }
};

function postPosition(req, res, u, b) {

    const body = (b && b.body) || req.body;
    const { positionId, positionName, method } = body;

    if (method === 'del') {
        position_dataList = position_dataList.filter(t => t.positionId != positionId);
        return res.json(position_dataList);
    }

    if (method === 'add') {
        let positionId = (30000 + Math.floor(Math.random() * 10000)).toString();
        const result = {
            positionId: positionId,
            positionName: positionName,
            position_total_task: 0,
        };
        position_dataList = position_dataList.concat(result);
        return res.json(position_dataList);
    }

};

function postTag(req, res, u, b) {

    const body = (b && b.body) || req.body;
    const { tagId, tagName, method } = body;

    if (method === 'del') {
        tag_dataList = tag_dataList.filter(t => t.tagId != tagId);
        return res.json(tag_dataList);
    }

    if (method === 'add') {
        let tagId = (30000 + Math.floor(Math.random() * 10000)).toString();

        const result = {
            tagId: tagId,
            tagName: tagName,
            tag_total_task: 0,
        };
        tag_dataList = tag_dataList.concat(result);
        return res.json(tag_dataList);
    }

};

function postTask(req, res, u, b) {

    const body = (b && b.body) || req.body;
    const { taskId, newTask, projectId, method, today, buttonType, finished, projectIdSelect } = body;
    let task_date = [];

    if (method === 'add') {
        let taskId = (10000 + Math.floor(Math.random() * 10000)).toString();

        project_dataList.forEach(p => {
            if (p.projectId === newTask.projectId) {
                p.project_total_task++;
            }
        });
        position_dataList.forEach(p => {
            if (p.positionId === newTask.positionId) {
                p.position_total_task++;
            }
        });
        tag_dataList.forEach(p => {
            if (p.tagId === newTask.tagId) {
                p.tag_total_task++;
            }
        });
        const result = {
            taskId: taskId,
            finished: false,
            ...newTask,
        };
        task_dataList = task_dataList.concat(result);
        taskToLevel(task_dataList);

        return res.json({
            level1: level1_task,
            level2: level2_task,
            level3: level3_task,
            level4: level4_task,
            taskChoice: result,
            task: task_date,
        });
    }

    if (method === 'del') {
        let task = task_dataList.filter(t => t.taskId === taskId);
        task = task.shift();

        project_dataList.forEach(p => {
            if (p.projectId === task.projectId) {
                p.project_total_task--;
                if (task.finished) {
                    p.project_finish_task--;
                }
            }
        });
        position_dataList.forEach(p => {
            if (p.positionId === task.positionId) {
                p.position_total_task--;
            }
        });
        tag_dataList.forEach(p => {
            if (p.tagId === task.tagId) {
                p.tag_total_task--;
            }
        });

        task_dataList = task_dataList.filter(t => t.taskId !== taskId);
        taskToLevel(task_dataList);

        return res.json({
            level1: level1_task,
            level2: level2_task,
            level3: level3_task,
            level4: level4_task,
            taskChoice: task_Select,
            task: task_date,
        });
    }

    if (method === 'query') {
        let result = task_Select;

        switch (buttonType) {
            case 'day':
                task_date = task_dataList.filter(t =>
                    moment(new Date(t.dateStart)).isSameOrBefore(today)
                );
                break;
            case 'week':
                task_date = task_dataList.filter(t =>
                    moment(new Date(t.dateStart)).week() === moment(today).week()
                );
                break;
            case 'month':
                task_date = task_dataList.filter(t =>
                    moment(new Date(t.dateStart)).month() === moment(today).month()
                );
                break;
            default: break;
        }
        taskToLevel(task_date);

        if (taskId) {
            result = task_dataList.filter(t => t.taskId === taskId).shift();
        }

        if (projectId) {
            let task_Result = task_dataList.filter(t => t.projectId === projectId);
            return res.json({
                task: task_Result,
            })
        }

        return res.json({
            level1: level1_task,
            level2: level2_task,
            level3: level3_task,
            level4: level4_task,
            taskChoice: result,
            task: task_date,
        });
    }

    if (method === 'update') {
        const taskFinish = finished ? -1 : 1;
        task_dataList.map(t => {
            if (t.taskId === taskId) {
                t.finished = !t.finished;
            }
        })
        project_dataList.forEach(p => {
            if (p.projectId === projectId) {
                p.project_finish_task += taskFinish;
            }
        });
        switch (buttonType) {
            case 'day':
                task_date = task_dataList.filter(t =>
                    moment(new Date(t.dateStart)).isSameOrBefore(today)
                );
                break;
            case 'week':
                task_date = task_dataList.filter(t =>
                    moment(new Date(t.dateStart)).week() === moment(today).week()
                );
                break;
            case 'month':
                task_date = task_dataList.filter(t =>
                    moment(new Date(t.dateStart)).month() === moment(today).month()
                );
                break;
            default: break;
        }
        taskToLevel(task_date);

        const result = task_dataList.filter(t => t.taskId === taskId).shift();
        if (projectIdSelect) {
            const task_Result = task_dataList.filter(t => t.projectId === projectIdSelect);
            return res.json({
                task: task_Result,
            })
        }
        return res.json({
            level1: level1_task,
            level2: level2_task,
            level3: level3_task,
            level4: level4_task,
            taskChoice: result,
            task: task_date,
        });
    }
};

function postSearch(req, res, u, b) {
    const body = (b && b.body) || req.body;
    const { taskName, method } = body;

    if (method === 'query') {
        let result = task_dataList.filter(t =>
            t.taskName.indexOf(taskName) !== -1 &&
            taskName !== '' &&
            taskName !== null
        );
        return res.json(result);
    }

};

export default {
    'GET /dev/note': (req, res) => {
        return res.json(note_dataList);
    },
    'GET /dev/project': (req, res) => {
        return res.json(project_dataList);
    },
    'GET /dev/position': (req, res) => {
        return res.json(position_dataList);
    },
    'GET /dev/tag': (req, res) => {
        return res.json(tag_dataList);
    },
    'GET /dev/task': (req, res) => {
        return res.json({
            task: task_dataList,
        });
    },
    'POST /dev/testTag': postTag,
    'POST /dev/testNote': postNote,
    'POST /dev/testProject': postProject,
    'POST /dev/testPosition': postPosition,
    'POST /dev/testTask': postTask,
    'POST /dev/testSearch': postSearch
};

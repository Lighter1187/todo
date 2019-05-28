import React, { Suspense } from 'react';
import {
    Button,
    Icon,
    Menu,
    Card,
    Dropdown,
    Drawer,
    Avatar,
    message,
    Form
} from 'antd';
import moment from 'moment';
import { connect } from 'dva';

const CardTitle = React.lazy(() => import('./CardTitle'));
const CardList = React.lazy(() => import('./CardList'));
const TimelineList = React.lazy(() => import('./TimelineList'));
const TaskForm = React.lazy(() => import('./TaskForm'));

const Fragment = React.Fragment;
const buttonBorderStyle = { border: '0' };

// 空格组件~
const Space = () => {
    return (
        <span style={{ margin: '0 10px' }}></span>
    );
};

@connect(({ task, position, myTag, project, loading }) => ({
    taskAll: task.dataList,
    position: position.dataList,
    tag: myTag.dataList,
    project: project.dataList,
    loading,
}))
@Form.create()
class Task extends React.PureComponent {
    state = {
        visible: false,
        cardWidth: {
            width: '100%',
            height: '100vh',
        },
        radioChecked: 0,
        buttonType: 'day',
        taskChoice: null,
        showType: '四象限',
        showDate: moment().format('YYYY-MM-DD'),
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'task/fetch',
            payload: {
                buttonType: this.state.buttonType,
                today: moment().endOf('day'),
            }
        });
        dispatch({
            type: 'position/queryInitPositions',
            payload: {}
        });
        dispatch({
            type: 'myTag/queryInitTags',
            payload: {}
        });
        dispatch({
            type: 'project/queryInitProjects',
            payload: {}
        });
    };

    // 显示抽屉,同试改变Card的宽度
    showDrawer = (value) => {
        const { dispatch, form } = this.props;
        const taskChoice = value;
        if (taskChoice !== null) {
            this.setState({
                taskChoice: taskChoice,
            });
        } else {
            this.setState({
                taskChoice: null,
            });
        }
        this.setState({
            visible: true,
            cardWidth: {
                width: '70%'
            },
            radioChecked: 0,
        });
        dispatch({
            type: 'task/fetch',
            payload: {
                taskId: taskChoice,
                today: moment().endOf('day'),
                buttonType: this.state.buttonType,
            }
        })
        form.resetFields();
    };
    // 关闭抽屉,同试改变Card的宽度
    onClose = () => {
        this.setState({
            visible: false,
            cardWidth: {
                width: '100%'
            },
            taskChoice: null,
            radioChecked: 0,
        });
    };
    // 根据Radio的选择,显示文本
    onChangeRadio = (e) => {
        const value = e.target.value
        this.setState({
            radioChecked: value,
        });
        return value;
    }
    onChangeInput = (e) => {
        this.setState({
            text: e.target.value,
        });
    }
    // 保存任务
    handleSave = () => {
        const { form, dispatch } = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type: 'task/addTasks',
                    payload: {
                        today: moment().endOf('day'),
                        buttonType: this.state.buttonType,
                        newTask: values
                    },
                });
                message.success('添加成功');
            } else {
                message.warn('任务名未填写', 0.8);
            }
        });
        this.setState({
            taskChoice: null,
            radioChecked: 0,
        });
    }
    // 删除任务
    handleRemove = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'task/delTasks',
            payload: {
                taskId: this.state.taskChoice,
                payload: {
                    today: moment().endOf('day'),
                    buttonType: this.state.buttonType,
                },
            }
        });
        this.onClose();
    }
    // 改变日期
    handleChangeButton = (e) => {
        const { dispatch } = this.props;
        const buttonType = e.target.value;
        const today = moment().endOf('day');
        let showDate = moment().format('YYYY-MM-DD');

        if (buttonType === 'day') {
            showDate = moment().format('YYYY-MM-DD');
        }
        if (buttonType === 'week') {
            showDate = today.day(1).format('YYYY-MM-DD') + '~' + today.day(7).format('DD');
        }
        if (buttonType === 'month') {
            showDate = today.format('YYYY-MM');
        }
        dispatch({
            type: 'task/fetch',
            payload: {
                today: moment().endOf('day'),
                buttonType: buttonType,
            }
        });
        this.setState({
            buttonType: buttonType,
            showDate: showDate,
            visible: false,
            cardWidth: {
                width: '100%'
            },
        });

    }

    handleShow = (e) => {
        this.setState({
            showType: e.key,
        })
    }
    // 完成任务
    handleFinished = (item) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'task/updateTasks',
            payload: {
                today: moment().endOf('day'),
                buttonType: this.state.buttonType,
                ...item
            },
        });
    }

    render() {
        const { cardWidth, visible, buttonType, showType, radioChecked, showDate, } = this.state;
        const { taskAll, position, tag, project, form } = this.props;
        const { level1, level2, level3, level4, task, taskChoice } = taskAll;
        const task_level = [level1, level2, level3, level4];
        const otherField = { project, tag, position, radioChecked};
        // 头部标题
        const cardTitle = (
            <Suspense fallback={null}>
                <CardTitle
                    showDate={showDate}
                    buttonType={buttonType}
                    handleChangeButton={this.handleChangeButton}
                />
            </Suspense>
        );
        // 陈列方式菜单
        const Menu_how = (
            <Menu>
                <Menu.Item key='四象限' onClick={this.handleShow}>四象限{showType === '四象限' ? <Icon type='check' /> : null}</Menu.Item>
                <Menu.Item key='时间轴' onClick={this.handleShow}>时间轴{showType === '时间轴' ? <Icon type='check' /> : null}</Menu.Item>
            </Menu>
        );
        // 陈列类型菜单
        const Menu_show = (
            <Menu>
                <Menu.Item key='全部'>全部<Icon type='check' /></Menu.Item>
                <Menu.Item key='已完成'>已完成<Icon type='null' /></Menu.Item>
                <Menu.Item key='未完成'>未完成<Icon type='null' /></Menu.Item>
            </Menu>
        );
        // 右侧按钮组件
        const cardExtra = (
            <Fragment>
                <Dropdown overlay={Menu_how} trigger={['click']} style={{ padding: '0' }}>
                    <Button>{showType}<Icon type='caret-down' /></Button>
                </Dropdown>
                <Space></Space>
                <Dropdown overlay={Menu_show} trigger={['click']}>
                    <Button>全部<Icon type='caret-down' /></Button>
                </Dropdown>
                <Space></Space>
                <Button style={buttonBorderStyle}
                    type='primary' ghost size='large'
                    onClick={() => this.showDrawer()}><Icon type='plus' /></Button>
            </Fragment>
        );
        //抽屉按钮
        const DrawerButton = ({ button1_Click, button1_text, button2_Click, button2_text }) => (
            <Fragment>
                <Avatar icon='user'></Avatar>
                <Button.Group>
                    <Button style={buttonBorderStyle}><Icon type='file' /></Button>
                    <Button style={buttonBorderStyle}><Icon type='bars' /></Button>
                    <Button style={buttonBorderStyle}><Icon type='retweet' /></Button>
                </Button.Group>
                <Space /><Space />
                <Button style={buttonBorderStyle} onClick={button1_Click}>{button1_text}</Button>
                <Button style={buttonBorderStyle} ghost type='primary' onClick={button2_Click}>{button2_text}</Button>
            </Fragment>
        );
        // 抽屉标题按钮
        const drawerTitle = taskChoice && (taskChoice.taskId === null) ?
            (
                <DrawerButton
                    button1_Click={this.onClose}
                    button1_text={'取消'}
                    button2_Click={this.handleSave}
                    button2_text={'保存'}
                ></DrawerButton>
            ) : (
                <DrawerButton
                    button1_Click={this.handleRemove}
                    button1_text={'删除'}
                    button2_Click={this.onClose}
                    button2_text={'关闭'}
                ></DrawerButton>
            );
        return (
            <div>
                <Card
                    headStyle={{ height: '65px' }}
                    title={cardTitle}
                    extra={cardExtra}
                    style={cardWidth}
                >
                    <Suspense fallback={null}>
                        {showType === '四象限' ?
                            <CardList
                                dataSource={task_level}
                                showDrawer={this.showDrawer}
                                finished={this.handleFinished} />
                            :
                            <TimelineList
                                dataSource={task}
                                showDrawer={this.showDrawer}
                                finished={this.handleFinished} />
                        }
                    </Suspense>
                </Card>
                <Drawer
                    title={drawerTitle}
                    placement='right'
                    mask={false}
                    width={400}
                    closable={false}
                    visible={visible}
                >
                    <Suspense fallback={null}>
                        <TaskForm
                            {...otherField}
                            onChange={this.onChangeRadio}
                            form={form}
                            taskC={taskChoice}
                            handleSubmit={this.handleSave}
                        ></TaskForm>
                    </Suspense>
                </Drawer>
            </div>
        );
    }
}
export default Task;
import React, { Suspense } from 'react';
import {
    Button,
    Menu,
    Card,
    Modal,
    Input,
    Row,
    Col,
    List,
    message,
    Drawer
} from 'antd';
import { connect } from 'dva';
const Fragment = React.Fragment;
const TimelineList = React.lazy(() => import('../task/TimelineList'));
const { TextArea } = Input;

/**
 * 便签的list卡片组件
 * keyId: 用于删除
 * projectName: 项目名
 * total: 总任务数
 * finish: 完成任务数
 */
@connect(({ project, loading }) => ({
    project,
    loading: loading.models.project,
}))
class PositionCard extends React.PureComponent {
    state = {
        visible: true,
        modalVisible: false,
        background: '#fff',
    };
    // 鼠标移入 按钮可见 改变背景色
    handleMouseEnter = () => {
        this.setState({
            visible: false,
            background: '#FFFEED',
        });
    };
    // 鼠标移出 按钮隐藏 改变背景色
    handleMouseLeave = () => {
        this.setState({
            visible: true,
            background: '#fff',
        })
    };
    // 弹出删除确认框
    handleClick = () => {
        this.setState({
            modalVisible: true,
        });
    }
    // 关闭删除确认框
    handleCancel = () => {
        this.setState({
            modalVisible: false,
        });
    };
    // 删除
    handleDelete = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'project/delProjects',
            payload: {
                projectId: this.props.keyId,
            }
        });
        message.info('删除成功');
        this.handleCancel();
    };

    render() {
        const { keyId, projectName, total, finish, onClick } = this.props;

        return (
            <List.Item key={keyId}>
                <Card
                    onClick={onClick}
                    style={{ background: this.state.background, width: '170px' }}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    actions={[
                        <Fragment>{total}<br />总任务</Fragment>,
                        <Fragment>{finish}<br />已完成</Fragment>,
                        <Fragment>{total === 0 ? 0 :
                            Math.floor(finish * 100 / total)
                        }%<br />进度
                        </Fragment>
                    ]}
                >
                    <div>
                        {projectName}
                        <Button icon='delete' hidden={this.state.visible}
                            style={{ height: '20px', margin: '0', marginLeft: '8px', border: '0' }}
                            onClick={this.handleClick}
                        ></Button>
                    </div>
                </Card>
                <Modal
                    title='删除项目'
                    closable
                    okText='删除'
                    cancelText='取消'
                    visible={this.state.modalVisible}
                    onOk={this.handleDelete}
                    onCancel={this.handleCancel}
                    width={400}>
                    <span>删除项目"{projectName}",将会删除该项目内的所有任务以及和任务相关的所有内容</span>
                </Modal>
            </List.Item>
        );
    };
};

class Project extends React.PureComponent {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'project/queryInitProjects'
        });
    }
    state = {
        visible: false,
        drawerVisible: false,
        textTitle: null,
        text: null,
        selectedKey: 'activity',
        cardWidth: {
            width: '100%',
            height: '100vh',
        },
        itemLayout: '',
        grid: { gutter: 16, column: 6 },
        drawerTitle: null,
    }
    // 添加弹窗 弹出
    onClick = () => {
        this.setState({
            visible: true,
        });
    }
    // 获取值
    onChangeTextTitle = (e) => {
        this.setState({
            textTitle: e.target.value,
        });
    }

    onChangeText = (e) => {
        this.setState({
            text: e.target.value,
        });
    }
    // 添加弹窗 确认
    handleOK = () => {
        const { dispatch } = this.props;
        this.setState({
            visible: false,
            text: null,
            textTitle: null,
        });
        dispatch({
            type: 'project/addProjects',
            payload: {
                projectName: this.state.textTitle,
                projectText: this.state.text,
            }
        });
        message.success('添加成功');
    }
    // 添加弹窗 取消 
    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }

    handleClose = () => {
        this.setState({
            drawerVisible: false,
            cardWidth: {
                width: '100%',
                height: '100vh',
            },
            itemLayout: '',
            grid: { gutter: 16, column: 6 },
        })
    }

    handleTask = (e, item) => {
        const { dispatch } = this.props;
        if (e.target.nodeName !== 'BUTTON') {
            dispatch({
                type: 'task/fetch',
                payload: {
                    projectId: item.projectId,
                }
            })
            this.setState({
                drawerVisible: true,
                cardWidth: {
                    width: '25%',
                    height: '100vh',
                },
                itemLayout: 'vertical',
                grid: null,
                drawerTitle: item.projectName,
            })
        }
    };

    handleFinished = (item) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'task/updateTasks',
            payload: {
                projectIdSelect: item.projectId,
                ...item
            },
        });
        dispatch({
            type: 'project/queryInitProjects'
        });
    };

    render() {
        const { visible, drawerVisible, cardWidth, itemLayout, grid, drawerTitle } = this.state;
        const { taskChoice, project } = this.props;
        // 头部左边
        const cardTitle = (
            <Menu

                mode='horizontal'
                defaultSelectedKeys={[this.state.selectedKey]}
                style={{ borderBottom: '0' }}
            >
                <Menu.Item key='activity'>活动项目</Menu.Item>
                <Menu.Item key='archived'>归档项目</Menu.Item>
            </Menu>
        );
        // 头部右边
        const cardExtra = (
            <Button icon='plus' onClick={this.onClick}></Button>
        );
        // 抽屉表单
        const ModalRow = (
            <div>
                <Row gutter={16}>
                    <Col span={6} push={1}><span>项目名称</span></Col>
                    <Col span={16}> <Input placeholder='请输入项目名称'
                        onChange={this.onChangeTextTitle}
                        value={this.state.textTitle}
                    ></Input></Col>
                </Row>
                <br></br>
                <Row gutter={24}>
                    <Col span={6} push={1}><span>项目简介</span></Col>
                    <Col span={16}> <TextArea
                        onChange={this.onChangeText}
                        value={this.state.text}
                        autosize={{ minRows: 2 }}></TextArea></Col>
                </Row>
            </div>
        );
        return (
            <div>
                <Card
                    headStyle={{ height: '65px' }}
                    title={cardTitle}
                    extra={cardExtra}
                    style={cardWidth}
                >
                    <List
                        locale={{ emptyText: '暂无数据' }}
                        grid={grid}
                        itemLayout={itemLayout}
                        dataSource={project}
                        renderItem={(item) => (
                            <PositionCard
                                onClick={(e) => this.handleTask(e, item)}
                                key={item.projectId}
                                keyId={item.projectId}
                                projectName={item.projectName}
                                total={item.project_total_task}
                                finish={item.project_finish_task}
                            ></PositionCard>
                        )}
                    ></List>
                    <Modal
                        title='新建项目'
                        closable
                        okText='创建'
                        visible={visible}
                        onOk={this.handleOK}
                        onCancel={this.handleCancel}
                        width={400}
                        cancelButtonProps={{ hidden: true }}>
                        {ModalRow}
                    </Modal>
                </Card>
                <Drawer
                    width={'75%'}
                    mask={false}
                    onClose={this.handleClose}
                    visible={drawerVisible}
                    title={`项目"${drawerTitle}"的任务`}
                >
                    <Suspense fallback={null}>
                        <TimelineList dataSource={taskChoice} finished={this.handleFinished}></TimelineList>
                    </Suspense>
                </Drawer>
            </div>
        );
    }
}

export default connect(({ project, task, loading }) => ({
    project: project.dataList,
    taskChoice: task.dataList.task,
    loading: loading.models.project,
}))(Project);
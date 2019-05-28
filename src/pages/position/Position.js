import React from 'react';
import { Button, Modal, Input, Card, List, Row, Col, message } from 'antd';
import { connect } from 'dva';
import ListCard from '@/components/ListCard/ListCard';

@connect(({ position, loading }) => ({
    position,
    loading: loading.models.position,
}))
class Position extends React.PureComponent {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'position/queryInitPositions',
        });
    };
    state = {
        visible: false,
        text: null,
    };

    onClick = () => {
        this.setState({
            visible: true,
        });
    };

    onChange = (e) => {
        this.setState({
            text: e.target.value,
        });
    };

    handleOK = () => {
        const { dispatch } = this.props;
        this.setState({
            visible: false,
            text: null,
        })
        dispatch({
            type: 'position/savePositions',
            payload: {
                positionName: this.state.text,
            }
        });
        message.success('添加成功');
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        })
    };

    onDelete = (e) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'position/delPositions',
            payload: {
                positionId: e.target.value,
            }
        });
        message.info('删除成功');
    }

    render() {
        const cardExtra = (
            <Button icon='plus' onClick={this.onClick}></Button>
        );

        return (
            <div>
                <Card title='地点   '
                    extra={cardExtra}
                    style={{ height: '100vh' }}
                >
                    <List
                        grid={{ gutter: 16, column: 6 }}
                        locale={{ emptyText: '暂无数据' }}
                        dataSource={this.props.position.dataList}
                        renderItem={item => (
                            <ListCard
                                keyId={item.positionId}
                                text={<p>任务数({item.position_total_task})</p>}
                                date={item.positionName}
                                onDelete={this.onDelete}
                                task={item.position_total_task}>
                            </ListCard>
                        )}
                    ></List>
                    <Modal
                        title='新建地点'
                        closable
                        okText='新建'
                        visible={this.state.visible}
                        onOk={this.handleOK}
                        onCancel={this.handleCancel}
                        width={400}
                        cancelButtonProps={{ hidden: true }}>
                        <Row>
                            <Col span={6} push={1}><span>地点名称</span></Col>
                            <Col span={16}><Input placeholder='请输入地点名称'
                                value={this.state.text}
                                onChange={this.onChange}></Input></Col>
                        </Row>
                    </Modal>
                </Card>
            </div >
        );
    }
};

export default Position;
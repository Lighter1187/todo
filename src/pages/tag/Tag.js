import React from 'react';
import {
    Button,
    Modal,
    Input,
    Card,
    List,
    Row,
    Col,
    message
} from 'antd';
import { connect } from 'dva';
import ListCard from '@/components/ListCard/ListCard';

@connect(({ myTag, loading }) => ({
    myTag,
    loading: loading.models.myTag,
}))
class Tag extends React.PureComponent {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'myTag/queryInitTags',
        });
    }

    state = {
        visible: false,
        text: null,
    }

    onClick = () => {
        this.setState({
            visible: true,
        });
    }

    onChange = (e) => {
        this.setState({
            text: e.target.value,
        });
    }

    handleOK = () => {
        const { dispatch } = this.props;
        this.setState({
            visible: false,
            text: null,
        })
        dispatch({
            type: 'myTag/addTags',
            payload: {
                tagName: this.state.text,
            }
        });
        message.success('添加成功');
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }

    onDelete = (e) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'myTag/delTags',
            payload: {
                tagId: e.target.value,
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
                <Card title='标签'
                    extra={cardExtra}
                    style={{ height: '100vh' }}
                >
                    <List
                        grid={{ gutter: 16, column: 6 }}
                        locale={{ emptyText: '暂无数据' }}
                        dataSource={this.props.myTag.dataList}
                        renderItem={item => (
                            <ListCard
                                keyId={item.tagId}
                                text={<p>任务数({item.tag_total_task})</p>}
                                date={item.tagName}
                                onDelete={this.onDelete}
                                task={item.tag_total_task}>
                            </ListCard>
                        )}
                    ></List>
                    <Modal
                        title='新建标签'
                        closable
                        okText='新建'
                        visible={this.state.visible}
                        onOk={this.handleOK}
                        onCancel={this.handleCancel}
                        width={400}
                        cancelButtonProps={{ hidden: true }}>
                        <Row>
                            <Col span={6} push={1}><span>标签名称</span></Col>
                            <Col span={16}><Input placeholder='请输入标签名称'
                                value={this.state.text}
                                onChange={this.onChange}></Input></Col>
                        </Row>
                    </Modal>
                </Card>
            </div >
        );
    }
};

export default Tag;
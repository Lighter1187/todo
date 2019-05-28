import React from 'react';
import moment from 'moment';
import { Card, Input, List, message, Button } from 'antd';
import { connect } from 'dva';
import ListCard from '@/components/ListCard/ListCard';

const { TextArea } = Input;
const ListItem = List.Item;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

@connect(({ note, loading }) => ({
    note,
    loading: loading.models.note,
}))
class Note extends React.PureComponent {
    state = {
        areaText: null,
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'note/queryInitNotes',
        });
    }
    // 删除
    onDelete = (e) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'note/delNotes',
            payload: {
                noteId: e.target.value,
            }
        });
        message.info('删除成功');
    }
    // 添加便签
    onKeyPress = (event) => {
        const { dispatch } = this.props;
        const text = this.state.areaText;

        if (event.charCode === 13 && event.key === '\n' && text !== null) {
            this.setState({
                areaText: null,
            });

            dispatch({
                type: 'note/addNotes',
                payload: {
                    noteName: this.state.areaText,
                    noteDate: moment().format(dateFormat),
                }
            });
            message.success(`添加成功`);
        }

    }

    onChange = (event) => {
        this.setState({
            areaText: event.target.value,
        });
    }

    render() {
        const { areaText } = this.state;
        const cardExtra = (
            <Button style={{ border: '0' }}></Button>
        );
        return (
            <div>
                <Card title='便签' extra={cardExtra} style={{ height: '100vh' }}>
                    <List
                        grid={{ gutter: 16, column: 4 }}
                        locale={{ emptyText: '暂无数据' }}
                        dataSource={['', ...this.props.note.dataList]}
                        renderItem={item => item ? (
                            <ListCard
                                keyId={item.noteId}
                                date={item.noteDate}
                                text={item.noteName}
                                task={0}
                                onDelete={this.onDelete}></ListCard>
                        ) : (
                                <ListItem>
                                    <TextArea placeholder='输入备忘&#10;按Crtl+Enter完成'
                                        style={{ width: '200px' }}
                                        autosize={{ minRows: 3, maxRows: 20 }}
                                        onKeyPress={this.onKeyPress}
                                        onChange={this.onChange}
                                        value={areaText}
                                    ></TextArea>
                                </ListItem>
                            )}
                    >
                    </List>
                </Card>
            </div>
        );
    }
};

export default Note;

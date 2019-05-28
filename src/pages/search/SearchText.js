import React from 'react';
import { Avatar, List, Card, Input } from 'antd';
import { connect } from 'dva';

const Search = Input.Search;

@connect(({ search, loading }) => ({
    search,
    loading: loading.models.search,
}))
class SearchText extends React.PureComponent {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'search/queryTasks',
            payload: {
                taskName: '',
            }
        });
    }
    handleKeyDown = (e) => {
        const { dispatch } = this.props;
        if (e.key === 'Enter') {
            dispatch({
                type: 'search/queryTasks',
                payload: {
                    taskName: e.target.value,
                }
            });
        }
    };

    handleSearch = (e) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'search/queryTasks',
            payload: {
                taskName: e,
            }
        });
    }

    render() {
        return (
            <div>
                <Card title={
                    <Search
                        placeholder='请输入任务关键字'
                        onKeyDown={this.handleKeyDown}
                        onSearch={this.handleSearch}
                        style={{ width: 380 }}></Search>
                }
                    style={{ height: '100vh' }}>
                    <List
                        locale={{ emptyText: '暂无数据' }}
                        dataSource={this.props.search.dataList}
                        renderItem={item => (
                            <List.Item>
                                <Avatar icon='user'></Avatar>
                                {item.taskName}
                            </List.Item>
                        )}
                    >
                    </List>
                </Card>
            </div>
        );
    }
}

export default SearchText;
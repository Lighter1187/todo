import React from 'react';
import { Card, Tag, List, Button } from 'antd';
import moment from 'moment';

const Fragment = React.Fragment;
// 分类文本
const radioText = ['很重要-很紧急', '重要-不紧急', '不重要-紧急', '不重要-不紧急'];
const taskColor = ['red', 'orange', 'blue', 'green'];

const gridStyle = {
    width: '50%',
    height: '40vh',
    textAlign: 'center',
};

const buttonStyle = {
    width: '100%',
    textAlign: 'center',
};

const CardList = ({ dataSource, showDrawer, finished }) => {
    // 四象限
    const CardGrid = ({ title, color, dataSource }) => (
        <Fragment>
            <Card.Grid style={gridStyle}>
                <Tag style={buttonStyle} color={color}>
                    {title}
                </Tag>
                <List
                    pagination={{ pageSize: 4, }}
                    locale={{ emptyText: '暂无数据' }}
                    dataSource={dataSource}
                    renderItem={item => item.taskId ? (
                        <List.Item
                            style={{ padding: '0', borderWidth: '0' }}>
                            <Button
                                onClick={() => finished(item)}
                                size='small'
                                shape='circle'
                                icon={item.finished ? 'check' : null}
                                style={{
                                    color: color,
                                    borderColor: color,
                                    borderWidth: '2px',
                                    marginTop: '4px',
                                }}>
                            </Button>
                            <Button onClick={() => showDrawer(item.taskId)}
                                style={{ width: '85%', borderWidth: '0', borderLeftWidth: '0' }}>
                                <div style={{ float: 'left' }}>
                                    {item.taskName}
                                </div>
                                <div style={{ float: 'right' }}>{moment(new Date(item.dateStart)).format('MM/DD HH:mm')}</div>
                            </Button>
                        </List.Item>
                    ) : <List.Item></List.Item>}>
                </List>
            </Card.Grid>
        </Fragment>
    );

    const cardList = (index) => dataSource[index] ? (
        <CardGrid
            color={taskColor[index]}
            title={radioText[index]}
            dataSource={dataSource[index]}
        >
        </CardGrid>
    ) : null;
    return (
        <Fragment>
            {cardList(0)}
            {cardList(1)}
            {cardList(2)}
            {cardList(3)}
        </Fragment>
    );
};

export default CardList;
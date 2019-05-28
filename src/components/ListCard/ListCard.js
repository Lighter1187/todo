import React from 'react';
import { Card, Button, List } from 'antd';

const ListItem = List.Item;


const ListCard = ({ keyId, date, onDelete, text, task }) => {
    return (
        <ListItem>
            <Card title={
                <div style={{ height: '28px' }}>
                    <span >{date}</span>
                    <Button icon='down'
                        shape='circle'
                        size='small'
                        style={{ marginLeft: '24px' }}
                        onClick={onDelete}
                        value={keyId}
                        hidden={0 !== task}
                    ></Button>
                </div>
            }
            >
                <span>{text}</span>
            </Card>
        </ListItem>
    )
};

export default ListCard;
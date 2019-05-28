import React from 'react';
import { Button, Row, Col } from 'antd';

const Fragment = React.Fragment;
const buttonBorderStyle = { border: '0' };
// 头部标题
const CardTitle = ({ handleChangeButton, buttonType, showDate }) => (
    <Fragment>
        <Row type='flex' align='middle' gutter={8} justify='start' style={{ width: '480px' }}>
            <Col span={6}>
                {showDate}
            </Col>
            <Col span={3}>
                <Button.Group>
                    <Button icon='left' style={buttonBorderStyle} ></Button>
                    <Button icon='right' style={buttonBorderStyle} ></Button>
                </Button.Group>
            </Col>
            <Col span={4}>
                <Button value='day'
                    type={buttonType === 'day' ? 'primary' : 'default'}
                    onClick={handleChangeButton}>今天</Button>
            </Col>
            <Col span={11}>
                <Button.Group onClick={handleChangeButton}>
                    <Button value='day' type={buttonType === 'day' ? 'primary' : 'default'}>日</Button>
                    <Button value='week' type={buttonType === 'week' ? 'primary' : 'default'}>周</Button>
                    <Button value='month' type={buttonType === 'month' ? 'primary' : 'default'}>月</Button>
                </Button.Group>
            </Col>
        </Row>
    </Fragment>
);

export default CardTitle;
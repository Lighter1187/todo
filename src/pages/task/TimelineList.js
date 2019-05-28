import React from 'react';
import { Timeline, Button } from 'antd';
const taskColor = ['','red', 'orange', 'blue', 'green'];
// 时间轴
const TimelineList = ({ dataSource, showDrawer, finished }) => (
    <div style={{ height: '100vh' }}>
        {
            dataSource ?
                <Timeline>
                    {dataSource.map(t =>
                        <Timeline.Item
                            key={t.taskId}
                            dot={
                                <Button
                                    onClick={() => finished(t)}
                                    size='small'
                                    shape='circle'
                                    icon={t.finished ? 'check' : null}
                                    style={{
                                        color: taskColor[t.level],
                                        borderColor: taskColor[t.level],
                                        borderWidth: '2px',
                                        marginRight: '8px',
                                    }}>
                                </Button>
                            }
                        >
                            <Button value={t.taskId} onClick={showDrawer}>{t.taskName}</Button>
                        </Timeline.Item>
                    )}
                </Timeline> :
                null
        }

    </div>
);

export default TimelineList;
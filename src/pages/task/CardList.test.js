import React, { Component } from 'react';
import { render, mount, shallow } from 'enzyme';
import TimelineList from './TimelineList';
import CardList from './CardList';
import CardTitle from './CardTitle';
import TaskForm from './TaskForm';

describe('Button', () => {
    const level1_task = [{
        taskId: '10001',
        taskName: 'task01',
        level: 1,
        finished: true,
        dateStart: '2018-12-8 09:28',
        dateEnd: '2018-12-8 10:28',
        projectId: '20001',
        positionId: '30001',
        tagId: '40001',
    }];
    const level2_task = [{
        taskId: '10002',
        taskName: 'task02',
        level: 2,
        finished: true,
        dateStart: '2018-12-9 09:28',
        dateEnd: '2018-12-9 10:28',
        projectId: '20002',
        positionId: '30002',
        tagId: '40002',
    }];
    const level3_task = [{
        taskId: '10003',
        taskName: 'task03',
        level: 3,
        finished: false,
        dateStart: '2018-12-8 09:28',
        dateEnd: '2018-12-8 10:28',
        projectId: '20001',
        positionId: '30001',
        tagId: '40001',
    }];
    const level4_task = [{
        taskId: '10004',
        taskName: 'task04',
        level: 4,
        finished: false,
        dateStart: '2018-12-8 09:28',
        dateEnd: '2018-12-8 10:28',
        projectId: '20001',
        positionId: '30001',
        tagId: '40001',
    }];
    const data = [level1_task,level2_task,level3_task,level4_task];
    it('自定义Radio按钮测试', () => {
        const wrapper3 = mount(<CardList dataSource={data} />);
        const CardGrid1 = wrapper3.find('CardList').childAt(0);
        const CardGrid2 = wrapper3.find('CardList').childAt(1);
        const CardGrid3 = wrapper3.find('CardList').childAt(2);
        const CardGrid4 = wrapper3.find('CardList').childAt(3);
        expect(CardGrid1.find('Button').first().prop('icon')).toEqual('check');
        expect(CardGrid1.find('Button').find('div').first().text()).toEqual('task01');
        expect(CardGrid1.find('Button').find('div').last().text()).toEqual('12/08 09:28');
        expect(CardGrid2.find('Button').first().prop('icon')).toEqual('check');
        expect(CardGrid3.find('Button').first().prop('icon')).toEqual(null);
        // expect(CardGrid4.find('Button').first().prop('icon')).toEqual(null);
        expect(CardGrid4.find('Button')).toBeDefined();
        // expect(wrapper3.find('Button').last(-1).prop('icon')).toEqual('check');
    });
})
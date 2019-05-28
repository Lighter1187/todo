import React, { Component } from 'react';
import { render, mount, shallow } from 'enzyme';
import ListCard from './ListCard';

describe('ListCard Test', () => {
    it('Button Test', () => {
        const warpped1 = mount(<ListCard task={0} date={"123"} text={"test"}></ListCard>);
        const warpped2 = mount(<ListCard task={1}></ListCard>);
        expect(warpped1.find('Button').prop('hidden')).toBeFalsy();
        expect(warpped1.find('span').first().text()).toEqual('123');
        expect(warpped1.find('Card').find('span').last().text()).toEqual('test');
        expect(warpped2.find('Button').prop('hidden')).toBeTruthy();
    })
})
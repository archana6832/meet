import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents > component', () => {

    test('textbox is rendered correctly', () => {
        const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
        expect(NumberOfEventsWrapper.find('.NumberOfEvents')).toHaveLength(1);
    })

    test('Textbox changes state of numberofevents', () => {
        const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
        const newNumber = { target: { value: '16' } };
        NumberOfEventsWrapper.find('.newNumber').simulate('change', newNumber);
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(16);
    })
})
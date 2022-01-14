import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents > component', () => {

    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    test('textbox is rendered correctly', () => {

        expect(NumberOfEventsWrapper.find('.NumberOfEvents')).toHaveLength(1);
    })

    test('Textbox changes state of numberofevents', () => {

        const newNumber = { target: { value: '32' } };
        NumberOfEventsWrapper.find('.newNumber').simulate('change', newNumber);
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32);
    })
})
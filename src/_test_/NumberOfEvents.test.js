import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';


describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {

        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });
    //render text input
    test('render text input', () => {
        expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
    });
    //render text input correctly
    test('render text input correctly', () => {
        const numberOfEvents = NumberOfEventsWrapper.prop('numberOfEvents');
        expect(NumberOfEventsWrapper.find('.number-of-events').prop('value')).toBe(numberOfEvents);
    });
});
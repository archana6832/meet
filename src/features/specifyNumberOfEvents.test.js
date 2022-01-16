import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import App from '../App';
import { mount, shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    //Scenario 1 When user hasn’t specified a number, 32 is the default number

    test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
        let NumberOfEventsWrapper;
        given('the user is viewing the events on the main page', () => {

        });

        when('the user hasn\'t selected the number of events to be displayed', () => {
            NumberOfEventsWrapper = shallow(<NumberOfEvents />);
        });

        then('the default number of events wil be displayed', () => {
            NumberOfEventsWrapper.setState({ numberOfEvents: 32 });
        });
    });

    //Scenario 2 User can change the number of events they want to see
    test('User can change the number of events they want to see', ({ given, when, then }) => {
        let AppWrapper;
        let NumberOfEventsWrapper;
        given('the user is viewing the events on the main page', () => {
            AppWrapper = mount(<App />);
            NumberOfEventsWrapper = shallow(<NumberOfEvents />);
            NumberOfEventsWrapper.setState({ numberOfEvents: 32 });
        });

        when('the user has selected the number of events to be visible', () => {
            AppWrapper.find('.newNumber').simulate('change', { target: { value: '1' } });
            AppWrapper.update();
        });

        then('the number of events selected will be the amount displayed', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(12);
        });
    });

});
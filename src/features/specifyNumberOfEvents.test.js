import { loadFeature, defineFeature } from 'jest-cucumber';

import React from 'react';
import NumberOfEvents from "../NumberOfEvents";
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

    test('The default number of events is 32', ({ given, when, then }) => {
        let AppWrapper;
        given('the user launches the app', () => {
            AppWrapper = mount(<App />);
        });

        when('the user has not specified a number of events', () => {
            expect(AppWrapper.state('numberOfEvents')).toBe(32);
            AppWrapper.update();
        });

        then('the default number of events is 32', () => {
            expect(AppWrapper.state('numberOfEvents')).toBe(32);
        });
    });

    test('The user can change the number of events', ({ given, when, then }) => {
        let AppWrapper;
        given('the user launches the app', () => {
            AppWrapper = mount(<App />);
        });

        when('the user specifies the number of events they want to see', () => {
            const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            const newValue = { target: { value: 5 } }
            NumberOfEventsWrapper.find("input").simulate("change", newValue);
        });

        then('the app changes that number to the specified number by the user', () => {
            expect(AppWrapper.state('numberOfEvents')).toEqual(5);
        });
    });

});
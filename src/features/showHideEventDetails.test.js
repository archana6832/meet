import { loadFeature, defineFeature } from "jest-cucumber";
import React from 'react';
import { mount, shallow } from 'enzyme';

import Event from '../Event';
import EventList from '../EventList';
import { mockData } from '../mock-data';


import App from '../App';

// loadFeature expects file path to start from project root
const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {

    //
    test('When the user has not clicked on an event, each event element should be collapsed.', ({ given, when, then }) => {
        let AppWrapper;

        given('the main page is open', () => {
            AppWrapper = mount(<App />);
            AppWrapper.update();
        });

        when('the user has not clicked on an event', () => {

        });

        then('each event element should be collapsed.', () => {
            expect(AppWrapper.find('.extra-details')).toHaveLength(0);
        });
    });
    //


    test('When the user clicks on a collapsed event element, the element should expand.', ({ given, when, then }) => {
        let AppWrapper;
        given('an event element is collapsed', async () => {
            AppWrapper = await mount(<App />);
        });

        when('the user clicks on an event', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.show-details')).toHaveLength(12); //mockData length
            AppWrapper.find('.show-details').at(0).simulate('click');
        });

        then('the event element should expand.', () => {
            expect(AppWrapper.find('.extra-details')).toHaveLength(1);
        });
    });
    //
    //Scenario 3

    test('When the user clicks on an expanded event element, the element should collapse.', ({ given, when, then }) => {
        let EventWrapper;
        given('an event element is expanded', () => {
            EventWrapper = shallow(<Event event={mockData[0]} />)
            expect(EventWrapper.state('collapsed')).toBe(true);
        });

        when('the user clicks on an event', () => {
            const showDetails = EventWrapper.find('.event .show-details');
            showDetails.simulate('click');
        });

        then('the event element should collapse.', () => {
            expect(EventWrapper.state('collapsed')).toBe(false);
        });
    });

});
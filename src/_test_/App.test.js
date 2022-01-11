import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';


describe('<App /> component', () => {
    let AppWrapper;
    //Before all for each test
    beforeAll(() => {
        AppWrapper = shallow(<App />);
    });

    //render list of events
    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    //USER SHOULD SEE A LIST OF SUGGESTIONS WHEN THEY SEARCH FOR A CITY
    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    //show or hide event's details
    test('render NumberOfEvents', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(0);
    });
});
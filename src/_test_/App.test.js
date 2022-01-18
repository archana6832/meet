import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';


//Task 4.3 SHALLOW RENDERING API FOR UNIT TESTING

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
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    });
});


//Task 4.4 FULL RENDERING API INTEGRATION TESTING

describe('<App /> integration', () => {
    //App passes "events" state as a prop to EventList
    test('App passes "events" state as a prop to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
    });
    //App passes "locations" state as a prop to CitySearch
    test('App passes "locations" state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    });
    //get list of events matching the city selected by the user
    test('get list of events matching the city selected by the user', async () => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    });
    //get list of all events when user selects "See all cities"
    test('get list of all events when user selects "See all cities"', async () => {
        const AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });
    // NumberOfEvents integration testing
    test('pass number of events as 32 per default', () => {
        const AppWrapper = mount(<App />);
        const NumberOfEventsState = AppWrapper.state('numberOfEvents');
        expect(NumberOfEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toEqual(32);
        AppWrapper.unmount();
    })
    // change numberOfEvents state when NumberOfEvents changes
    test('change numberOfEvents state when NumberOfEvents changes', async () => {
        const AppWrapper = mount(<App />);
        AppWrapper.find('.number-of-events').simulate('change', { target: { value: 12 } });
        expect(AppWrapper.state('numberOfEvents')).toEqual(12);
        AppWrapper.unmount();
    })
});
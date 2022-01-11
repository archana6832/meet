import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {

    let EventWrapper;
    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData[1]} />);
    });
    //Summary is displayed
    test("Summary is displayed", () => {
        expect(EventWrapper.find(".summary")).toHaveLength(1);
    });
    //start-date and timezone
    test('renders start-date and timezone', () => {
        expect(EventWrapper.find('.start-date')).toHaveLength(1);
    });
    //Location is displayed
    test("Location is displayed", () => {
        expect(EventWrapper.find(".location")).toHaveLength(1);
    });
    //Show details button
    test("Show details button is rendered", () => {
        expect(EventWrapper.find(".show-details")).toHaveLength(1);
    });
    //event element collapsed by default
    test("event element is collapsed by default", () => {
        expect(EventWrapper.state("collapsed")).toBe(true);
    });
    //clicking on show details button shows extra details
    test("clicking on show details button shows extra details", () => {
        EventWrapper.setState({
            collapsed: true,
        });
        EventWrapper.find(".show-details").simulate("click");
        expect(EventWrapper.state("collapsed")).toBe(false);
    });
    //click to hide details button hides extra details
    test("clicking on hide details button hides extra details", () => {
        EventWrapper.setState({
            collapsed: false,
        });
        EventWrapper.find(".hide-details").simulate("click");
        expect(EventWrapper.state("collapsed")).toBe(true);
    });

});

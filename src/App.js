import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { getEvents, extractLocations } from './api';
import NumberOfEvents from './NumberOfEvents';
import './nprogress.css';


class App extends Component {

  state = {
    events: [], //to pass events state to EventList component
    locations: [], // to pass locations state to citysearch component
    eventCount: undefined

  }

  //componentDidMount
  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
        //console.log(this.state.events);
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }




  //
  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, this.state.eventCount),
          currentLocation: location,
        });
      }
    });
  }
  //


  render() {
    return (
      <div className="App">
        <p className="meet">MEET APP</p>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents />
        <EventList events={this.state.events} />

      </div>
    );
  }
}



export default App;
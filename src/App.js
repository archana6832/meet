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
    locations: [] // to pass locations state to citysearch component
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


  //to change the state of events in the App component
  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }
  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents />
        <EventList events={this.state.events} />

      </div>
    );
  }
}



export default App;
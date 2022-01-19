import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
//import WelcomeScreen from './WelcomeScreen';
//import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { getEvents, extractLocations } from './api';
import NumberOfEvents from './NumberOfEvents';
import './nprogress.css';
import { WarningAlert } from './Alert';


class App extends Component {

  state = {
    events: [], //to pass events state to EventList component
    locations: [], // to pass locations state to citysearch component
    showWelcomeScreen: undefined,
    numberOfEvents: 32,
    currentLocation: 'all',
    errorText: ''

  }



  //UPDATE Events
  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, this.state.numberOfEvents),
          currentLocation: location,
        });
      }
    });
  }
  //UPDATE numberofevents
  updateNumberOfEvents = async (e) => {
    const { currentLocation } = this.state;
    this.setState({
      numberOfEvents: e
    });
    this.updateEvents(currentLocation, e);
  }

  //componentDidMount
  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }
  /*async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false :
      true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }*/
  // componentWillUnmount
  componentWillUnmount() {
    this.mounted = false;
  }


  render() {
    // if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    return (
      <div className="App">
        {!navigator.onLine ? (<WarningAlert text='You are offline!' />) : (<WarningAlert text='' />)}
        <p className="meet">MEET APP</p>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents} />
        <EventList events={this.state.events} />
        {/*<WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} />*/}
      </div>
    );
  }
}

export default App;
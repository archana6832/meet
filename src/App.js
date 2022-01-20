import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
//import { getEvents, extractLocations } from './api';
import NumberOfEvents from './NumberOfEvents';
import './nprogress.css';
import { WarningAlert } from './Alert';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EventGenre from './EventGenre';


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
  /*componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }*/

  //componentDidMount for WELCOMESCREEN
  async componentDidMount() {
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
  }

  // componentWillUnmount
  componentWillUnmount() {
    this.mounted = false;
  }

  //Scatter plot data function
  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />

    const { events } = this.state;

    return (
      <div className="App">
        {!navigator.onLine ? (<WarningAlert text='You are offline!' />) : (<WarningAlert text='' />)}

        <h1 className="meet">Meet App</h1>
        <h4>Choose your nearest city</h4>

        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents} />



        <div className="data-vis-wrapper">
          <EventGenre events={events} />

          <ResponsiveContainer height={400} >
            <ScatterChart
              width={800}
              height={400}
              margin={{
                top: 20, right: 20, bottom: 20, left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#6c66d7" />


            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;
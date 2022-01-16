import React, { Component } from "react";

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32,
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        if (value < 1 || value > 32) {
            this.setState({
                numberOfEvents: '',
                eventCount: false
            })
        }

    };

    render() {
        return (
            <div className="NumberOfEvents">
                <p><b>Number of Events</b></p>
                <input
                    type="number"
                    className="newNumber"
                    value={this.state.numberOfEvents}
                    onChange={(e) => this.handleInputChanged(e)}
                    onFocus={() => { this.setState({ eventCount: true }) }}
                />
            </div>
        )
    }
}
export default NumberOfEvents;


import React, { Component } from "react";

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 16,
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        if (value < 1 || value > 16) {
            this.setState({
                numberOfEvents: '',
            })
        }

    };

    render() {
        return (
            <div className="NumberOfEvents">
                <p><b>Number of Events:</b></p>
                <input
                    type="number"
                    className="newNumber"
                    value={this.state.numberOfEvents}
                    onChange={(e) => this.handleInputChanged(e)}
                />
            </div>
        )
    }
}
export default NumberOfEvents;


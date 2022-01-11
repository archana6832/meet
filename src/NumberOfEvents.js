import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: '',

    }
    handleInputChanged = (event) => {
        const value = event.target.value;

        this.setState({
            numberOfEvents: '',

        });
    }
    handleItemClicked = (event) => {
        this.setState({
            numberOfEvents: value,
        });
    }

    render() {
        return (
            <div className="NumberOfEvents">

                <p><b>Number of Events:</b></p>
                <input
                    type="number"
                    name="number"
                    className="number-of-events"
                    value={this.props.numberOfEvents}

                />

            </div>
        );
    }

}
export default NumberOfEvents;
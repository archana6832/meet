import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32,
        errorText: ''
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({ numberOfEvents: value });
        if (value > 0 && value < 33) {
            this.setState({
                numberOfEvents: value,
                errorText: ''
            })
        } else {
            this.setState({
                numberOfEvents: '',
                errorText: 'Please enter a number between 1 and 32'
            });
        }
        this.props.updateNumberOfEvents(event.target.value);
    };
    render() {
        return (
            <div className="NumberOfEvents">

                <h4>Number of Events</h4>
                <input
                    className="number-of-events"
                    type="number"
                    value={this.props.numberOfEvents}
                    onChange={(e) => this.handleInputChanged(e)}>
                </input>
                <ErrorAlert text={this.state.errorText} />
            </div>
        );
    }
}

export default NumberOfEvents;


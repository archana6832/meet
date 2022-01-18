import React, { Component } from "react";


class Event extends Component {

    state = {
        collapsed: true,
    };

    handleClick = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const { event } = this.props;
        const { collapsed } = this.state
        return (

            <div className="event">
                <h2 className="summary">{event.summary}</h2>
                <p className="location">{event.location}</p>
                <p className="start-date">{event.start.dateTime}</p>
                {/*<p className="end-date">{event.end.dateTime}</p>*/}

                <button variant="outline-info"
                    className={`${collapsed ? "show" : "hide"}-details`}
                    onClick={this.handleClick}
                >
                    {collapsed ? "Details" : "Hide"}
                </button>

                {!collapsed &&
                    <div className={`extra-details ${this.state.collapsed ? "hide" : "show"}`}>
                        <p className="event-description">{event.description}</p>
                    </div>
                }
            </div>
        );
    }
}
export default Event;
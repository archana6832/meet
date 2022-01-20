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

        const { collapsed } = this.state;
        const {
            summary,
            location,
            start: startTime,
            description,
        } = this.props.event;
        const eventDate = new Date(startTime.dateTime);
        const time = eventDate.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
        });
        const date = eventDate.toLocaleDateString("en-GB", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        return (

            <div className="event">
                <h2 className="summary">{summary}</h2>
                <p className="location">{location}</p>
                {/*<p className="start-date">{event.start.dateTime}</p>*/}
                {/*<p className="end-date">{event.end.dateTime}</p>*/}
                <p className="start-date">
                    {time} {date}
                </p>

                <button variant="outline-info"
                    className={`${collapsed ? "show" : "hide"}-details`}
                    onClick={this.handleClick}
                >
                    {collapsed ? "Details" : "Hide"}
                </button>

                {!collapsed &&
                    <div className={`extra-details ${this.state.collapsed ? "hide" : "show"}`}>
                        <p className="event-description">{description}</p>
                    </div>
                }
            </div>
        );
    }
}
export default Event;
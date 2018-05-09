import React, { Component } from 'react';

class WeatherApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zipcode: "",
            weatherInformation: [],
            error: {
                status: false,
                msg: ""
            }
        }
        this.initialState = {
            zipcode: "",
            weatherInformation: [],
            error: {
                status: false,
                msg: ""
            }
        }
    }
    clearValues = () => {
        this.setState({
            weatherInformation: [],
            error: {
                status: false,
                msg: ""
            }
        })
    }
    handleChange = (event) => {
        const field = event.target.name;
        this.setState({
            [field]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.clearValues();
        if (this.state.zipcode != "") {
            Meteor.call("getWeather", parseInt(this.state.zipcode), (err, res) => {
                if (!res) {
                    this.setState({
                        error: { status: true, msg: "Please enter a valid zipcode" }
                    });
                } else {
                    this.setState({
                        weatherInformation: res
                    });
                }

            });
        } else {
            this.setState({
                error: { status: true, msg: "Please enter a zipcode" }
            });
        }

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Zipcode:</label>
                    <input
                        type="number"
                        placeholder="Enter zipcode"
                        name="zipcode"
                        onChange={this.handleChange}
                    />
                    <button type="submit">Get Weather</button>
                </form>
                <div>
                    {this.state.error.status ? <div className="error">{this.state.error.msg}</div> : ""}
                    {this.state.weatherInformation.length > 0 ? <h2>Weather Infromation for {this.state.zipcode}</h2> : ""}
                    {this.state.weatherInformation.map(function (item, key) {
                        return (
                            <div key={key}>
                                {item.name} : {item.value}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default WeatherApp;
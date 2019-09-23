import React, {Component} from 'react';
import {connect} from "react-redux";
import '../App.css';


class Weather extends Component {

    state = {
        userCity: '',
        city: 'telaviv',
        WeatherText: '',
        WeatherIcon: '',
        Temperature: ''
    }

    componentDidMount() {
        debugger;
        // this.props.loadCity();
        let currentWeather = [{
                "LocalObservationDateTime": "2019-09-23T14:20:00+03:00",
                "EpochTime": 1569237600,
                "WeatherText": "Sunny",
                "WeatherIcon": 1,
                "HasPrecipitation": false,
                "PrecipitationType": null,
                "IsDayTime": true,
                "Temperature": {
                    "Metric": {
                        "Value": 29.6,
                        "Unit": "C",
                        "UnitType": 17
                    },
                    "Imperial": {
                        "Value": 85.0,
                        "Unit": "F",
                        "UnitType": 18
                    }
                },
                "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
                "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
            }]


        // console.log("aaa", currentWeather[0].WeatherText);
        // console.log("hello", currentWeather[0].WeatherIcon);
        // console.log("hello", currentWeather[0].Temperature.Metric.Value);

    }

    render() {
        return (<div className="cityWeather">
            <div className="form">
                <input name="ucity"
                    onChange={this.handleChange.bind(this)}
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Tel Aviv"/>
                <button onClick={
                        this.props.loadCity.bind(this)
                    }
                    className="btn btn-primary mb-2">Search</button>
            </div>

            <div className="divy2">
                <div className="card fifty1">
                    <div className="card-body">
                        <h5 className="card-title">{this.state.city}</h5>
                        <p className="card-text">{this.state.Temperature}</p>
                    </div>
                </div>
                <div className="fifty2">
                    <p className="faveHeart">
                        <span>&hearts;</span>
                        <span className="boxy">Add To Favorites</span>
                    </p>
                </div>
            </div>
        </div>);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value.toLowerCase().trim()})
    }


}


const mapStateToProps = function (state) {
    debugger;
    return {
        city: state.city,
        forecast: state.forecast,
        userCity: state.userCity,
        WeatherText: state.WeatherText,
        WeatherIcon: state.WeatherIcon,
        Temperature: state.Temperature
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadCity: () => {
            dispatch(loadCitySearch());
        }
    }
}

// download all server vacations
function loadCitySearch(city) {
    city = 'telaviv';
    let APIkey = `I2G37YRANeCZFbAm8syetLLmqPxx28AO`;
    return async function (dispatch) {
        let r = await fetch("http://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + APIkey + "&q=" + city);
        let jsonDATA = await r.json();
        console.log(jsonDATA[0].Key);
        let cityKey = jsonDATA[0].Key;
        let res2 = await fetch("http://dataservice.accuweather.com/currentconditions/v1/" + cityKey + "?apikey=" + APIkey);
        let jsonCityData = await res2.json();
        
        console.log(jsonCityData);
        // var currentWeather = jsonCityData;
        console.log(this);
        this.setState({WeatherText: jsonCityData[0].WeatherText})
        dispatch({type: "GET_CITY", data: jsonCityData});
    };
}

const weather = connect(mapStateToProps, mapDispatchToProps)(Weather);
export default weather;

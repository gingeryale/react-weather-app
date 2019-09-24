import React, {Component} from 'react';
import '../App.css';


class Weather extends Component {

    state = {
        weather:[],
        city:'new york',
        weatherDev:[{"LocalObservationDateTime":"2019-09-23T14:20:00+03:00",
        "EpochTime":1569237600,"WeatherText":"Sunny","WeatherIcon":1,"HasPrecipitation":false,
        "PrecipitationType":null,"IsDayTime":true,"Temperature":{"Metric":
        {"Value":29.6,"Unit":"C","UnitType":17},"Imperial":{"Value":85.0,"Unit":"F","UnitType":18}}
            }],
    }

    componentDidMount() {
        this.loadWeather();
    }
    render() {
        var fn = this.state.weather.map(val =>
           val.WeatherIcon = ("0" + val.WeatherIcon).slice(-2));
        return (
            <div className="cityWeather">
                <div className="form">
                    <input name="city"
                        onChange={this.handleChange.bind(this) }
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Tel Aviv"/>
                    <button onClick={this.loadWeather.bind(this)}
                        className="btn btn-primary mb-2">Search</button>
                </div>
                {this.state.weather.map(CW =>
                <div> 
                    <div className="divy2">
                        <div className="card fifty1">
                            <div className="card-body">
                            <img src={`https://developer.accuweather.com/sites/default/files/${fn}-s.png`} height="45px" alt="img"/>
                                <div>
                                    <h5 className="card-title">
                                        {this.state.city} </h5>
                                    <p className="card-text">
                                        {CW.Temperature.Metric.Value}&deg; {CW.Temperature.Metric.Unit}</p>
                                </div>
                            </div>
                        </div>
                        <div className="fifty2">
                            <p className="faveHeart">
                                <span>&hearts;</span>
                                <span className="boxy">Add To Favorites</span>
                            </p>
                        </div>
                </div>
                <div>
                <h2 className="forecast">{CW.WeatherText}</h2>
               </div>
               </div>
                )};
            </div>

        );
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value.toLowerCase().trim()})
    }


// download all server vacations



async loadWeather(city) {
    city = this.state.city;
    let _APIkey = `I2G37YRANeCZFbAm8syetLLmqPxx28AO`;
    let APIkey = `xL54tACtYJDR4TsFpdD9RhC5LP3fPcTY`;
    
        let r = await fetch("http://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + APIkey + "&q=" + city);
        let jsonDATA = await r.json();
        console.log("DATA", jsonDATA[0].Key);
        let cityKey = jsonDATA[0].Key;
        let res2 = await fetch("http://dataservice.accuweather.com/currentconditions/v1/" + cityKey + "?apikey=" + APIkey);
        let jsonCityData = await res2.json();

        console.log("DATA", jsonCityData);
        // var currentWeather = jsonCityData;
        console.log("DATA this", this);
        console.log("DATA cityW", jsonCityData);
        this.setState({ weather : jsonCityData })
        console.log("DATA final", jsonCityData);
    
}



}



export default Weather;

import React, {Component} from 'react';
import '../App.css';
import Card from './Card';

class Weather extends Component {

    state = {
        weather:[],
        city:'new york',
        forecast:[],
        setFavorites:[]
    }

    componentDidMount() {
        this.loadWeather();
    }

    render() {
        var fn = this.state.weather.map(val =>
            val.WeatherIcon = ("0" + val.WeatherIcon).slice(-2));
            
        return (
        <div>
            <div className="cityWeather">
                <div className="form">
                    <input name="city"
                        onChange={this.handleChange.bind(this) }
                        className="form-control form-control-lg"
                        type="text"
                        placeholder={this.state.city}/>
                    <button onClick={this.loadWeather.bind(this)}
                        className="btn btn-primary mb-2">Search</button>
                </div>
                {this.state.weather.map((CW, i) =>
                <div key={i}> 
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
                                <button onClick={this.addFave.bind(this, this.state.city)} className="boxy btn btn-outline-danger">Add To Favorites</button>
                            </p>
                        </div>
                </div>
                <div>
                <h2 className="forecast">{CW.WeatherText}</h2>
               </div>
               </div>
                )}
            </div>
            <div className="extForecast">
            {this.state.forecast.map((f, i) => 
                <Card 
                    key={i} 
                    day={f.EpochDate} 
                    temp={f.Temperature.Maximum.Value}
                    unit={f.Temperature.Maximum.Unit} />
                )}
            </div>
        </div>
        );
    }

    
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value.toLowerCase().trim()});
    }


    addFave(e, city){
        city = this.state.city;
        var prevFaveArray = [...this.state.setFavorites];
        prevFaveArray.push(city);
        this.setState({ setFavorites: prevFaveArray });
        localStorage.setItem('Favorites', prevFaveArray);
    }


// fetch data
async loadWeather(city) {
    city = this.state.city;
    let _WWWAPIkey = `I2G37YRANeCZFbAm8syetLLmqPxx28AO`;
    let _APIkey = `xL54tACtYJDR4TsFpdD9RhC5LP3fPcTY`;
    let APIkey = `FziO8d54IiCnnCTSk4IWhKvfvRe6fnMa`;
    try {
        var res = await fetch("http://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + APIkey + "&q=" + city);
      } catch(err) {
        alert("Couldn't find that location, please make sure you spelled it correctly");
      }
        var jsonDATA = await res.json();
        debugger;
        try {
        var cityKey = jsonDATA[0].Key;
        }catch(err){
            alert("Couldn't find that location, please make sure you spelled it correctly");
        }
        var res2 = await fetch("http://dataservice.accuweather.com/currentconditions/v1/" + cityKey + "?apikey=" + APIkey);
        var jsonCityData = await res2.json();
        this.setState({ weather : jsonCityData });
        try{
            var res3 = await fetch("http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + cityKey + "?apikey=" + APIkey+"&metric=true");
            var jsonForecastData = await res3.json();
            this.setState({ forecast : jsonForecastData.DailyForecasts });   
        }catch(err){
            console.log(err);
            window.location.reload();
        }
    }
}



export default Weather;
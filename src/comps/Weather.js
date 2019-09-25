import React, {Component} from 'react';
import '../App.css';
import Card from './Card';

class Weather extends Component {

    state = {
        weather:[],
        searchVal:'',
        cityKey:'215854',
        unit:'',
        cityText:'',
        cityTemp:'',
        city:'tel aviv',
        forecast:[],
        setFavorites:"",

        cityKeySearch:[{"Version":1,"Key":"349727","Type":"City","Rank":15,"LocalizedName":"New York","EnglishName":"New York","PrimaryPostalCode":"10007","Region":{"ID":"NAM","LocalizedName":"North America","EnglishName":"North America"},"Country":{"ID":"US","LocalizedName":"United States","EnglishName":"United States"},"AdministrativeArea":{"ID":"NY","LocalizedName":"New York","EnglishName":"New York","Level":1,"LocalizedType":"State","EnglishType":"State","CountryID":"US"},"TimeZone":{"Code":"EDT","Name":"America/New_York","GmtOffset":-4.0,"IsDaylightSaving":true,"NextOffsetChange":"2019-11-03T06:00:00Z"},"GeoPosition":{"Latitude":40.779,"Longitude":-73.969,"Elevation":{"Metric":{"Value":8.0,"Unit":"m","UnitType":5},"Imperial":{"Value":26.0,"Unit":"ft","UnitType":0}}},"IsAlias":false,"SupplementalAdminAreas":[{"Level":2,"LocalizedName":"New York","EnglishName":"New York"}],"DataSets":["Alerts","DailyAirQualityForecast","DailyPollenForecast","ForecastConfidence","MinuteCast","Radar"]}],
        forecastWWWW:[{"Date":"2019-09-24T07:00:00-04:00","EpochDate":1569322800,"Temperature":{"Minimum":{"Value":15.0,"Unit":"C","UnitType":17},"Maximum":{"Value":24.4,"Unit":"C","UnitType":17}},"Day":{"Icon":4,"IconPhrase":"Intermittent clouds","HasPrecipitation":false},"Night":{"Icon":33,"IconPhrase":"Clear","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://m.accuweather.com/en/us/new-york-ny/10007/daily-weather-forecast/349727?unit=c&lang=en-us","Link":"http://www.accuweather.com/en/us/new-york-ny/10007/daily-weather-forecast/349727?unit=c&lang=en-us"},{"Date":"2019-09-25T07:00:00-04:00","EpochDate":1569409200,"Temperature":{"Minimum":{"Value":17.4,"Unit":"C","UnitType":17},"Maximum":{"Value":25.4,"Unit":"C","UnitType":17}},"Day":{"Icon":1,"IconPhrase":"Sunny","HasPrecipitation":false},"Night":{"Icon":34,"IconPhrase":"Mostly clear","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://m.accuweather.com/en/us/new-york-ny/10007/daily-weather-forecast/349727?day=1&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/us/new-york-ny/10007/daily-weather-forecast/349727?day=1&unit=c&lang=en-us"},{"Date":"2019-09-26T07:00:00-04:00","EpochDate":1569495600,"Temperature":{"Minimum":{"Value":16.7,"Unit":"C","UnitType":17},"Maximum":{"Value":27.8,"Unit":"C","UnitType":17}},"Day":{"Icon":2,"IconPhrase":"Mostly sunny","HasPrecipitation":false},"Night":{"Icon":34,"IconPhrase":"Mostly clear","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://m.accuweather.com/en/us/new-york-ny/10007/daily-weather-forecast/349727?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/us/new-york-ny/10007/daily-weather-forecast/349727?day=2&unit=c&lang=en-us"},{"Date":"2019-09-27T07:00:00-04:00","EpochDate":1569582000,"Temperature":{"Minimum":{"Value":17.2,"Unit":"C","UnitType":17},"Maximum":{"Value":24.5,"Unit":"C","UnitType":17}},"Day":{"Icon":2,"IconPhrase":"Mostly sunny","HasPrecipitation":false},"Night":{"Icon":33,"IconPhrase":"Clear","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://m.accuweather.com/en/us/new-york-ny/10007/daily-weather-forecast/349727?day=3&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/us/new-york-ny/10007/daily-weather-forecast/349727?day=3&unit=c&lang=en-us"},{"Date":"2019-09-28T07:00:00-04:00","EpochDate":1569668400,"Temperature":{"Minimum":{"Value":19.4,"Unit":"C","UnitType":17},"Maximum":{"Value":27.8,"Unit":"C","UnitType":17}},"Day":{"Icon":2,"IconPhrase":"Mostly sunny","HasPrecipitation":false},"Night":{"Icon":35,"IconPhrase":"Partly cloudy","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://m.accuweather.com/en/us/new-york-ny/10007/daily-weather-forecast/349727?day=4&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/us/new-york-ny/10007/daily-weather-forecast/349727?day=4&unit=c&lang=en-us"}],
        weatherWWWW:[{"LocalObservationDateTime":"2019-09-25T00:27:00-04:00","EpochTime":1569385620,"WeatherText":"Clear","WeatherIcon":33,"HasPrecipitation":false,"PrecipitationType":null,"IsDayTime":false,"Temperature":{"Metric":{"Value":18.3,"Unit":"C","UnitType":17},"Imperial":{"Value":65.0,"Unit":"F","UnitType":18}},"MobileLink":"http://m.accuweather.com/en/us/new-york-ny/10007/current-weather/349727?lang=en-us","Link":"http://www.accuweather.com/en/us/new-york-ny/10007/current-weather/349727?lang=en-us"}]
    }

    componentDidMount() {
        //this.loadWeather();
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
                                        {this.state.searchVal} </h5>
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

    
addFave(city, key, temp, unit, cityText){
    city = this.state.searchVal;
    key = this.state.cityKey;
    temp = this.state.cityTemp;
    unit = this.state.unit;
    cityText = this.state.cityText;
    var prevFaveArray = [...this.state.setFavorites];
    prevFaveArray.push({"city":city, "key":key, "temp": temp, "unit": unit, "cityText":cityText});
    this.setState({ setFavorites: prevFaveArray });
    if((localStorage.getItem('faves') == "") || (localStorage.getItem('faves') == null)){
        localStorage.setItem('faves', JSON.stringify(prevFaveArray));
    }else{
        var existingStore = JSON.parse(localStorage.getItem("faves"));
        existingStore.push({"city":city, "key":key, "temp": temp, "unit": unit, "cityText":cityText});
        localStorage.setItem("faves", JSON.stringify(existingStore));

    }
}


// fetch data
async loadWeather(city) {
    city = this.state.city;

    let EXPOSEDAPIkey = `I2G37YRANeCZFbAm8syetLLmqPxx28AO`;
    let GONEAPIkey = `xL54tACtYJDR4TsFpdD9RhC5LP3fPcTY`;

    let GOODAPIkey = `0ihABqFzGmWUxk3dPNte1yR0zB12eGXj`;
    let ALSOGOODAPIkey = `xh0EYFPmBRXURYY0907zmpO4uN3Jtbwj`;
    let APIkey = `vuyBU7N4Uz4AU5LytqXRWOgnSwYJTnVQ`;
    try {
        var res = await fetch("http://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + APIkey + "&q=" + city);
      } catch(err) {
        alert("Couldn't find that location, please make sure you spelled it correctly");
        return
      }
       
        var jsonDATA = await res.json();
        try {
        var cityKey = jsonDATA[0].Key;
        this.setState({searchVal: city});
        this.setState({cityKey: cityKey});
        }catch(err){
            alert("An Error occurred, try again, or check your spelling");
            return;
        }
        var res2 = await fetch("http://dataservice.accuweather.com/currentconditions/v1/" + cityKey + "?apikey=" + APIkey);
        var jsonCityData = await res2.json();
        this.setState({ weather : jsonCityData });
        this.setState({unit: jsonCityData[0].Temperature.Metric.Unit}); 
        this.setState({cityTemp: jsonCityData[0].Temperature.Metric.Value});
        this.setState({cityText:jsonCityData[0].WeatherText}); 
        try{
            var res3 = await fetch("http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + cityKey + "?apikey=" + APIkey+"&metric=true");
            var jsonForecastData = await res3.json();
            this.setState({ forecast : jsonForecastData.DailyForecasts });  
        }catch(err){
            alert("An Error occurred, try again");
            return;
        }
    }


}

export default Weather;

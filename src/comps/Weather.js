import React, {Component} from 'react';
import '../App.css';
import Card from './Card';


class Weather extends Component {

    state = {
        city:'',
        cityData:[],
        weather:[],
        searchVal:'',
        cityKey:'',
        unit:'',
        cityText:'',
        cityCountry:'',
        cityTemp:'',
        cityID:'',
        forecast:[],
        setFavorites:"",
        isFavorite: false
    }

    componentDidMount() {
        //this.loadWeather();
    }

    render() {
        let fn = this.state.weather.map(val =>
        val.WeatherIcon = ("0" + val.WeatherIcon).slice(-2));
        let faveSate = this.state.isFavorite;
        let heartClass = this.state.isFavorite;
        faveSate ? faveSate=(<div onClick={this.handleUnFave.bind(this, this.state.city)}>REMOVE FAVE</div>) : faveSate=(<div onClick={this.handleFave.bind(this, this.state.city)}>ADD FAVE</div>);
        heartClass ? heartClass=("rheart") : heartClass=("gheart");
        let details;
        let cityDetails = this.state.cityID;
        details = cityDetails && (<span>{this.state.cityID} / {this.state.cityCountry}</span>)

        return (
        <div>
            <button onClick={this.loadCityWeather.bind(this)}>load</button>
            <div>
                <ul>
                {this.state.cityData.map((c, i) => 
                    <li key={c.Key}
                        data-city={c.AdministrativeArea.CountryID}
                        data-state={c.AdministrativeArea.ID}
                        id={c.Key}
                        onClick={this.handleCitySearch.bind(this)}
                        >
                    {c.EnglishName} / {c.AdministrativeArea.EnglishName} / {c.Country.ID}
                </li>)}
                </ul>
            </div>
           
            <div className="form">
                <input name="city"
                    onChange={this.handleChange.bind(this) }
                    className="form-control form-control-lg"
                    type="text"
                    placeholder={this.state.city}/>
                <button onClick={this.loadCityWeather.bind(this)}
                    className="btn btn-primary mb-2">Search</button>
            </div>
            {this.state.weather.map((CW, i) =>
            <div key={i}> 
                <div className="divy2">
                    <div className="card fifty1">
                        <div className="card-body">
                        <img src={`https://developer.accuweather.com/sites/default/files/${fn}-s.png`} 
                        width="75px" height="45px" alt="img"/>
                            <div>
                                <h5 className="card-title">
                                    {this.state.searchVal}</h5>
                                    {details}
                                <p className="card-text">
                                    {CW.Temperature.Metric.Value}&deg; {CW.Temperature.Metric.Unit}</p>
                            </div>
                        </div>
                    </div>
                    <div className="fifty2">
                        <p className="faveHeart">
                            <span className={heartClass}>&hearts;</span>
                            <button className="boxy btn btn-outline-danger">{faveSate}</button>
                        </p>
                    </div>
            </div>
            <div>
            <h2 className="forecast">{CW.WeatherText}</h2>
            </div>
            </div>
            )}
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

isFaved(_cityk){
    _cityk = this.state.cityKey;

    if((localStorage.getItem('faves') !== "") && (localStorage.getItem('faves') !== null)){
        var lsFaveArr = JSON.parse(localStorage.getItem('faves'));
    if (lsFaveArr.filter(el => el.key === _cityk).length > 0) {
        this.setState({isFavorite:true});
      }else{
        this.setState({isFavorite:false})
      }
    } else {
        var lsFaves=[];
        localStorage.setItem("faves", JSON.stringify(lsFaves));
    }

    
}  

handleFave(_city,_key,_temp,_unit,_cityText,_cityID){
    _city = this.state.searchVal;
    _key = this.state.cityKey;
    _temp = this.state.cityTemp;
    _unit = this.state.unit;
    _cityText = this.state.cityText;
    _cityID = this.state.cityID;
    var prevFaveArray = [...this.state.setFavorites];
    prevFaveArray.push({"city":_city, "key":_key, "temp":_temp, "unit":_unit, "cityText":_cityText, "cityID":_cityID});
    this.setState({ setFavorites: prevFaveArray });
    if((localStorage.getItem('faves') == "") || (localStorage.getItem('faves') == null)){
        localStorage.setItem('faves', JSON.stringify(prevFaveArray));
        this.setState({isFavorite:true});
    }else{
        var existingStore = JSON.parse(localStorage.getItem("faves"));
        existingStore.push({"city":_city, "key":_key, "temp":_temp, "unit":_unit, "cityText":_cityText,"cityID":_cityID});
        localStorage.setItem("faves", JSON.stringify(existingStore));
        this.setState({isFavorite:true});
    }
}

handleUnFave(_key){
    var lsFaveArr = JSON.parse(localStorage.getItem('faves'));
    for(let i =0; i < lsFaveArr.length; i++){
        if(lsFaveArr[i].key == _key){
            lsFaveArr.splice(i, 1);
        }
    }
    localStorage.setItem('faves', JSON.stringify(lsFaveArr));
    this.setState({isFavorite:false});
}

// fetch data
async loadCityWeather(_city){
    let devID = `I2G37YRANeCZFbAm8syetLLmqPxx28AO`;
    _city = this.state.city || 215854;
    if(_city == 215854){
        
        let r = await fetch("https://dataservice.accuweather.com/currentconditions/v1/215854?apikey=" + devID);
        let jsonCityData = await r.json();
        this.setState({searchVal:'Tel Aviv'});
        this.setState({ weather : jsonCityData });
        this.setState({unit: jsonCityData[0].Temperature.Metric.Unit}); 
        this.setState({cityTemp: jsonCityData[0].Temperature.Metric.Value});
        this.setState({cityText:jsonCityData[0].WeatherText}); 
        try{
            var res3 = await fetch("https://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=" + devID+"&metric=true");
            var jsonForecastData = await res3.json();
            this.setState({ forecast : jsonForecastData.DailyForecasts });  
        }catch(err){
            alert("An Error occurred, try again");
            return;
        }
        this.isFaved();
    }else{
        try {
            var res = await fetch("https://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + devID + "&q=" + _city);
          } catch(err) {
            alert("Couldn't find that location, please make sure you spelled it correctly");
            return
          }
           
            var worldCities = await res.json();
            this.setState({cityData: worldCities});
            console.log(worldCities);

            this.isFaved();
    }
}

handleCitySearch(e){
    let _name = e.target.dataset.city;
    this.setState({city:_name});

    let _city = e.target.dataset.city;
    this.setState({cityCountry:_city});

    let _state = e.target.dataset.state;
    this.setState({cityID:_state});

    let _key = e.target.id;
    this.setState({cityKey:_key});

    this.setState({searchVal: _name});
    this.loadCityWeatherSearch(_key);
}


async loadCityWeatherSearch(fcityKey){
    let devID = `I2G37YRANeCZFbAm8syetLLmqPxx28AO`;
    let cityKey = fcityKey;
debugger;
    var res2 = await fetch("https://dataservice.accuweather.com/currentconditions/v1/" + cityKey + "?apikey=" + devID);
        var jsonCityData = await res2.json();
        this.setState({ weather : jsonCityData });
        this.setState({unit: jsonCityData[0].Temperature.Metric.Unit}); 
        this.setState({cityTemp: jsonCityData[0].Temperature.Metric.Value});
        this.setState({cityText:jsonCityData[0].WeatherText}); 
        try{
            var res3 = await fetch("https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + cityKey + "?apikey=" + devID+"&metric=true");
            var jsonForecastData = await res3.json();
            this.setState({ forecast : jsonForecastData.DailyForecasts });  
        }catch(err){
            alert("An Error occurred, try again");
            return;
        }
        this.isFaved();
}



async loadWeatherHERE(city) {
    city = this.state.city;

    let APIkey = `I2G37YRANeCZFbAm8syetLLmqPxx28AO`;
    let ____APIkey = `xL54tACtYJDR4TsFpdD9RhC5LP3fPcTY`;

    let APIkey999 = `0ihABqFzGmWUxk3dPNte1yR0zB12eGXj`;
    let _APIkey = `999`
    let APIkey0000 = `xh0EYFPmBRXURYY0907zmpO4uN3Jtbwj`;
    let ___b_APIkey = `vuyBU7N4Uz4AU5LytqXRWOgnSwYJTnVQ`;
    let ___APIkey = ` HAAYazNoZw7lJ6GX2H5EnD8r0yH8j7Ob `;

    let SENTAPIkey = `xxuft4RpVBzDuGgZnwOyp2jBAJw5DmCi`;
    let NOWNOWAPIkey = `fpziVmcfHSFtFmX8UGVPwgkAb5nJe0rM`;

    try {
        var res = await fetch("https://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + APIkey + "&q=" + city);
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
        var res2 = await fetch("https://dataservice.accuweather.com/currentconditions/v1/" + cityKey + "?apikey=" + APIkey);
        var jsonCityData = await res2.json();
        this.setState({ weather : jsonCityData });
        this.setState({unit: jsonCityData[0].Temperature.Metric.Unit}); 
        this.setState({cityTemp: jsonCityData[0].Temperature.Metric.Value});
        this.setState({cityText:jsonCityData[0].WeatherText}); 
        try{
            var res3 = await fetch("https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + cityKey + "?apikey=" + APIkey+"&metric=true");
            var jsonForecastData = await res3.json();
            this.setState({ forecast : jsonForecastData.DailyForecasts });  
        }catch(err){
            alert("An Error occurred, try again");
            return;
        }
        this.isFaved();
    }

}

export default Weather;

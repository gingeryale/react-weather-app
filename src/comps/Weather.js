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
        isFavorite: false
    }

    componentDidMount() {
        this.loadWeather();
    }

    render() {
        let fn = this.state.weather.map(val =>
        val.WeatherIcon = ("0" + val.WeatherIcon).slice(-2));
        let faveSate = this.state.isFavorite;
        let heartClass = this.state.isFavorite;
        faveSate ? faveSate=(<div onClick={this.handleUnFave.bind(this, this.state.city)}>REMOVE FAVE</div>) : faveSate=(<div onClick={this.handleFave.bind(this, this.state.city)}>ADD FAVE</div>);
        heartClass ? heartClass=("rheart") : heartClass=("gheart");
        return (
        <div>
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
                        <img src={`https://developer.accuweather.com/sites/default/files/${fn}-s.png`} 
                        width="75px" height="45px" alt="img"/>
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

isFaved(ccity){
    ccity = this.state.searchVal;

    if((localStorage.getItem('faves') !== "") && (localStorage.getItem('faves') !== null)){
        var lsFaveArr = JSON.parse(localStorage.getItem('faves'));
    if (lsFaveArr.filter(el => el.city === ccity).length > 0) {
        this.setState({isFavorite:true});
      }else{
        this.setState({isFavorite:false})
      }
    } else {
        var lsFaves=[];
        localStorage.setItem("faves", JSON.stringify(lsFaves));
    }

    
}  

handleFave(city, key, temp, unit, cityText){
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
        this.setState({isFavorite:true});
    }else{
        var existingStore = JSON.parse(localStorage.getItem("faves"));
        existingStore.push({"city":city, "key":key, "temp": temp, "unit": unit, "cityText":cityText});
        localStorage.setItem("faves", JSON.stringify(existingStore));
        this.setState({isFavorite:true});
    }
}
handleUnFave(ccity){
    console.log('unfave');
    var lsFaveArr = JSON.parse(localStorage.getItem('faves'));
    for(let i =0; i < lsFaveArr.length; i++){
        if(lsFaveArr[i].city == ccity){
            lsFaveArr.splice(i, 1);
        }
    }
    localStorage.setItem('faves', JSON.stringify(lsFaveArr));
    this.setState({isFavorite:false});
}

// fetch data
async loadWeather(city) {
    city = this.state.city;
    let APIkey = `fpziVmcfHSFtFmX8UGVPwgkAb5nJe0rM`;

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

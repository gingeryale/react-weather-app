import React, {Component} from 'react';
import '../App.css';
import Card from './Card';

let ls_Faves = localStorage.getItem('Favorites').split(',');

class Favorites extends Component{
    
    state={
        getFavorites: ls_Faves
    }

    componentDidMount(){
        //this.loadWeather();
    }

    render(){
        return(
            <div className="faves">
                 {this.state.getFavorites.map((f, i) => 
            <Card  key={i} city={f}/>
            )}
            </div>
        )
    }



    // fetch data
async loadWeather(city) {
    city = this.state.city;
    let _WWWAPIkey = `I2G37YRANeCZFbAm8syetLLmqPxx28AO`;
    let _APIkey = `xL54tACtYJDR4TsFpdD9RhC5LP3fPcTY`;
    let APIkey = `FziO8d54IiCnnCTSk4IWhKvfvRe6fnMa`;
    try {
        var r = await fetch("http://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + APIkey + "&q=" + city);
      } catch(err) {
        alert("Couldn't find that location, please make sure you spelled it correctly");
      }
        var jsonDATA = await r.json();
        try {
        var cityKey = jsonDATA[0].Key;
        var res2 = await fetch("http://dataservice.accuweather.com/currentconditions/v1/" + cityKey + "?apikey=" + APIkey);
        var jsonCityData = await res2.json();
        this.setState({ weather : jsonCityData });
        }catch(err){
            alert("Couldn't find that location, please make sure you spelled it correctly");
        }

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

export default Favorites;
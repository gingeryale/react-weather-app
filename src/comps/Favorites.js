import React, {Component} from 'react';
import '../App.css';
import Card from './Card';

if(localStorage.getItem('faves') !== null){
    var lsFaves = JSON.parse(localStorage.getItem('faves'));
} else {
    localStorage.setItem('faves', []);
}

let stateFaves = [...new Set(lsFaves.map(el => el.city))]


console.log(stateFaves);

class Favorites extends Component{
    
    state={
        getFavorites: stateFaves
        
    }

    componentDidMount(){
        //this.loadWeather();
        this.localStorageHandle();
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

    localStorageHandle(){
        let store = localStorage.getItem('city');
        if(store == null){
            localStorage.setItem('Favorites', []);
            
            }
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
    }


}

export default Favorites;
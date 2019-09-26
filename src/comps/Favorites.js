import React, {Component} from 'react';
import '../App.css';
import Card from './Card';

if((localStorage.getItem('faves') !== "") && (localStorage.getItem('faves') !== null)){
    var lsFaves = JSON.parse(localStorage.getItem('faves'));
    // var stateFaves = [...new Set(lsFaves.map(el => el.city))];
} else {
    var lsFaves=[""];
    localStorage.setItem("faves", JSON.stringify(lsFaves));
}


function reduceArray(arr, comp) {
    const singleVal = arr.map(e => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => arr[e]).map(e => arr[e]);
     return singleVal;
  }
  
  var finalArray = reduceArray(lsFaves,'city');




class Favorites extends Component{

    state={
        getFavorites: finalArray,
        WeatherUpdate:[]
        
    }

    componentDidMount(){
        //this.loadWeather();
        const getFavorites = JSON.parse( localStorage.getItem( "faves" ) );
        this.setState( { getFavorites } );
    }

    render(){

        let message;
        this.state.getFavorites.length !== 0 ? 
        message = (<h5 className="display-4 text-center">Your list of favorites</h5>) : 
        message = (<h5 className="display-4 text-center">You have zero favorites, start adding some!</h5>);

        return(
            <div>
                <div>{message}</div>
                <div className="faves">
               {this.state.getFavorites.map((f, i) => 
                <Card 
                    key={i} 
                    city={f.city} 
                    unit={f.unit}
                    condition={f.cityText}
                    temp={f.temp}
                     />
                )}
            </div>
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
updater(arrayOfKeys){
    let APIkey = `123`;
    arrayOfKeys=[1,2];
    for(let i=0;i<arrayOfKeys.length; i++) {
        fetch('https://wind-bow.glitch.me/twitch-api/users/' + arrayOfKeys[i] + APIkey)
        .then(res => {
        if(res.ok) return res.json();
        throw new Error(res.statusText);
        })
        .then(function handleData(data) {
        this.setState({WeatherUpdate: data})
        })
        .catch(function handleError(error) {
        alert(error);
        });
    }
}
async loadWeather(city) {
    city = '';
    let cityKey = '';
   
    let GOODAPIkey = `vuyBU7N4Uz4AU5LytqXRWOgnSwYJTnVQ`;
    let APIkey = ` HAAYazNoZw7lJ6GX2H5EnD8r0yH8j7Ob `;
    // try {
    //     var r = await fetch("http://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + APIkey + "&q=" + city);
    //   } catch(err) {
    //     alert("Couldn't find that location, please make sure you spelled it correctly");
    //   }
        // var jsonDATA = await r.json();
        try {
        // var cityKey = jsonDATA[0].Key;
        var res2 = await fetch("http://dataservice.accuweather.com/currentconditions/v1/" + cityKey + "?apikey=" + APIkey);
        var jsonCityData = await res2.json();
        this.setState({ weather : jsonCityData });
        }catch(err){
            alert("Couldn't find that location, please make sure you spelled it correctly");
        }
    }


}

export default Favorites;
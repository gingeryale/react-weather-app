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
        getFavorites: finalArray  
    }

    componentDidMount(){
        //this.loadWeather();
        const getFavorites = JSON.parse( localStorage.getItem( "faves" ) );
        this.setState( { getFavorites } );
        //this.updateData();
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


    async updateData() { 
    let APIkey = `0ihABqFzGmWUxk3dPNte1yR0zB12eGXj`;
    let thisState = this;
    /////////////////////// changed from localStore to finalArray
    let keyarr = finalArray;
    for(let i=0;i<keyarr.length; i++) {
        await fetch('https://dataservice.accuweather.com/currentconditions/v1/' + keyarr[i].key + "?apikey=" + APIkey)
        .then(res => {
        if(res.ok) return res.json();
        throw new Error(res.statusText);
        })
        .then(function handleData(data) {
          keyarr[i].cityText = data[0].WeatherText
          keyarr[i].temp = data[0].Temperature.Metric.Value;
        })
        .catch(function handleError(error) {
        alert(error);
        });
    }
    thisState.setState({getFavorites: keyarr})
}

}

export default Favorites;
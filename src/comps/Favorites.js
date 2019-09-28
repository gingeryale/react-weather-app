import React, {Component} from 'react';
import '../App.css';
import Card from './Card';

if((localStorage.getItem('faves') !== "") && (localStorage.getItem('faves') !== null)){
    var lsFaves = JSON.parse(localStorage.getItem('faves'));
} else {
    var lsFaves=[];
    localStorage.setItem("faves", JSON.stringify(lsFaves));
}


class Favorites extends Component{

    state={
        getFavorites: lsFaves  
    }

    componentDidMount(){
        const getFavorites = JSON.parse( localStorage.getItem( "faves" ) );
        this.setState( { getFavorites } );
        this.updateData();
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
                    key={f.key} 
                    city={f.city} 
                    unit={f.unit}
                    condition={f.cityText}
                    temp={f.temp}
                    locKey = {f.key}
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
    let appID = `xL54tACtYJDR4TsFpdD9RhC5LP3fPcTY`;
    let thisState = this;
    let keyarr = JSON.parse(localStorage.getItem('faves'));
    for(let i=0;i<keyarr.length; i++) {
        await fetch('https://dataservice.accuweather.com/currentconditions/v1/' + keyarr[i].key + "?apikey=" + appID)
        .then(res => {
        if(res.ok) return res.json();
        throw new Error(res.statusText);
        })
        .then(function handleData(data) {
          keyarr[i].cityText = data[0].WeatherText;
          keyarr[i].temp = data[0].Temperature.Metric.Value;
        })
        .catch(function handleError(error) {
        alert(error);
        });
    }
    thisState.setState({getFavorites: keyarr});
}

}

export default Favorites;
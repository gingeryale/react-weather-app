import React from 'react';
import Forecast from './Forecast';
import Weather from './Weather';


class Home extends React.Component{
    render(){
        return(
            <main className="weatherForm">
                <Weather />
                <Forecast />
            </main>
        );
    }
}

export default Home;
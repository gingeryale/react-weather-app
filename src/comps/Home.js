import React from 'react';
import Weather from './Weather';


class Home extends React.Component{
    render(){
        return(
            <main className="weatherForm">
                <Weather />
            </main>
        );
    }
}

export default Home;
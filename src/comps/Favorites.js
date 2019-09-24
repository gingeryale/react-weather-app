import React from 'react';
import '../App.css';
import Card from './Card';

class Favorites extends React.Component{
    render(){
        return(
            <div className="faves">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />

            </div>
        )
    }
}

export default Favorites;
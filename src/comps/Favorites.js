import React from 'react';
import '../App.css';
import Card from './Card';

class Favorites extends React.Component{
    render(){
        return(
            <div>
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
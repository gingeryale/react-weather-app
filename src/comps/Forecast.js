import React from 'react';
import '../App.css';
import Card from './Card';


class Forecast extends React.Component {
    render() {
      return (
       <div>
<h2 className="forecast">Scattered Showers</h2>
 <div className="wrapper">
       <Card />
       <Card />
       <Card />
       <Card />
       <Card />
</div>
</div>
      );
    }
  }
  
  export default Forecast;
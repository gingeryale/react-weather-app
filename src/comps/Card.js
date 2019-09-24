import React, {Component} from 'react';
import moment from 'moment';

class Card extends React.Component {
  render(){
    let date = this.props.day;
     return(
<div className="card weather">
  <div className="card-body">
    <h5>{moment.unix(date).format('ddd')}</h5>
    <p className="card-text">{this.props.temp}&deg; {this.props.unit}</p>
  </div>
</div>
    );
   
    
  }

   
}
    


export default Card;
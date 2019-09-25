import React, {Component} from 'react';
import moment from 'moment';

class Card extends React.Component {
  render(){
    let date = this.props.day;
    let header;
    this.props.day ? 
      header = (<h5>{moment.unix(date).format('ddd')}</h5>) : 
      header = (<h5>{this.props.city}</h5>);
    let condition;
    this.props.condition ?  condition = (<h5>{this.props.condition}</h5>) : condition = (null);
    let remove;
    this.props.condition ?  remove = (<div><button className="btn-sm btn btn-outline-danger">x</button></div>) : condition = (null);
     return(
<div className="card weather">
  <div className="card-body">
    {header}
    <p className="card-text">{this.props.temp}&deg; {this.props.unit}</p>
    {condition}
    {remove}
  </div>
</div>
    );
   
    
  }

   
}
    


export default Card;
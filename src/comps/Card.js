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
    this.props.condition ?  remove = (<div><button className={this.props.city} onClick={this.removeMe.bind(this)} className="btn-sm btn btn-outline-danger">x</button></div>) : condition = (null);
     return(
<section className="card weather" data={this.props.city}>
  <div className="card-body">
    {header}
    <p className="card-text">{this.props.temp}&deg; {this.props.unit}</p>
    {condition}
    {remove}
  </div>
</section>
    );
   
    
  }

  removeMe(e){
    console.log(e);
    
    var ccity = this.props.city;
    var farray = JSON.parse(localStorage.getItem("faves"));
    console.log("aa", farray);
    for (var i =0; i< farray.length; i++) {
    var elm = farray[i];
      if (elm.city === ccity) {
      farray.splice(i, 1);
      } else {
        console.log(farray);
      }
}
let strinArra = JSON.stringify(farray);
localStorage.setItem("faves", strinArra);

const delDomItem = e.target.closest('section');
delDomItem.remove();

  }
}
    


export default Card;
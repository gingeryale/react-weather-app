<<<<<<< HEAD
import React from 'react';
=======
import React, { Component } from 'react';
>>>>>>> 859ff9cdaa8d66cca2b92bcfbc7f78a6becd4e0e
import moment from 'moment';

class Card extends React.Component {
  render() {
    let date = this.props.day;
    let header;
    this.props.day ?
      header = (<h5>{moment.unix(date).format('ddd')}</h5>) :
      header = (<h4>{this.props.city}</h4>);
    let condition;
    this.props.condition ? condition = (<h5>{this.props.condition}</h5>) : condition = (null);
    let favePage;
    this.props.condition ? favePage = ("card weather") : favePage = ("card");
    let removeBTN;
<<<<<<< HEAD
    this.props.condition ?  
    removeBTN = (<div><button onClick={this.removeMe.bind(this)} className="btn-sm btn btn-outline-danger">x</button></div>) :
    removeBTN = (null);
    let location;
    this.props.locKey ? location=(<span>{this.props.cityDetail}</span>) : location=(null);
     return(
<section className="card weather" data={this.props.city}>
  <div className="card-body">
    {header}
    {location}
    <p className="card-text">{this.props.temp}&deg;</p>
    {condition}
    {removeBTN}
  </div>
</section>
    );
  }

  removeMe(e){  
    var _key = this.props.locKey;
    var farray = JSON.parse(localStorage.getItem("faves"));
    for (var i =0; i< farray.length; i++) {
    var elm = farray[i];
      if (elm.key === _key) {
      farray.splice(i, 1);
=======
    this.props.condition ? removeBTN = (<div><button className={this.props.city} onClick={this.removeMe.bind(this)} className="btn-sm btn btn-outline-danger">x</button></div>) : removeBTN = (null);
    return (
      <section className={favePage} data={this.props.city}>
        <div className="card-body">
          {header}
          <p className="card-text">{this.props.temp}&deg; {this.props.unit}</p>
          {condition}
          {removeBTN}
        </div>
      </section>
    );


  }

  removeMe(e) {
    console.log(e);

    var ccity = this.props.city;
    var farray = JSON.parse(localStorage.getItem("faves"));
    console.log("aa", farray);
    for (var i = 0; i < farray.length; i++) {
      var elm = farray[i];
      if (elm.city === ccity) {
        farray.splice(i, 1);
      } else {
        console.log(farray);
>>>>>>> 859ff9cdaa8d66cca2b92bcfbc7f78a6becd4e0e
      }
    }
    let strinArra = JSON.stringify(farray);
    localStorage.setItem("faves", strinArra);

    const delDomItem = e.target.closest('section');
    delDomItem.remove();

  }
}



export default Card;
import React from 'react';
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
    let removeBTN;
    this.props.condition ?
      removeBTN = (<div><button onClick={this.removeMe.bind(this)} className="btn-sm btn btn-outline-danger">x</button></div>) :
      removeBTN = (null);
    let location;
    this.props.locKey ? location = (<span>{this.props.cityDetail}</span>) : location = (null);
    let cardCSS;
    this.props.city ? cardCSS = ("card fave") : cardCSS = ("card weather")
    return (
      <section className={cardCSS} data={this.props.city}>
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

  removeMe(e) {
    let _key = this.props.locKey;
    let farray = JSON.parse(localStorage.getItem("faves"));
    for (var i = 0; i < farray.length; i++) {
      let elm = farray[i];
      if (elm.key === _key) {
        farray.splice(i, 1);
      }
    }
    let strinArra = JSON.stringify(farray);
    localStorage.setItem("faves", strinArra);

    const delDomItem = e.target.closest('section');
    delDomItem.remove();

  }
}



export default Card;
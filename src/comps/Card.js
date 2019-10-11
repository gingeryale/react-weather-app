import React from 'react';
import moment from 'moment';

class Card extends React.Component {
  render() {
    let { day } = this.props;
    let header;
    this.props.day ?
      header = (<h5>{moment.unix(day).format('ddd')}</h5>) :
      header = (<h4>{this.props.city}</h4>);
    let { condition } = this.props;
    condition ? condition = (<h5>{this.props.condition}</h5>) : condition = (null);
    let removeBTN;
    this.props.condition ?
      removeBTN = (<div><button onClick={this.removeMe.bind(this)} className="btn-sm btn btn-outline-danger">x</button></div>) :
      removeBTN = (null);
    let { locKey } = this.props;
    locKey ? locKey = (<span>{this.props.cityDetail}</span>) : locKey = (null);
    let cardCSS;
    this.props.city ? cardCSS = ("card fave") : cardCSS = ("card weather");
    let weatherData;
    this.props.tempL ? weatherData = (<p className="card-text">{this.props.tempL} - {this.props.tempH}&deg; {this.props.unit}</p>
    ) : weatherData = (<p className="card-text">{this.props.temp}&deg; {this.props.unit}</p>
    )
    return (
      <section className={cardCSS} data={this.props.city}>
        <div className="card-body">
          {header}
          {locKey}
          {weatherData}
          {condition}
          {removeBTN}
        </div>
      </section>
    );
  }

  removeMe(e) {
    let { locKey } = this.props;
    let farray = JSON.parse(localStorage.getItem("faves"));
    for (var i = 0; i < farray.length; i++) {
      let elm = farray[i];
      if (elm.key === locKey) {
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
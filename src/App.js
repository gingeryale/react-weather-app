import React from 'react';
import './App.css';
import Footer from './comps/Footer';
import AppRouter from './comps/RouterComp';


class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
         <AppRouter />
      <Footer />
      </div>
    );
  }
}

export default App;

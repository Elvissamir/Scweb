import { Component } from 'react';
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Router from './components/Router';

class App extends Component { 
  render() {
    return (
      <div className="App">
        <div className='app-container'>
          <div className='app-nav'>
            <Nav />
          </div>
          <div className='app-content'>
            <Router />
          </div>
          <div className='app-footer'>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
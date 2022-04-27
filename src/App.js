import { Component } from 'react';
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Router from './components/Router';
import { findCategories } from './services/http/ProductListing/ProductListingPage'
import { Provider } from 'react-redux';

class App extends Component { 

  async componentDidMount() {
   
  }

  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default App;
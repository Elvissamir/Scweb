import { Component } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './services/http/apolloClient'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Router from './components/Router';

class App extends Component { 
  render() {
    return (
      <div className="App">
        <ApolloProvider client={client}>
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
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
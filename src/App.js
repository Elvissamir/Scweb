import { Component } from 'react';
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Router from './components/Router';
import { findCategories } from './services/http/ProductListing/ProductListingPage'

class App extends Component { 
  
  async componentDidMount() {
    const result = await findCategories()
    if (!result.error) {
        const categories = result.categories.map(category => category.name.toUpperCase())
        this.setState({ categories, hasData: true, loading: false, activeCategory: categories[0] })
    }
    else {
        this.setState({ error:true, loading: false })
    }
  }

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
import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Product from './components/products/Product';
import ProductPage from './components/products/ProductPage';
import NotFound from './components/NotFound';

class App extends Component { 
    render() {
        return (
          <div className="App">
            <div className='app-container'>
              <div className='app-nav'>
                  < Nav />
              </div>
      
              <div className='app-content'>
                  <Routes>
                      <Route path='/' element={ <ProductPage /> } />
                      <Route path='/products/product' element={<Product />} />
                      <Route path='*' element={ <NotFound /> } />
                  </Routes>
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
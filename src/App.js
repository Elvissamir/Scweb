import { Component } from 'react';
import { ApolloProvider, ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { Route, Routes } from 'react-router-dom';
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Product from './components/products/Product';
import ProductPage from './views/ProductPage';
import NotFound from './components/NotFound';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_SERVER_URI,
  cache: new InMemoryCache()
})

const product_query = gql`
  query fetchCategories {
    categories {
      name
    }
  }
`

class App extends Component { 
    render() {
        return (
          <ApolloProvider client={client}>   
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
          </ApolloProvider>
        );
    }
}

export default App;
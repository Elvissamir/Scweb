import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav'
import Footer from './components/Footer.jsx'
import Product from './components/Product';
import ProductPage from './components/ProductPage';
import NotFound from './components/NotFound';

function App() { 
  return (
    <div className="App">
      <div className='app-container'>
        <div className='app-nav'>
            < Nav />
        </div>

        <div className='app-content'>
            <Routes>
                <Route path='/' element={ <ProductPage /> } />
                <Route path='/movies/:id' element={<Product />} />
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

export default App;
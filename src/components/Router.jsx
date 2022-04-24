import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductListingPage from '../views/ProductListingPage';
import NotFound from '../views/NotFoundPage';

class Router extends Component {
    render () {
        return (
            <Routes>
                <Route path='/' element={ <ProductListingPage /> } />
                <Route path='*' element={ <NotFound /> } />
            </Routes>
        )
    }
}

export default Router
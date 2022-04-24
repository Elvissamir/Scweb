import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductPage from '../views/ProductPage';
import NotFound from '../views/NotFound';

class Router extends Component {
    render () {
        return (
            <Routes>
                <Route path='/' element={ <ProductPage /> } />
                <Route path='*' element={ <NotFound /> } />
            </Routes>
        )
    }
}

export default Router
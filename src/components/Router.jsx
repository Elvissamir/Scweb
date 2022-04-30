import { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProductListingPage from '../views/ProductListingPage';
import NotFound from '../views/NotFoundPage';
import routes from '../routes';

class Router extends Component {
    render () {
        return (
            <Routes>
                <Route path='/' element={<Navigate to={`${routes.categories}/all`} replace />}/>
                <Route path={`${routes.categories}/:category`} element={ <ProductListingPage /> } />
                <Route path='*' element={ <NotFound /> } />
            </Routes>
        )
    }
}

export default Router
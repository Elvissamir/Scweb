import React, { Component } from 'react';
import routes from '../routes';
import { Link } from 'react-router-dom';
import selectPriceToShow from '../utils/selectPriceToShow';

class ProductList extends Component {
    render() { 
        return (
            <div>
                {this.props.products.map(product =>
                    <div key={product.id} className='plp-product-wrapper'>
                        <div className={product.inStock? 'hide': 'plp-out-of-stock'}>
                            <p>OUT OF STOCK</p>
                        </div>
                        <div className='plp-product'>
                            <div className='plp-product-image-wrapper'>
                                <img className='plp-main-product-image' src={product.gallery[0]} alt="" />
                            </div>
                            <div className='plp-product-info'>
                                <div className='plp-shopping-btn-wrapper'>
                                    <button onClick={() => this.handleAddToCart(product)} className={product.inStock? 'plp-shopping-btn':'hide'}>
                                        <img src="/imgs/shopping-white.svg" alt="" />
                                    </button>
                                </div>
                                <Link id={product.id} className='plp-product-title' to={routes.getProductRoute(product.id)}>
                                    {product.brand + " " + product.name}
                                </Link>  
                                <p className='plp-product-price'>{selectPriceToShow(product.prices, this.props.activeCurrency)}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
 
export default ProductList;
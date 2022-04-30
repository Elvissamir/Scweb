import React, { Component } from 'react';
import routes from '../routes';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { findProductsByCategory } from '../services/http/ProductListing/ProductListingPage';

class ProductListingPage extends Component {
    state = { 
        loading: true,
        hasData: false,
        error: false,
        products: []
    }

    async componentDidMount() {
        await this.fetchProducts()
    }

   async componentDidUpdate(prevProps) {
        if (prevProps.activeCategory !== this.props.activeCategory)
            await this.fetchProducts()
   }

    fetchProducts = async () => {
        const result = await findProductsByCategory(this.props.activeCategory)
        if (!result.error) {
            const { products } = result.category
            this.setState({ products })
            this.setState({ hasData: true })
        }
    }

    handleCategoryChange = ({ target }) => {
        this.setState({ activeCategory: target.textContent })
    }

    selectPriceToShow = prices => {
        const price = prices.find(price => price.currency.symbol === this.props.activeCurrency)
        return <p className='plp-product-price'>{price.currency.symbol + price.amount}</p>
    }

    renderBlock() {
        if (!this.state.error) {
            if (!this.state.hasData)
                return this.renderNoDataBlock()
            return this.renderContent()
        }

        return this.renderErrorBlock()
    }

    renderContent() {
        return (
            <>
                <div className='category-title'>
                    <p >{ this.props.activeCategory.toUpperCase() }</p>
                </div>
                <div className='plp-products-container'>
                    {this.state.products.map(product =>
                        <div key={product.id} className='plp-product-wrapper'>
                            <div className='plp-product'>
                                <div className='plp-product-image-wrapper'>
                                    <img className='plp-main-product-image' src={product.gallery[0]} alt="" />
                                </div>
                                <div className='plp-product-info'>
                                    <div className='plp-shopping-btn-wrapper'>
                                        <Link className='plp-shopping-btn' to={routes.product+product.id}>
                                            <img src="/imgs/shopping-white.svg" alt="" />
                                        </Link>
                                    </div>
                                    <p id={product.id} className='plp-product-title'>
                                        {product.brand + " " + product.name}
                                    </p>  
                                    {this.selectPriceToShow(product.prices)}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </>
        )
    }

    renderNoDataBlock() {
        return <div>There are no items to show at the moment.</div>
    }

    renderErrorBlock() {
        return <div>Something happened. Try again in a few minutes.</div>
    }

    render() { 
        return (
            <div className='content-wrapper'>
                { this.renderBlock() }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    activeCategory: state.category.activeCategory,
    activeCurrency: state.currency.activeCurrency
})

export default connect(mapStateToProps)(ProductListingPage);
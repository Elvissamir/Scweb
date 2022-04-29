import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findProductsByCategory } from '../services/http/ProductListing/ProductListingPage';

class ProductListingPage extends Component {
    state = { 
        loading: true,
        hasData: false,
        error: false,
        products: []
    }

    async componentDidMount() {
        const result = await findProductsByCategory()
        if (!result.error) {
            console.log(result)
            const { products } = result.category
            this.setState({ products })
            this.setState({ hasData: true })
            console.log(products)
        }
    }

    handleCategoryChange = ({ target }) => {
        this.setState({ activeCategory: target.textContent })
    }

    selectPriceToShow = prices => {
        const result = prices.filter(price => price.currency.symbol === this.props.activeCurrency)
        const data = result[0]
        return <p>{data.currency.symbol + data.amount}</p>
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
                <div className='products-container'>
                    {this.state.products.map(product =>
                        <div key={product.id} className='product-wrapper'>
                            <div className='product'>
                                <p id={product.id} className='product-title'>
                                    {product.brand + " " + product.name}
                                </p>  
                                {this.selectPriceToShow(product.prices)}
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
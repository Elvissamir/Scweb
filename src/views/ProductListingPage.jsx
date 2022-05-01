import React, { Component } from 'react';
import routes from '../routes';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { findProductsByCategory } from '../services/http/ProductListing/ProductListingPage';
import { addCartProduct } from '../store/features/cart/cartSlice';
import { activateModal } from '../store/features/modal/modalSlice';

class ProductListingPage extends Component {
    state = { 
        loading: true,
        hasData: false,
        error: false,
        showProductWindow: true,
        currentProduct: {},
        products: []
    }

    async componentDidMount() {
        await this.fetchProducts()
        console.log(this.state.products)
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

    showProductMenu = product => {
        this.props.activateModal({ active: true })
        this.setState({ currentProduct: product, showProductWindow: true })
    }

    closeProductMenu = () => {
        this.props.activateModal({ active: false })
        this.setState({ showProductWindow: false })
    }

    shouldAddToCart = product => {
        if (product.attributes.length === 0)
            this.handleAddToCart(product)
        else
            this.showProductMenu(product)
    }

    handleAddToCart = product => {
        this.props.addCartProduct({ product })
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
                <div className='plp-popup-wrapper'>
                    <div className={this.state.showProductWindow? 'plp-popup':'hide'}>
                        <div className='plp-popup-top'>
                            <p className='plp-popup-title'>{this.state.currentProduct.brand + " - " + this.state.currentProduct.name}</p>
                            <button onClick={this.closeProductMenu} className='plp-popup-close-btn'>X</button>
                        </div>
                    </div>
                </div>
                <div className='category-title'>
                    <p >{ this.props.activeCategory.toUpperCase() }</p>
                </div>
                <div className='plp-products-container'>
                    {this.state.products.map(product =>
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
                                        <button onClick={() => this.shouldAddToCart(product)} className={product.inStock? 'plp-shopping-btn':'hide'}>
                                            <img src="/imgs/shopping-white.svg" alt="" />
                                        </button>
                                    </div>
                                    <Link id={product.id} className='plp-product-title' to={routes.getProductRoute(product.id)}>
                                        {product.brand + " " + product.name}
                                    </Link>  
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
    activeCurrency: state.currency.activeCurrency,
    cart: state.cart.products,
    showModal: state.modal.activeModal
})

const mapDispatchToProps = dispatch => ({
    addCartProduct: (payload) => dispatch(addCartProduct(payload)),
    activateModal: (payload) => dispatch(activateModal(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingPage);
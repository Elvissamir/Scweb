import React, { Component } from 'react';
import routes from '../routes';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { findProductsByCategory } from '../services/http/ProductListing/ProductListingPage';
import { addCartProduct } from '../store/features/cart/cartSlice';
import { activateModal } from '../store/features/modal/modalSlice';
import ProductPopup from '../components/ProductPopup';
import ErrorBlock from '../components/ErrorBlock';
import NoDataBlock from '../components/NoDataBlock';

class ProductListingPage extends Component {
    state = { 
        loading: true,
        hasData: false,
        error: false,
        showProductWindow: false,
        currentProduct: {},
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
        else 
            this.setState({ hasData: false, error: true })
    }

    showProductMenu = product => {
        this.props.activateModal({ active: true })

        if (product.id !== this.state.currentProduct.id)
            this.setState({ currentProduct: product, showProductWindow: true })
        else 
            this.setState({ showProductWindow: true })
    }

    closeProductPopup = () => {
        this.props.activateModal({ active: false })
        this.setState({ showProductWindow: false })
    }

    addAttributeValue = (attributeName, value) => e => {
        console.log('the attribute name', attributeName)
        console.log('the attribute value', value)
        const product = {...this.state.currentProduct}

        if (product.options)
            product.options[attributeName] = value
        else 
            product.options = { [attributeName]: value }
        this.setState({ currentProduct: product })
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

    renderPopup = () => {
        if (this.state.currentProduct && this.state.showProductWindow) {
            return <ProductPopup 
                        currentProduct={this.state.currentProduct}
                        onClose={this.closeProductPopup}
                        onSelectAttributeOption={this.addAttributeValue}
                        showProductWindow={this.state.showProductWindow} />
        }
    }

    renderBlock() {
        if (!this.state.error) {
            if (!this.state.hasData)
                return <NoDataBlock />
            return this.renderContent()
        }

        return <ErrorBlock />
    }

    renderContent() {
        return (
            <>  
                <div className='plp-popup-wrapper'>
                    { this.renderPopup() }
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
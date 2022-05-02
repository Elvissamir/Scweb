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
    }

    handleCategoryChange = ({ target }) => {
        this.setState({ activeCategory: target.textContent })
    }

    showProductMenu = product => {
        this.props.activateModal({ active: true })

        if (product.id !== this.state.currentProduct.id)
            this.setState({ currentProduct: product, showProductWindow: true })
        else this.setState({ showProductWindow: true })
    }

    closeProductMenu = () => {
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

    selectAttributeOptionCss = (attribute, option, productOptions) => {
        const baseCss = 'attribute-option'
        const swatchCss = 'option-swatch'
        const textCss = 'option-text'

        const attributeCss = attribute.type === 'text'? `${baseCss} ${textCss}` : `${baseCss} ${swatchCss}`

        if (productOptions && productOptions[attribute.name] === option.value)
            return (attribute.type === 'text'? attributeCss + ' attribute-selected-text': attributeCss + ' attribute-selected-swatch')
        else 
            return attributeCss
    }

    renderAttributeOptions = (attribute, productOptions) => {
        console.log('attribute', attribute)
        console.log('options', productOptions)

        return (
            <div className='attribute-options-wrapper'>
                {attribute.items.map(option => 
                    <button 
                        onClick={this.addAttributeValue(attribute.name, option.value)}
                        key={option.value} 
                        className={this.selectAttributeOptionCss(attribute, option, productOptions)}
                        style={attribute.type === 'swatch'? {backgroundColor: option.value} : {}}>
                            {attribute.type !== 'swatch' && option.value}
                    </button>
                )}
            </div>
        )
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
            return (
                <div className={this.state.showProductWindow? 'plp-popup':'hide'}>
                    <div className='plp-popup-top'>
                        <button onClick={this.closeProductMenu} className='plp-popup-close-btn'>X</button>
                    </div>
                    <div className='plp-popup-content'>
                        <div className='plp-popup-img-wrapper'>
                            <img className='plp-popup-img' src={this.state.currentProduct.gallery[0]} alt="" />
                        </div>
                        <div className='plp-popup-details'>
                            <p className='plp-popup-title'>{this.state.currentProduct.brand + " - " + this.state.currentProduct.name}</p>
                            <div>
                                {this.state.currentProduct && this.state.currentProduct.attributes.map(attribute => 
                                    <div key={attribute.name} className='plp-popup-attribute'>
                                        <p className='attribute-name'>{attribute.name.toUpperCase()}:</p>
                                        <div>
                                            { this.renderAttributeOptions(attribute, this.state.currentProduct.options) }
                                        </div>
                                    </div>    
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
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
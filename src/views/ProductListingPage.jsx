import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findProductsByCategory } from '../services/http/ProductListing/ProductListingPage';
import { addCartProduct } from '../store/features/cart/cartSlice';
import { activateModal } from '../store/features/modal/modalSlice';
import shouldAddToCart from '../validation/Product/AddProductToCart';
import ProductPopup from '../components/ProductPopup';
import ErrorBlock from '../components/ErrorBlock';
import NoDataBlock from '../components/NoDataBlock';
import ProductList from '../components/ProductList';

class ProductListingPage extends Component {
    state = { 
        loading: true,
        hasData: false,
        error: false,
        showProductWindow: false,
        showSelectOptionsMessage: false,
        selectOptionsMessage: { attribute: null, message: null },
        currentProduct: {},
        prevProductId: null,
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

    showProductPopup = product => {
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
        const product = {...this.state.currentProduct}

        if (product.options)
            product.options[attributeName] = value
        else 
            product.options = { [attributeName]: value }

        this.setState({ currentProduct: product })
    }

    handleAddToCart = product => {
        const {valid, error} = shouldAddToCart(product)

        if (valid) {
            this.setState({ showSelectOptionsMessage: false })
            this.props.addCartProduct({ product })

            if (this.state.showProductWindow)
                this.closeProductPopup()
            this.setState({ currentProduct: {} })
        }
        else if (!valid && !this.state.showProductWindow) {
            if (product.id !== this.state.prevProductId) {
                this.setState({ 
                    showSelectOptionsMessage: false,
                    preveProductId: product.id
                })
            }
            this.showProductPopup(product)
        }
        else {
            this.setState({ showSelectOptionsMessage: true })
            this.setState({ selectOptionsMessage: { 
                attribute: error.attribute,  
                message: error.message
            } })
        }
    }

    renderPopup = () => {
        if (this.state.currentProduct && this.state.showProductWindow) {
            return <ProductPopup 
                        currentProduct={this.state.currentProduct}
                        onClose={this.closeProductPopup}
                        onAddToCart={this.handleAddToCart}
                        showSelectOptionsMessage={this.state.showSelectOptionsMessage}
                        selectOptionsMessage={this.state.selectOptionsMessage}
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
                    <ProductList 
                        products={this.state.products} 
                        activeCurrency={this.props.activeCurrency} 
                        onAddToCart={this.handleAddToCart}/>
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
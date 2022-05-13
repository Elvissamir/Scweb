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

    openProductPopup = product => {
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

    handleAddToCart = product => {
        const error = shouldAddToCart(product)
        if (error)
            return this.openProductPopup(product)
        
        return this.props.addCartProduct({ product })
    }

    renderPopup = () => {
        if (this.state.showProductWindow) {
            return <ProductPopup 
                        currentProduct={this.state.currentProduct}
                        onClose={this.closeProductPopup}
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
import React, { Component } from 'react';
import { findProductById } from '../services/http/Product/ProductPage';
import withRouter from '../components/withRouter';
import { addCartProduct } from '../store/features/cart/cartSlice';
import shouldAddToCart from '../validation/Product/AddProductToCart';
import ProductItem from '../components/ProductItem';
import { connect } from 'react-redux';

class ProductPage extends Component {
    state = {
        product: null,
        showSelectOptionsMessage: false,
        selectOptionsMessage: {attribute: null, message: null}
    }

    async componentDidMount() {
        const productId = this.props.router.params.product
        await this.fetchProduct(productId)
    }

    fetchProduct = async (id) => {
        const result = await findProductById(id)

        if (!result.error) {
            const product = {...result.product}
            product.options = {}
            return this.setState({ product })
        }

        this.setState({ error: true })
    }

    addAttributeValue = (attributeName, value) => e => {
        const product = {...this.state.product}

        if (product.options)
            product.options[attributeName] = value
        else 
            product.options = { [attributeName]: value }

        this.setState({ product })
    }

    addProductToCart = () => {
        const newCartProduct = {...this.state.product}
        this.props.addCartProduct({ product: newCartProduct })
    }

    cleanOptions = () => {
        delete this.state.product.options
    }

    cleanSelectOptionsMessage = () => {
        this.setState({ showSelectOptionsMessage: false })
        this.setState({ selectOptionsMessage: {} })
    }

    handleAddToCart = product => {
        const {valid, error} = shouldAddToCart(product)

        if (!valid) {
            return this.setState({ selectOptionsMessage: { 
                attribute: error.attribute, 
                message: error.message
            }, 
            showSelectOptionsMessage: true
            })
        }


        this.cleanSelectOptionsMessage()
        this.addProductToCart()
        this.cleanOptions()
    }

    render() { 
        return (
            <div className='product-wrapper'>
                {this.state.product && 
                    <ProductItem 
                        data={this.state.product}
                        selectOptionsMessage={this.state.selectOptionsMessage}
                        showGallery={true}
                        onSelectAttributeOption={this.addAttributeValue}
                        showSelectOptionsMessage={this.state.selectOptionsMessage}
                        onAddToCart={this.handleAddToCart} />}
            </div>
        );
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
    addCartProduct: (payload) => dispatch(addCartProduct(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductPage))
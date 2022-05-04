import React, { Component } from 'react';
import { findProductById } from '../services/http/Product/ProductPage';
import withRouter from '../components/withRouter';
import shouldAddToCart from '../validation/Product/AddProductToCart';
import ProductItem from '../components/ProductItem';

class ProductPage extends Component {
    state = {
        product: null,
        error: false
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

    render() { 
        return (
            <div className='product-wrapper'>
                {this.state.product && 
                    <ProductItem 
                        data={this.state.product}
                        selectOptionsMessage='' 
                        onSelectAttributeOption={this.addAttributeValue}
                        showSelectOptionsMessage={false}
                        onAddToCart={this.handleAddToCart} />}
            </div>
        );
    }
}

export default withRouter(ProductPage);
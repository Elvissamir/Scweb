import React, { Component } from 'react';
import { findProductById } from '../services/http/Product/ProductPage';
import withRouter from '../components/withRouter';
import { addCartItem } from '../store/features/cart/cartSlice';
import ProductItem from '../components/ProductItem';
import { connect } from 'react-redux';

class ProductPage extends Component {
    state = {
        product: null,
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

    handleAddedToCart = () => {

    }

    render() { 
        return (
            <div className='product-wrapper'>
                {this.state.product && 
                    <ProductItem 
                        data={this.state.product} 
                        onAddedToCart={this.handleAddedToCart}
                        showGallery={false} />}
            </div>
        );
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
    addCartItem: (payload) => dispatch(addCartItem(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductPage))
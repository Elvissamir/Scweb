import { Component } from 'react';
import selectPriceToShow from '../utils/selectPriceToShow';
import AttributeOptions from './AttributeOptions';

class CartItem extends Component {
    componentDidMount() {
        console.log(this.props.data)
    }

    render() { 
        return (
            <div className='cart-item'>
                <div className='cart-item-left'>
                    <p className='cart-item-brand'>{this.props.data.brand}</p>
                    <p className='cart-item-name'>{this.props.data.name}</p>
                    <p className='cart-item-price'>
                        {selectPriceToShow(this.props.data.prices, this.props.activeCurrency)}
                    </p>
                    <div className='cart-item-attributes'>
                        <AttributeOptions attribute />
                    </div>
                </div>
                <div className='cart-item-right'>
                    <div className='cart-item-controls'></div>
                    <div className='cart-item-img-wrapper'>
                        <img 
                            className='cart-item-img' 
                            src={this.props.data.gallery[0]} alt="" />
                    </div>
                </div>
            </div>
        )
    }
}
 
export default CartItem;
import { Component } from 'react';
import selectPriceToShow from '../utils/selectPriceToShow';
import AttributeList from './AttributeList';
import CartItemSlide from './CartItemSlide';

class CartItem extends Component {
    selectedItemAttribute = selectionData => {
        this.props.onSelectAttribute(this.props.data, selectionData)
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
                        <AttributeList 
                            attributes={this.props.data.attributes} 
                            productOptions={this.props.data.options}
                            onSelectAttribute={this.selectedItemAttribute} 
                            isInCart={this.props.inMenu}
                            error={{}} />
                    </div>
                </div>
                <div className={this.props.inMenu? 'cart-item-right-sm' : 'cart-item-right-lg'}>
                    <div className='cart-item-controls'>
                        <div className='cart-menu-control-btn-wrapper'>
                            <button 
                                onClick={() => this.props.onIncreaseCount(this.props.data)} 
                                className='cart-menu-control-btn'>+</button>
                        </div>
                        <div className='cart-menu-item-count'>
                            {this.props.data.count}
                        </div>
                        <div className='cart-menu-control-btn-wrapper'>
                            <button 
                                onClick={() => this.props.onDecreaseCount(this.props.data)} 
                                className='cart-menu-control-btn'>-</button>
                        </div>
                    </div>
                    <div className='cart-item-img-wrapper'>
                        <CartItemSlide 
                            inMenu={this.props.inMenu}
                            images={this.props.data.gallery}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
 
export default CartItem;
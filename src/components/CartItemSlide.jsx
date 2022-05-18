import { Component } from "react";

class CartItemSlide extends Component {
    render() { 
        return (
            <div className="cart-item-slide-wrapper">
                {this.props.images.map(image => 
                    <img 
                        key={image}
                        className='cart-item-img' 
                        src={image} alt="" />
                )}
                <div className="cart-item-slide-buttons">
                    <div className="cart-item-slide-left"> l </div>
                    <div className="cart-item-slide-right"> r </div>
                </div>
            </div>
        );
    }
}
 
export default CartItemSlide;
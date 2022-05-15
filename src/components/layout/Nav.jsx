import React, { Component } from 'react';
import { findCategoriesAndCurrencies } from '../../services/http/Nav/Nav';
import { changeCategory } from '../../store/features/category/categorySlice';
import { changeCurrency } from '../../store/features/currency/currencySlice'
import { connect } from 'react-redux';
import CurrenciesMenu from '../CurrenciesMenu';
import CategoriesMenu from '../CategoriesMenu';
import CartMenu from '../CartMenu';
import CartMenuBtn from '../CartMenuBtn';

class Nav extends Component {
    state = { 
        categories: [], 
        currencies: [],
    }
    
    async componentDidMount() {
        const result = await findCategoriesAndCurrencies()

        if (!result.error) {
            const categories = result.categories.map(category => category.name)
            const currencies = result.currencies.map(({symbol, label}) => ({ symbol, label }))
            this.setState({ categories, currencies })
        }
        else {
            console.log('error')
        }
    }

    handleCategorySelect = ({ target }) => {
        if (target.id !== this.props.activeCategory)
            this.props.changeCategory({ category: target.id })
    }

    handleCurrencySelect = ({ target }) => {
        if (target.id !== this.props.activeCurrency)
            this.props.changeCurrency({ currency: target.id })
    }

    render() { 
        return (
            <div className='nav-container'>
                <nav className='nav'>
                    <div className='nav-content'>
                        <CategoriesMenu
                            activeCategory={this.props.activeCategory}
                            categories={this.state.categories}
                            onCategorySelect={this.handleCategorySelect} />
                        <div className="logo-container">
                            <img src="/imgs/logo.svg" alt="logo" />
                        </div>
                        <div className='right-wrapper'>
                            <div className="currencies-menu">
                                <CurrenciesMenu 
                                    activeCurrency={this.props.activeCurrency}
                                    currencies={this.state.currencies} 
                                    onCurrencySelect={this.handleCurrencySelect}/>
                            </div>
                            <div className='cart-menu-wrapper'>
                                <CartMenuBtn 
                                    itemCount={this.props.cartItems.length} />
                                <CartMenu 
                                    activeCurrency={this.props.activeCurrency}
                                    cartItems={this.props.cartItems} />
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    activeCategory: state.category.activeCategory,
    activeCurrency: state.currency.activeCurrency,
    cartItems: state.cart.items
})

const mapDispatchToProps = dispatch => ({
    changeCategory: (payload) => dispatch(changeCategory(payload)),
    changeCurrency: (payload) => dispatch(changeCurrency(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
import React, { Component } from 'react';
import { findCategoriesAndCurrencies } from '../../services/http/Nav/Nav';
import { changeCategory } from '../../store/features/category/categorySlice';
import { changeCurrency } from '../../store/features/currency/currencySlice'
import { connect } from 'react-redux';

class Nav extends Component {
    state = { 
        categories: [], 
        currencies: [], 
        currencyOptions: [],
        showCurrencyOptions: false}
    
    async componentDidMount() {
        const result = await findCategoriesAndCurrencies()

        if (!result.error) {
            const categories = result.categories.map(category => category.name)
            const currencies = result.currencies.map(currency => currency.symbol)
            this.setState({ categories, currencies })

            this.selectCurrencyOptions()
        }
        else {
            console.log('error')
        }
    }

    isActiveCategory = (category) => {
        return category === this.props.activeCategory
    }

    isActiveCurrency = (currency) => {
        return currency === this.props.activeCurrency
    }

    handleCategorySelect = ({ target }) => {
        if (target.id !== this.props.activeCategory)
            this.props.changeCategory({ category: target.id })
    }

    selectCurrencyOptions = () => {
        const options = [...this.state.currencies].filter(currency => currency !== this.props.activeCurrency)
        this.setState({ currencyOptions: options })
    }

    toggleCurrencyMenu = () => {
        this.selectCurrencyOptions()
        this.setState({ showCurrencyOptions: !this.state.showCurrencyOptions })
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
                        <ul className='menu'>
                            {this.state.categories.map(category => 
                                <li 
                                    id={category}
                                    key={category} 
                                    onClick={ this.handleCategorySelect }
                                    className={this.isActiveCategory(category)? 'menu-link active-link': 'menu-link'}>
                                    { category.toUpperCase() }
                                </li>
                            )}
                        </ul>
                        <div className="logo-container">
                            <img src="/imgs/logo.svg" alt="logo" />
                        </div>
                        <div className="currencies-menu">
                            <div className='currencies-menu-content'>
                                <div className='active-currency-wrapper'>
                                    <p className='active-currency'>
                                        {this.props.activeCurrency}
                                    </p>
                                </div>
                                <div className={this.state.showCurrencyOptions? 'currency-options' : 'hidden'}>    
                                    {this.state.currencyOptions.map(option => 
                                        <p className='currency-option' key={option}>{option}</p>    
                                    )}
                                </div>
                            </div>

                            <button 
                                className='currency-toggle-btn' 
                                onClick={this.toggleCurrencyMenu}>O</button>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    activeCategory: state.category.activeCategory,
    activeCurrency: state.currency.activeCurrency
})

const mapDispatchToProps = dispatch => ({
    changeCategory: (payload) => dispatch(changeCategory(payload)),
    changeCurrency: (payload) => dispatch(changeCurrency(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
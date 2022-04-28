import React, { Component } from 'react';
import { findCategoriesAndCurrencies } from '../../services/http/Nav/Nav';
import { changeCategory } from '../../store/features/category/categorySlice';
import { changeCurrency } from '../../store/features/currency/currencySlice'
import { connect } from 'react-redux';

class Nav extends Component {
    state = { 
        categories: [], 
        optionsRef: React.createRef(),
        toggleBtnRef: React.createRef(),
        currencies: [],
        showCurrencyOptions: false
    }
    
    async componentDidMount() {
        const result = await findCategoriesAndCurrencies()

        if (!result.error) {
            const categories = result.categories.map(category => category.name)
            const currencies = result.currencies.map(({symbol, label}) => ({ symbol, label }))
            this.setState({ categories, currencies })

            document.addEventListener('click', this.handleClickOutside)
        }
        else {
            console.log('error')
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
    }

    isActiveCategory = (category) => {
        return category === this.props.activeCategory
    }

    isActiveCurrency = (symbol) => {
        return symbol === this.props.activeCurrency
    }

    handleCategorySelect = ({ target }) => {
        if (target.id !== this.props.activeCategory)
            this.props.changeCategory({ category: target.id })
    }

    toggleCurrencyMenu = () => {
        this.setState({ showCurrencyOptions: !this.state.showCurrencyOptions })
    }

    handleCurrencySelect = ({ target }) => {
        if (target.id !== this.props.activeCurrency)
            this.props.changeCurrency({ currency: target.id })
    }

    handleClickOutside = ({ target }) => {
        if (!this.state.optionsRef.current.contains(target) && target !== this.state.toggleBtnRef.current)
            this.setState({ showCurrencyOptions: false })
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
                            <div className='currencies-wrapper'>
                                <p className='active-currency'>{this.props.activeCurrency}</p>
                                <div ref={this.state.optionsRef} className={this.state.showCurrencyOptions? 'currency-options-wrapper':'hide-currency-menu'}>
                                    {this.state.currencies.map(option => 
                                        <div 
                                            key={option.symbol} 
                                            id={option.symbol}
                                            onClick={this.handleCurrencySelect}
                                            className='currency'>
                                                {option.symbol + ' ' + option.label}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button 
                                ref={this.state.toggleBtnRef}
                                onClick={this.toggleCurrencyMenu}
                                className='currency-toggle-btn'>O</button>
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
const selectPriceToShow = (prices, activeCurrency) => {
    const price = prices.find(price => price.currency.symbol === activeCurrency)
    return price.currency.symbol + price.amount
}

export default selectPriceToShow
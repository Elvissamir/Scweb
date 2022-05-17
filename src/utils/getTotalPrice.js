const getTotalPrice = (items, symbol) => {
    const totalPrice = items.reduce((total, item) => {
        const priceInCurrency = item.prices.find(price => price.currency.symbol === symbol)
        const amount = priceInCurrency.amount
        total += amount * item.count
        return total
    }, 0)

    return totalPrice
}

export default getTotalPrice
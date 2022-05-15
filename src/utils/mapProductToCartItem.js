const mapProductToCartItem = product => {
    const item = {...product}
    item.index = null
    item.count = 1
    return item
}

export default mapProductToCartItem
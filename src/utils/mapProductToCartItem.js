const mapProductToCartItem = product => {
    const item = {...product}
    
    item.count = 1
    return item
}

export default mapProductToCartItem
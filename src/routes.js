const categories = '/categories'
const products = '/products/'
const cart = '/cart'
const getCategoryRoute = categoryId => {
    return categories + '/' + categoryId
}

const getProductRoute = productId => {
    return products + '/' + productId
}

const routes = {
    categories,
    getCategoryRoute,
    getProductRoute,
    cart
}

export default routes
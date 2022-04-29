import requestHandler from '../requestHandler'
import { FIND_PRODUCTS_BY_CATEGORY } from '../ProductListing/queries'

const findProductsByCategory = () => {
    return requestHandler(FIND_PRODUCTS_BY_CATEGORY)
}

export {
    findProductsByCategory,
}
import requestHandler from '../requestHandler'
import { FIND_PRODUCTS_BY_CATEGORY } from '../ProductListing/queries'

const findProductsByCategory = title => {
    return requestHandler(FIND_PRODUCTS_BY_CATEGORY, { variables: { title } })
}

export {
    findProductsByCategory,
}
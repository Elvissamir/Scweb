import requestHandler from '../requestHandler'
import { FIND_PRODUCTS_BY_ID } from './queries'

const findProductsByCategory = id => {
    return requestHandler(FIND_PRODUCTS_BY_ID, { variables: { id } })
}

export { 
    findProductsByCategory,
}
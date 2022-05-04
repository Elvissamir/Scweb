import requestHandler from '../requestHandler'
import { FIND_PRODUCT_BY_ID } from './queries'

const findProductById = id => {
    return requestHandler(FIND_PRODUCT_BY_ID, { variables: { id } })
}

export { 
    findProductById,
}
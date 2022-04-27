import requestHandler from '../requestHandler'
import { FIND_CATEGORIES } from '../ProductListing/queries'

const findCategories = () => {
    return requestHandler(FIND_CATEGORIES)
}

export {
    findCategories,
}
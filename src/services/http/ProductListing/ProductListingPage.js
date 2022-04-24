import requestHandler from '../requestHandler'
import { FIND_CATEGORIES, FIND_CATEGORY } from '../ProductListing/queries'

const findCategories = () => {
    return requestHandler(FIND_CATEGORIES)
}

const findCategory = (options) => {
    return requestHandler(FIND_CATEGORY, options)
}

export {
    findCategories,
    findCategory
}
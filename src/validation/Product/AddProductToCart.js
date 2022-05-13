import { getSelectProductOptionMessage, selectAllOptionsMessage } from '../../messages/productMessages'

const findRequiredAttribute = product => {
    let attributeName = ''
    for (let attribute of product.attributes) {
        if (!product.options[attribute.name]) {
            attributeName = attribute.name
            break
        }
    }
    
    return attributeName
}

const productHasRequiredOptions = product => {
    return product.options && product.attributes.length === Object.keys(product.options).length
}

const shouldAddToCart = product => {
    const error = {}

    if (product.attributes.length === 0 || productHasRequiredOptions(product))
        return null

    if (!product.options) {
        error.message = selectAllOptionsMessage
        return error
    }

    const missingAttributeName = findRequiredAttribute(product)
    error.attribute = missingAttributeName
    error.message = getSelectProductOptionMessage(missingAttributeName)
    return error
}

export default shouldAddToCart
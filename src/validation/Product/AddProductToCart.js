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
    const result = {error: {}}

    if (product.attributes.length === 0 || productHasRequiredOptions(product))
        return null

    if (!product.options) {
        result.error = {message: selectAllOptionsMessage}
        return result
    }

    const missingAttributeName = findRequiredAttribute(product)
    result.error.attribute = missingAttributeName
    result.error.message = getSelectProductOptionMessage(missingAttributeName)
    return result
}

export default shouldAddToCart
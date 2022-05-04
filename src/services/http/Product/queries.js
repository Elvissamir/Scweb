import { gql } from '@apollo/client';

const FIND_PRODUCT_BY_ID = gql`
query findProductById($id: String!){
	product (id: $id) {
    name
    id
    gallery
    prices {
      currency {
        symbol
        label
      }
    }
    attributes {
      id
      items {
        id
        value
        displayValue
      }
      name
      type
    }
    inStock
    description
    brand
    category
  }
}
`

export {
    FIND_PRODUCT_BY_ID    
}
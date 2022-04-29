import { gql } from "@apollo/client"

const FIND_PRODUCTS_BY_CATEGORY = gql`
query findProductsByCategory{
	category(input: { title: "all" }) {
    name
    products {
      id
      name
      inStock
    	gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          symbol
        }
        amount
      }
      brand
    }
  }
}
`
export {
    FIND_PRODUCTS_BY_CATEGORY,
}
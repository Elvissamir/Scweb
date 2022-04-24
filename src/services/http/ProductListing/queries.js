import { gql } from "@apollo/client"

const FIND_CATEGORIES = gql`
query findCategories {
  	categories {
    	name
  	}
}
`
const FIND_CATEGORY = gql`
query findCategory ($name: String!) {
  	category (name: $name) {
    	name
  	}
}
`
export {
    FIND_CATEGORY,
    FIND_CATEGORIES,
}
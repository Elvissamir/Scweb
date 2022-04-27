import { gql } from "@apollo/client"

const FIND_CATEGORIES = gql`
query findCategories {
  	categories {
    	name
  	}
}
`

export {
    FIND_CATEGORIES,
}
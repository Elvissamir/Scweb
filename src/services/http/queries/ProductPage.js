import requestHandler from '../requestHandler'

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

const findCategories = () => {
	return requestHandler(FIND_CATEGORIES)
}

const findCategory = () => {
	return requestHandler(FIND_CATEGORY)
}

export default {
  findCategories,
  findCategory    
}
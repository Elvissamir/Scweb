import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_SERVER_URI,
    cache: new InMemoryCache()
  })
  
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

client.query({ query: FIND_CATEGORY, variables: { name: 'the category name' } })

export default client
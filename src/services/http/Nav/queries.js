import { gql } from "@apollo/client"

const CATEGORIES_AND_CURRENCIES = gql`
    query CategoriesAndCurrencies {
        categories {
            name
        }
        currencies {
            symbol
        }
    }
`

export {
    CATEGORIES_AND_CURRENCIES
} 
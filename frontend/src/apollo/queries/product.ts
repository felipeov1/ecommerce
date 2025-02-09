import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
query {
    products {
        id
        name
        in_stock
        gallery
        description
        category
        attributes {
            product_id
            name
            type
            items {
                id
                displayValue
                value
            }
        }
        prices {
            amount
            currency {
                label
                symbol
            }
        }
        brand
    }
}

`;

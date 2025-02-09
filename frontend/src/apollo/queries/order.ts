import { gql } from "@apollo/client";

export const PLACE_ORDER_MUTATION = gql`
  mutation PlaceOrder($orderItems: [OrderItemInput!]!, $total: Float!) {
    placeOrder(orderItems: $orderItems, total: $total)
  }
`;
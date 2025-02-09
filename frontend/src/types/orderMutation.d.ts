import { gql } from "@apollo/client";
import { OrderItemInput } from "../../types/OrderItemInput";

export interface PlaceOrderVariables {
  orderItems: OrderItemInput[];
  total: number;
}

export const PLACE_ORDER_MUTATION = gql`
  mutation PlaceOrder($orderItems: [OrderItemInput!]!, $total: Float!) {
    placeOrder(orderItems: $orderItems, total: $total)
  }
`;
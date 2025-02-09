export interface AttributeInput {
  name: string;
  value: string;
}

export interface OrderItemInput {
  productId: string;
  quantity: number;
  attributes: AttributeInput[];
}
export type Price = {
  amount: number;
  currency: {
    label: string;
    symbol: string;
  };
};

export type AttributeItem = {
  displayValue: string; 
  value: string;        
  id: string;           
  selected?: boolean;   
};

export type Attribute = {
  id: string;          
  name: string;        
  type: string;        
  items: AttributeItem[]; 
};

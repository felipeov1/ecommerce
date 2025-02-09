import { Attribute, Price } from "./attribute"; 

export interface Product {
  id: string;               
  gallery: string[];        
  name: string;             
  prices: Price[];          
  in_stock: number;         
  category: string;         
  description: string;      
  attributes: Attribute[];  
  brand: string;            
}

export interface ProductCardProps {
  id: string;
  gallery: string[];        
  name: string;
  prices: Price[];          
  isOutOfStock: boolean;    
  description: string;
  category: string;
  attributes?: Attribute[]; 
  brand: string;
}

interface ImageGalleryProps {
  thumbnails: string[];
}

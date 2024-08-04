export interface Product {
  id:string,
  data:Iproduct;
}
  
export interface Iproduct {
  title: string;
  description: string;
  keyFeatures: string[];
  specifications: {
    rubyType: string;
    totalCaratWeight: string;
    metal: string;
    length: string;
  };
  careInstructions: string;
  image: string;
  category: string;
  price: number;
}
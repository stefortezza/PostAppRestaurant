export interface Antipasti {
  categoryId: number;
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  link: string;
  ingredienti: any[]; 
  opzionali: any[];   
}

export interface Ingredient {
  name: string;
  selected: boolean;
  price?: number;
}

export interface OptionalIngredient {
  price: number;
  priceOpzionale: number;
  name: string;
  selected: boolean;
}

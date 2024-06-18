export interface Antipasti {
[x: string]: any;
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  link: string;
  ingredienti: Ingredient[];
}

interface Ingredient {
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

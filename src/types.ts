export interface CoffeeProduct {
  id: string;
  name: string;
  subhead: string;
  origin: string;
  altitude: string;
  process: string;
  notes: string[];
  roastLevel: 'Light' | 'Medium' | 'Medium-Dark';
  price: number;
  weight: string;
  accentColor: string;
}

export interface CartItem {
  product: CoffeeProduct;
  grind: 'Whole Bean' | 'Espresso' | 'Filter / Pour Over' | 'French Press';
  quantity: number;
}

export type NarrativeStage = {
  range: [number, number];
  title: string;
  subtitle?: string;
  alignment: 'center' | 'left' | 'right';
  badge?: string;
};

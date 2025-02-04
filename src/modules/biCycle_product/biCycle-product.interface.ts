export type TBiCycle = {
  name: string;
  brand: string;
  // image?: string;
  price: number;
  type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
  description: string;
  quantity: number;
  inStock: boolean;
};

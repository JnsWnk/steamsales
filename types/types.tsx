export type Game = {
  name: string;
  key_price?: number;
  price: number;
  discount: number;
  discount_price: number;
  seller?: string;
  failed?: boolean;
};

export interface StoreContextType {
  productState: ProductReducerState;
  productDispatch: React.Dispatch<ProductActionType>;
  filterState: FilterReducerState;
  filterDispatch: React.Dispatch<FilterActionType>;
}

export interface ProductReducerState {
  products: Product[];
  cart: Cart[];
}

export interface Cart extends Product {
  qty: number;
}

export type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  inStock: number;
  fastDelivery: boolean;
  ratings: number;
  //   qty: number;
};
export interface FilterReducerState {
  byStock: boolean;
  byFastDelivery: boolean;
  byRating: number;
  searchQuery: string;
  sort?: string;
}

export interface ProductActionType {
  payload: Product | Cart;
  type: string;
}
export interface FilterActionType {
  payload?: string | number;
  type: string;
}

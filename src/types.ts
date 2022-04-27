export interface CartContext {
  productState: {
    cart: any[];
    products: {
      id: string;
      name: string;
      price: string;
      image: string;
      inStock: number;
      fastDelivery: boolean;
      ratings: number;
    }[];
  };
  productDispatch: any;
  filterState: {
    byStock: boolean;
    byFastDelivery: boolean;
    byRating: number;
    searchQuery: string;
    sort?: string;
  };
  filterDispatch: any;
}

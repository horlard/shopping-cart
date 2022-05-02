import {
  Cart,
  FilterActionType,
  FilterReducerState,
  ProductActionType,
  ProductReducerState,
} from "../types";

export const productReducer = (
  state: ProductReducerState,
  action: ProductActionType
): ProductReducerState => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((p) => p.id !== action.payload.id),
      };
    case "CHANGE_QTY": {
      const cart = action.payload as Cart;
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === cart.id ? (c.qty = cart.qty) : c.qty
        ),
      };
    }
    default:
      return state;
  }
};

const intialFilters = {
  byStock: false,
  byFastDelivery: false,
  byRating: 0,
  searchQuery: "",
};

export const filterReducer = (
  state: FilterReducerState = intialFilters,
  action: FilterActionType
) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload as string };
    case "FILTER_BY_STOCK":
      return { ...state, byStock: !state.byStock };
    case "FILTER_BY_DELIVERY":
      return { ...state, byFastDelivery: !state.byFastDelivery };
    case "FILTER_BY_RATING":
      return { ...state, byRating: action.payload as number };
    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload as string };
    case "CLEAR_FILTERS":
      return { ...intialFilters };
    default:
      return state;
  }
};

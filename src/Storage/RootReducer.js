const initialState = {
  cart: {},
  user: {},
  refresh: false
};
export default function RootReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_CART":
      return {
        ...state,
        cart: {
          ...state.cart,  // clone existing cart
          [action.payload[0]]: action.payload[1]  // add/update product
        }
      };

    case "DEL_CART":
      const newCart = { ...state.cart };
      delete newCart[action.payload[0]];
      return {
        ...state,
        cart: newCart
      };

    case "EMPTY_CART":
      return {
        ...state,
        cart: {},
        refresh: !state.refresh

      };




    case "ADD_USER":
      return {
        ...state,
        user: action.payload
      };
    case "DEL_USER":
      const deluser = { ...state.user }
      delete deluser[action.payload]
      return {
        ...state,
        user: deluser
      };



    default:
      return state;
  }
}

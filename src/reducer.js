export const initialState = {
  basket: [],
  location: ""
};

export const getTotalAmount = (basket) => 
  basket?.reduce((total, gimbap) => (gimbap.price * gimbap.quantity) + total, 0);

const reducer = (state, action) => {
  const index = state.basket.findIndex(
    (gimbap) => gimbap.name === action.name
  );
  let newBasket = [...state.basket];
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.gimbap]
      };

    case "SET_LOCATION":
      return {
        ...state,
        location: action.location
      };

    case "UPDATE_QUANTITY":
      if (index >= 0) {
        newBasket[index].quantity = action.quantity;
      } else {
        console.log("It does not exist in the basket");
      }
      return {
        ...state,
        basket: newBasket
      };

    case "REMOVE_FROM_BASKET":      
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.log("It does not exist in the basket");
      }
      return {
        ...state,
        basket: newBasket
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        gimbap: [],
        location: ""
      };

    default:
      return state;
  }
};

export default reducer;

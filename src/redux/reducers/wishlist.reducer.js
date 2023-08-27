import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  CLEAR_WISHLIST,
} from "../actions/types";

import toast from "react-hot-toast";
import { getCourses } from "../../../api/courses.services";

import { addToWishlist, getWishlist } from "../../../api/wishlist.services";

let cachedCart = [];
let cachedTotal = [];

if (localStorage.getItem("wishes")) {
  cachedCart = JSON?.parse(localStorage.getItem("wishes"));
  cachedTotal = localStorage.getItem("totalwish");
}

const initialState = {
  wishBag: cachedCart, // cachedCart ? cachedCart : [],
  courses: [],
  totalWishes: cachedTotal ? cachedTotal : 0,
};

// let dbWishList = []

const WishlistReducer = async (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      let coursesSet = null;
      try {
        coursesSet = await getCourses();
        state.courses = [...coursesSet.data.data.courses];
      } catch (e) {
        toast.error(`Some error occured while fetching data`);
      }

      let itemToBeAdded = state.courses.find(
        (item) => item.id === action.payload
      );
      let existingItem = cachedCart.find((item) => action.payload === item.id);
      if (existingItem) {
        toast.success(`Course already in wish list`);

        return {
          ...state,
        };
      } else {
        itemToBeAdded.quantity = 1;
        let newTotal =
          parseInt(state.totalWishes) + parseInt(itemToBeAdded.price);

        cachedCart.push(itemToBeAdded);
        localStorage.setItem("wishes", JSON.stringify([...cachedCart]));
        localStorage.setItem("totalwish", newTotal);

        await addToWishlist({ course_id: itemToBeAdded.id });
        toast.success(`Course added to wish list`);

        return {
          ...state,
          wishBag: [...cachedCart],
          totalWishes: newTotal,
        };
      }
    case REMOVE_FROM_WISHLIST:
      let itemToRemove = cachedCart.find((item) => action.payload === item.id);
      let newCart = cachedCart.filter((item) => action.payload !== item.id);
      let newTotal =
        state.totalWishes - itemToRemove.price * itemToRemove.quantity;
      toast.error(`Course removed from wish list`);

      localStorage.setItem("wishes", JSON.stringify([...newCart]));
      localStorage.setItem("totalwish", newTotal);

      return {
        ...state,
        wishBag: [...newCart],
        totalWishes: newTotal,
      };

    case CLEAR_WISHLIST:
      toast.success(`Wish list Cleared`);
      localStorage.setItem("wishes", JSON.stringify([]));
      localStorage.setItem("totalwish", 0);
      return {
        ...state,
        wishBag: [],
        totalWishes: 0,
      };

    default:
      return state || initialState;
  }
};

export default WishlistReducer;

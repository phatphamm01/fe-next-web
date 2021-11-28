import {
  IAddCartPayload,
  IAddWishlistPayload,
  ICartList,
  IUpdateCartPayload,
  IUser,
  IWishlist,
} from "@redux/types/user";
import { createSlice } from "@redux-ts-starter-kit/slice";

interface IUserSlice {
  user: IUser;
  wishlist: IWishlist;
  cart: ICartList;
}

const initialState: IUserSlice = {
  user: {},
  wishlist: [],
  cart: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  cases: {
    getUser() {},
    getUserSuccess(state, action) {
      state.user = action.payload;
    },

    getWishlist() {},
    getWishlistSuccess(state, action) {
      const handleData = action.products.map(
        (value: { product: any }) => value.product
      );
      state.wishlist = handleData;
    },
    addWishlist(state, action: IAddWishlistPayload) {},
    addWishlistSuccess(state, action) {
      const handleData = action.products.map(
        (value: { product: any }) => value.product
      );
      state.wishlist = handleData;
    },

    getCart() {},
    getCartSuccess(state, action) {
      if (action.items.length < 0) {
        return;
      }
      const handleData = action.items.map((value: any) => ({
        ...value.data,
        _id: value.data.variants._id,
        idProduct: value.data._id,
        idVariant: value.data.variants.sizeId,
        price: value.data.variants.price,
        quantity: value.quantity,
      }));

      state.cart = handleData;
    },
    addCart(state, action: IAddCartPayload) {},
    addCartSuccess(state, action) {
      if (action.items.length < 0) {
        return;
      }
      const handleData = action.items.map((value: any) => ({
        ...value.data,
        _id: value.data.variants._id,
        idProduct: value.data._id,
        idVariant: value.data.variants.sizeId,
        price: value.data.variants.price,
        quantity: value.quantity,
      }));

      state.cart = handleData;
    },

    updateCart(state, action: IUpdateCartPayload) {},
    updateCartSuccess(state, action) {
      if (action.items.length < 0) {
        return;
      }
      const handleData = action.items.map((value: any) => ({
        ...value.data,
        _id: value.data.variants._id,
        idProduct: value.data._id,
        idVariant: value.data.variants.sizeId,
        price: value.data.variants.price,
        quantity: value.quantity,
      }));

      state.cart = handleData;
    },
    addBill(state, action: any) {},
    addBillSuccess(state, action) {
      state.cart = [];
    },
  },
});

export const {
  addWishlist,
  addWishlistSuccess,
  getUser,
  getUserSuccess,
  getWishlist,
  getWishlistSuccess,
  addCart,
  addCartSuccess,
  getCart,
  getCartSuccess,
  updateCart,
  updateCartSuccess,
  addBill,
  addBillSuccess,
} = userSlice.actions;

const userReducers = userSlice.reducer;
export default userReducers;

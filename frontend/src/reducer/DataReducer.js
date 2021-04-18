export const LOAD_DATA = "loadData";

export const initialState = [];

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case LOAD_DATA:
      return [...state, payload];
    default:
      throw new Error("Unknown type");
  }
};

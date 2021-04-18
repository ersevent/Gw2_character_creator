export const REMOVE = "remove";

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case REMOVE:
      return state.filter((s) => s !== payload);
    default:
      throw new Error("Unknown type");
  }
};

import { USERS } from "../types";

const initialState = {
  loading: false,
  users: [],
  total: 0,
  page: 1,
  isOpen: false,
  btnLoading: false,
  selected: null,
  refetch: false,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USERS:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default userReducer;

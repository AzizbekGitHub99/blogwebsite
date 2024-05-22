import { CATEGORIES } from "../types"

const initialState = {
    loading: false,
    categories: [],
    total: 0,
    page: 1,
    isOpen: false,
    selected: null,
    photo: null,
    btnLoading: false,
    refetch: false
}

const categoriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CATEGORIES:
    return { ...state, ...payload }
  default:
    return state
  }
}

export default categoriesReducer; 

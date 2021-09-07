import { userContants } from "../constants/userContants";

const userReducer = (state, action) => {
  switch (action.type) {
    case userContants.GETALL_USERS_SUCCESS:
      return {
        ...state,
        users: [...action.payload],
      };
    case userContants.GETALL_USERS_FAILURE:
      return {
        error: action.payload,
      };
    case userContants.REGISTER_SUCCESS:
      return { ...state, users: [action.payload, ...state.users] };
    case userContants.REGISTER_FAILURE:
      return {
        error: action.payload,
      };
    case userContants.EDIT_USER_SUCCESS:
      if (state.user.id === action.payload.id) {
        return {
          ...state,
          user: action.payload,
          users: state.users.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ),
        };
      } else
        return {
          ...state,
          users: state.users.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ),
        };
    case userContants.EDIT_USER_FAILURE:
      return {
        error: action.payload,
      };
    case userContants.LOGIN_SUCCESS:
      return {
        ...state,
        isLogged: true,
        user: action.payload,
      };
    case userContants.LOGOUT_USER:
      return {
        ...state,
        isLogged: false,
        user: {},
      };
    default:
      return state;
  }
};

export default userReducer;

import { userContants } from "../constants/userContants";

export const userActions = {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  logout,
  editUserSuccess,
  editUserFailure,
  getAllUsersSuccess,
  getAllUsersFailure,
};

function loginSuccess(user) {
  return { type: userContants.LOGIN_SUCCESS, payload: user };
}

function loginFailure(error) {
  return { type: userContants.LOGIN_FAILURE, payload: error };
}
function registerSuccess(user) {
  return { type: userContants.REGISTER_SUCCESS, payload: user };
}
function registerFailure(error) {
  return { type: userContants.REGISTER_FAILURE, payload: error };
}
function getAllUsersSuccess(users) {
  return { type: userContants.GETALL_USERS_SUCCESS, payload: users };
}
function getAllUsersFailure(error) {
  return { type: userContants.GETALL_USERS_FAILURE, payload: error };
}

function editUserSuccess(user) {
  return { type: userContants.EDIT_USER_SUCCESS, payload: user };
}
function editUserFailure(error) {
  return { type: userContants.EDIT_USER_SUCCESS, payload: error };
}

function logout() {
  return { type: userContants.LOGOUT_USER };
}

export const authenticationHelper = {
  registerSuccessfulLogin,
  logout,
  isUserLoggedIn,
  saveUserInfo,
};

function registerSuccessfulLogin(token) {
  sessionStorage.setItem("token", token);
}
function saveUserInfo(user) {
  sessionStorage.setItem("user", JSON.stringify(user.user));
}

function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
}

function isUserLoggedIn() {
  let token = sessionStorage.getItem("token");
  if (token === null) return false;
  return true;
}

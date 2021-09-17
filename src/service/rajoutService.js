import axios from "../axios/axios";

export const rajoutService = {
  rajouterCuve,
  getAllRajout,
  getAllRajoutByMonth,
  updateRajout,
  getAllRajoutCuvePrincipaleBetweenDate,
  getAllRajoutCuvePrincipaleByCuveName,
  getAllRajoutCuvePrincipaleByCuveNameAndMonth,
  getAllRajoutCuvePrincipaleByCuveNameBetweenDate,
};
function rajouterCuve(rajout) {
  return axios
    .post("/rajout/rajouterCuve", rajout)
    .then(handleRegisterResponse)
    .then((rajout) => rajout);
}
function getAllRajout() {
  return axios
    .get("/rajout/getAllRajout")
    .then(handleRegisterResponse)
    .then((rajouts) => rajouts);
}
function getAllRajoutCuvePrincipaleBetweenDate(date) {
  return axios
    .post("/rajout/getAllAppointCuvePrincipaleBetweenDate", date)
    .then(handleRegisterResponse)
    .then((rajouts) => rajouts);
}

function getAllRajoutCuvePrincipaleByCuveNameAndMonth(data) {
  return axios
    .post("/rajout/getAllRajoutCuvePrincipaleByCuveNameAndMonth", data)
    .then(handleRegisterResponse)
    .then((rajouts) => rajouts);
}
function getAllRajoutCuvePrincipaleByCuveNameBetweenDate(data) {
  return axios
    .post("/rajout/getAllRajoutCuvePrincipaleByCuveNameBetweenDate", data)
    .then(handleRegisterResponse)
    .then((rajouts) => rajouts);
}

function getAllRajoutCuvePrincipaleByCuveName(cuveName) {
  return axios
    .get("/rajout/getAllRajoutByCuveName/" + cuveName)
    .then(handleRegisterResponse)
    .then((rajouts) => rajouts);
}

function getAllRajoutByMonth(month) {
  return axios
    .get("/rajout/getAllRajoutByMonth/" + month)
    .then(handleRegisterResponse)
    .then((rajouts) => rajouts);
}
function updateRajout(data) {
  // console.log(data);
  return axios
    .put("/rajout/update", data)
    .then(handleRegisterResponse)
    .then((rajout) => rajout);
}

function handleRegisterResponse(response) {
  const { data } = response;
  if (response.status === 401) {
    const error = (data && data.message) || response.statusText;
    console.log("handleRegisterResponse => error");
    console.log(error);
    return Promise.reject(error);
  }

  return data;
}

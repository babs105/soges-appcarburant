import axios from "../axios/axios";

export const rajoutService = {
  rajouterCuve,
  getAllRajout,

  updateRajout,
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

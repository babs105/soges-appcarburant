import axios from "../axios/axios";

export const forageService = {
  createForage,
  getAllForages,
  getForageByNomForage,
  deleteForageByNomForage,
  updateForage,
};
function createForage(forage) {
  // const requestOptions = user;
  return axios
    .post("/forage/create", forage)
    .then(handleRegisterResponse)
    .then((forage) => forage);
}
function getAllForages() {
  return axios
    .get("/forage/getAllForages")
    .then(handleRegisterResponse)
    .then((cuve) => cuve);
}

function getForageByNomForage(forageName) {
  return axios
    .get("/forage/getForageByNomForage/" + forageName)
    .then(handleRegisterResponse)
    .then((forage) => forage);
}
function deleteForageByNomForage(forageName) {
  return axios
    .delete("/forage/deleteForageByNomForage/" + forageName)
    .then(handleRegisterResponse)
    .then((forage) => forage);
}

function updateForage(data) {
  return axios
    .put("/forage/update", data)
    .then(handleRegisterResponse)
    .then((cuve) => cuve);
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

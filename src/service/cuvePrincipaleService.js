import axios from "../axios/axios";

export const cuvePrincipaleService = {
  createCuvePrincipale,
  getAllCuvePrincipale,
  getCuvePrincipaleById,
  deleteCuvePrincipaleById,
  updateCuvePrincipale,
};
function createCuvePrincipale(cuve) {
  // const requestOptions = user;
  return axios
    .post("/cuvePrincipale/create", cuve)
    .then(handleRegisterResponse)
    .then((cuve) => cuve);
}
function getAllCuvePrincipale() {
  return axios
    .get("/cuvePrincipale/getAllCuvePrincipale")
    .then(handleRegisterResponse)
    .then((cuve) => cuve);
}
function getCuvePrincipaleById(id) {
  return axios
    .get("/cuvePrincipale/getCuveByIdCuve/" + id)
    .then(handleRegisterResponse)
    .then((cuve) => cuve);
}

function deleteCuvePrincipaleById(id) {
  return axios
    .delete("/cuve/deleteCuveByCuveName/" + id)
    .then(handleRegisterResponse)
    .then((cuve) => cuve);
}
function updateCuvePrincipale(data) {
  return axios
    .put("/cuvePrincipale/update", data)
    .then(handleRegisterResponse)
    .then((cuve) => cuve);
}
// function handleResponse(response) {
//   const { data } = response;
//   if (response.status === 401) {
//     if (response.status === 401) {
//       // auto logout if 401 response returned from api
//       logout();
//       // eslint-disable-next-line no-restricted-globals
//       location.reload(true);
//     }

//     const error = (data && data.message) || response.statusText;
//     return Promise.reject(error);
//   }

//   return data;
// }

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

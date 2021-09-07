import axios from "../axios/axios";

export const ravitaillementCuveMobileService = {
  ravitaillerCuveMobile,
  getAllRavitaillementCuveMobileByCuvePrincipale,
  getAllRavitaillementCuveMobile,
  updateRavitaillementCuveMobile,
};
function ravitaillerCuveMobile(ravitaillement) {
  // const requestOptions = user;
  return axios
    .post("/ravitaillementCuveMobile/ravitailler", ravitaillement)
    .then(handleRegisterResponse)
    .then((ravitaille) => ravitaille);
}
function getAllRavitaillementCuveMobileByCuvePrincipale(cuvePrincipale) {
  return axios
    .get(
      "/ravitaillementCuveMobile/getAllRavitaillementCuveMobileByCuvePrincipale/" +
        cuvePrincipale
    )
    .then(handleRegisterResponse)
    .then((ravitaillement) => ravitaillement);
}
function getAllRavitaillementCuveMobile() {
  return axios
    .get("/ravitaillementCuveMobile/getAllRavitaillementCuveMobile")
    .then(handleRegisterResponse)
    .then((ravitaillement) => ravitaillement);
}
function updateRavitaillementCuveMobile(ravitaille) {
  return axios
    .put("/ravitaillementCuveMobile/update", ravitaille)
    .then(handleRegisterResponse)
    .then((ravitaille) => ravitaille);
}
// function deleteCuveByCuveName(cuveName) {
//   return axios
//     .delete("/cuvePrincipale/deleteCuveByCuveName/" + cuveName)
//     .then(handleRegisterResponse)
//     .then((cuve) => cuve);
// }
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

import axios from "../axios/axios";

export const ravitaillementGroupeService = {
  ravitaillerGroupe,
  getAllRavitaillementGroupe,
  updateRavitaillementGroupe,
};
function ravitaillerGroupe(data) {
  // const requestOptions = user;
  return axios
    .post("/ravitaillementGroupeElectrogene/ravitaillerGroupe", data)
    .then(handleRegisterResponse)
    .then((data) => data);
}
function getAllRavitaillementGroupe() {
  return axios
    .get("/ravitaillementGroupeElectrogene/getAllRavitaillement")
    .then(handleRegisterResponse)
    .then((data) => data);
}
function updateRavitaillementGroupe(data) {
  return axios
    .put("/ravitaillementGroupeElectrogene/update", data)
    .then(handleRegisterResponse)
    .then((data) => data);
}

// function deleteForageByNomForage(forageName) {
//   return axios
//     .delete("/approvisionnementForage/deleteForageByNomForage/" + forageName)
//     .then(handleRegisterResponse)
//     .then((forage) => forage);
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

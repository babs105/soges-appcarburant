import axios from "../axios/axios";

export const ravitaillementForageService = {
  ravitaillerForage,
  getAllRavitaillementForage,
  updateRavitaillementForage,
};
function ravitaillerForage(approvision) {
  // const requestOptions = user;
  return axios
    .post("/approvisionnementForage/approvisionner", approvision)
    .then(handleRegisterResponse)
    .then((approvision) => approvision);
}
function getAllRavitaillementForage() {
  return axios
    .get("/approvisionnementForage/getAllApprovisionnement")
    .then(handleRegisterResponse)
    .then((approvision) => approvision);
}
function updateRavitaillementForage(ravitaille) {
  return axios
    .put("/approvisionnementForage/update", ravitaille)
    .then(handleRegisterResponse)
    .then((ravitaille) => ravitaille);
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

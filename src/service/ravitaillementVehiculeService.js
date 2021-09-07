import axios from "../axios/axios";

export const ravitailleService = {
  ravitaillerVehicule,
  getAllOperationsCuve,
  getRavitaillementById,
  updateRavitaillement,
  searchRavitaillementByImmatricule,
  getAllOperationsCuveInPreviousMonth,
  getAllOperationsCuveInCurrentMonth,
  soutirerVehicule,
};
function ravitaillerVehicule(ravitaille) {
  return axios
    .post("/operationsCuve/ravitaillerVehicule", ravitaille)
    .then(handleRegisterResponse)
    .then((ravitaille) => ravitaille);
}
function soutirerVehicule(soutirement) {
  return axios
    .post("/operationsCuve/soutirerVehicule", soutirement)
    .then(handleRegisterResponse)
    .then((soutirement) => soutirement);
}
function updateRavitaillement(ravitaille) {
  return axios
    .put("/operationsCuve/update", ravitaille)
    .then(handleRegisterResponse)
    .then((ravitaille) => ravitaille);
}
function getAllOperationsCuve() {
  return axios
    .get("/operationsCuve/getAllOperationsCuve")
    .then(handleRegisterResponse)
    .then((operations) => operations);
}
function getAllOperationsCuveInPreviousMonth() {
  return axios
    .get("/operationsCuve/getAllOperationsCuveInInPreviousMonth")
    .then(handleRegisterResponse)
    .then((operations) => operations);
}
function getAllOperationsCuveInCurrentMonth() {
  return axios
    .get("/operationsCuve/getAllOperationsCuveInCurrentMonth")
    .then(handleRegisterResponse)
    .then((operations) => operations);
}
function getRavitaillementById(idRavitay) {
  return axios
    .get("/operationsCuve/getRavitaillementById/" + idRavitay)
    .then(handleRegisterResponse)
    .then((ravitaillement) => ravitaillement);
}
function searchRavitaillementByImmatricule(critere) {
  return axios
    .get("/operationsCuve/searchRavitaillementByImmatricule/" + critere)
    .then(handleRegisterResponse)
    .then((ravitaillement) => ravitaillement);
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

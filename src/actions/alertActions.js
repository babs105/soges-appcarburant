import { alertConstants } from "../constants/alertConstants";

export const alertActions = {
  alertSuccess,
  alertError,
  alertClear,
};

function alertSuccess(message) {
  return { type: alertConstants.SUCCESS, message };
}

function alertError(message) {
  return { type: alertConstants.ERROR, message };
}

function alertClear() {
  return { type: alertConstants.CLEAR };
}

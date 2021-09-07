import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "http://192.168.0.107:8080", //for build

  // baseURL: "https://gcarburant.herokuapp.com",
  https: "//soges-appcarburant.herokuapp.com",
});

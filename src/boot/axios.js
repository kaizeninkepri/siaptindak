import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({
  // baseURL: "http://10.132.127.139:8000/api",
  baseURL: "http://192.168.1.13:8000/api",
  // baseURL: "http://localhost:8000/api",
  // baseURL: "https://siaptindak.siapekprovtpi.web.id/public/api",
  // baseURL: "https://siaptindak.siapekprovtpi.web.id/public/api",
  // withCredentials: true,
});
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
});
export { axios, api };

import {toast} from "react-toastify";
import config from "../../config.json";

const {URL, AUTH_LOGOUT_PATH} = config;

export default async function logout() {
  return  fetch(URL + AUTH_LOGOUT_PATH, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }).then(res => {
      console.log(res)
      if (res.status === 204) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      } else {
        toast.error('Có lỗi xảy ra');
      }
  }).catch(err => {
      toast.error('Có lỗi xảy ra');
  });
}
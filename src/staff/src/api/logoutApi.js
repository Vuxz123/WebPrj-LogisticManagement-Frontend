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
      if (res.status === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      } else if (res.status === 204) {
          toast.warn("Bạn đã từng đăng nhập, điều này có nghĩa là đã có lỗi gì đó sảy ra!")
          localStorage.removeItem('token');
          localStorage.removeItem('role');
      }
  }).catch(err => {
      console.error(err)
      toast.error('Có lỗi xảy ra');
  });
}
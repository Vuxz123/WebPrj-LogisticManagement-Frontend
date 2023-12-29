import {toast} from "react-toastify";
import config from "../../config.json";

const {URL, AUTH_REGISTER_PATH} = config;
function submitRegister(account) {
    const { repassword, ...json } = account;

    console.log(localStorage.getItem('token'))

    return fetch(URL + AUTH_REGISTER_PATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(json),
    }).then(response => {
        if(response.status === 200) {
            toast.success("Tạo tài khoản thành công",
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
            return response.json();
        } else if(response.status === 400) {
            toast.error("Tạo tài khoản thất bại",
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
            return response.json();
        } else {
            toast.error("Tạo tài khoản thất bại",
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
            toast.error("Đã có lỗi xảy ra",
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
            return response.json();
        }
    }).then(data => {
        console.log(data)
        if (data.status === "failed") {
            toast.error("[Lỗi] " + data.message);
        }
    }, () => {
    }).catch((error) => {
        console.error('Error:', error);
        toast.error("Tạo tài khoản thất bại");
    });
}

export {submitRegister};
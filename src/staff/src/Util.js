
function sendRequest(url, method, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            callback(xhr.responseText);
        }
    }
}

const API_URL = 'http://localhost:3000/api';

const VAT = 0.03;

const GTGT = 0.03;

const UNIT_RATE_FILE = 10000; // đơn giá file 50.000đ / 1 file

const UNIT_RATE_BOX = 50000; // đơn giá hộp 50.000đ / 1 kg

export { sendRequest, API_URL, VAT, GTGT, UNIT_RATE_FILE, UNIT_RATE_BOX};
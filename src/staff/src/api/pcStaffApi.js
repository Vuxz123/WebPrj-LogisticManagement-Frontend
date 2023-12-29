import config from "../../config.json";

const {URL} = config;

async function confirmShipment(id: string, type: string) {
    if(type === "from-gather") {
        return fetch(URL + "/gathercap/shipments/" + id + "/confirm-point", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token") || ""
            }
        })
    } else if (type === "from-trans") {
        return fetch(URL + "/gathercap/shipments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token") || ""
            },
            body: JSON.stringify({
                id: id,
            })
        })
    } else {
        throw new Error("Invalid type")
    }
}

async function createShipment(id: string, to: string, type: string) {
    if(type === "to-gather") {
        return fetch(URL + "/gathercap/shipments/" + id + "/create-point", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token") || ""
            },
            body: JSON.stringify({
                id: to
            })
        })
    } else if (type === "to-trans") {
        return fetch(URL + "/gathercap/shipments/" + id + "/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token") || ""
            },
            body: JSON.stringify({
                id: to
            })
        })
    } else {
        throw new Error("Invalid type")
    }
}

export {confirmShipment, createShipment}
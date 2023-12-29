import config from "../../config.json";
import type Shipment from "../type/Type";

const {URL} = config;

async function confirmDelivery(id: string) {
    return fetch(URL + "/transstaff/shipments/" + id + "/confirm-delivery", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token") || ""
        },
    });
}

async function createDelivery(id: string) {
    return fetch(URL + "/transstaff/shipments/" + id + "/create-delivery", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token") || ""
        },
    });
}

async function returnDelivery(id: string) {
    return fetch(URL + "/transstaff/shipments/" + id + "/return", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token") || ""
        }
    })
}

async function confirmShipment(id: string) {
    return fetch(URL + "/transstaff/shipments/" + id + "/confirm-shipment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token") || ""
        }
    })
}

async function createShipment(id: string) {
    return fetch(URL + "/transstaff/shipments/" + id + "/send", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token") || ""
        },
    })
}

async function makeShipment(shipment: Shipment) {
    return fetch(URL + "/transstaff/shipments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token") || ""
        },
        body: JSON.stringify(shipment)
    })
}

async function report(pointId: string) {
    return fetch(URL + "/transstaff/shipments/statistics", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token") || ""
        },
    })
}

export {confirmShipment, createShipment, returnDelivery, confirmDelivery, createDelivery, report, makeShipment}
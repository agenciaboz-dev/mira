import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:4100/api",
    // baseURL: "https://app.agenciaboz.com.br:4102/api",
    timeout: 1000 * 10,
})

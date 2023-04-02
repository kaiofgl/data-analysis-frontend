import axios from "axios";

const config = {
    headers: {
        'Accept': 'application/json'
    }
}

const api = axios.create({
    baseURL: 'http://127.0.0.1:3333'
}, config)

export default api;
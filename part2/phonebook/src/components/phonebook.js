import axios from "axios";

// code that handles comms with the backed server

const baseUrl = 'http://localhost:3001/persons'

const create = (newPersonObj) => {
    const request = axios.post(baseUrl, newPersonObj)
    return request.then(response => response.data)    
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}



export default {create, getAll}
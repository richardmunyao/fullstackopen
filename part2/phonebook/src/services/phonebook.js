import axios from "axios";

// code that handles comms with the backed server

const baseUrl = '/api/persons/'

const create = (newPersonObj) => {
    const request = axios.post(baseUrl, newPersonObj)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const removePerson = (personId) => {
    const request = axios.delete(`${baseUrl}/${personId}`)
    return request.then(response => response)
}

const changeNumber = (personId, newPersonObj) => {
    const request = axios.put(`${baseUrl}/${personId}`, newPersonObj)
    return request.then(response => response.data)

}



const ops = { create, getAll, removePerson, changeNumber }
export default ops
import axios from "axios";
import api from "./api";

// createEntry
async function createNewEntry(entryBody){
    const response = await api.post('/entries')
    return response.data
}

// all public entries
async function getAllPublicEntries(){
    const response = await api.get('/entries')
    return response.data
}

// myEntries
async function getAllMyEntries(){
    const response = await api.get('/entries/my-entries')
    return response.data
}


export {
    createNewEntry,
    getAllPublicEntries,
    getAllMyEntries
}
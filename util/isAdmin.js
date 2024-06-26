import axios from "axios";

export async function getRole(email){
    const isAdmin = await axios.get(`https://firestore.googleapis.com/v1/projects/stockcast-8db50/databases/(default)/documents/users/${email}`)
    return isAdmin.data.fields.isAdmin.booleanValue
}

export async function registerNewUser(email, payload){
    await axios.post(`https://firestore.googleapis.com/v1/projects/stockcast-8db50/databases/(default)/documents/users?documentId=${email}`, payload)
}
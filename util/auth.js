import axios from "axios";

const API_KEY = "?=AIzaSyDcwndkRSdf8tfZJKMlNU5WztHo0aB552M"

export async function authenticate(mode, email, password){
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:'
    if(mode === "signup") url += "signUp"
    else url += "signInWithPassword"
    url += API_KEY

    const repsonse = await axios.post(
        url,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
    )

    return repsonse.data.idToken
}

export function createUser(email, password){
    return authenticate('signup', email, password)
}

export function login(email, password){
    return authenticate('login', email, password)
}
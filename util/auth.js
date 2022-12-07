import axios from "axios";

const API_KEY = "?key=AIzaSyDcwndkRSdf8tfZJKMlNU5WztHo0aB552M"

export async function authenticate(mode, email, password){
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:'
    if(mode === "signup"){
        url += "signUp"
    }
    else{
        url += "signInWithPassword"
    }
    url += API_KEY

    const response = await axios.post(
        url,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
    )

    return response.data.idToken
}
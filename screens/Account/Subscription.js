import { Text } from "react-native";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../store/auth-context";

const API_KEY = "AIzaSyDcwndkRSdf8tfZJKMlNU5WztHo0aB552M"

export default function Subscription(){
    const authCtx = useContext(AuthContext)

    async function run(){
        let email = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
        {idToken: authCtx.token})
        console.log(email.data)
    }

    return (
        <Text>Subscription Details</Text>
    )
}
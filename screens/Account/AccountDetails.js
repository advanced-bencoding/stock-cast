import { useContext } from "react";
import { Text, View } from "react-native";
import FlatButton from "../../components/ui/FlatButton";
import { AuthContext } from "../../store/auth-context";
import axios from "axios";

const API_KEY = "AIzaSyDcwndkRSdf8tfZJKMlNU5WztHo0aB552M"

export default function AccountDetails(){
    const authCtx = useContext(AuthContext)

    async function run(){
        let email = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
        {idToken: authCtx.token})
        console.log(email.data)
    }
    
    return (
        <View>
            <Text>AccountDetails</Text>
        </View>
    )
}
import { useState, useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";
import InputField from "../../components/InputField";
import FlatButton from "../../components/ui/FlatButton";
import { AuthContext } from "../../store/auth-context";
import axios from "axios";

const API_KEY = "AIzaSyDcwndkRSdf8tfZJKMlNU5WztHo0aB552M"

export default function ChangePassword(){
    const authCtx = useContext(AuthContext)
    const [newField, setNewField] = useState("")
    const [oldField, setOldField] = useState("")

    function stateChange(type, value){
        switch(type){
            case "new":
                setNewField(value)
                break
            case "old":
                setOldField(value)
                break
        }
    }
    async function changePass(){
        try{
            let email = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
            {idToken: authCtx.token})
            await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
                {
                    email: email.data.users[0].email,
                    password: oldField
                }
            )
        }
        catch(err){
            if(err.response.data.error.message==="INVALID_PASSWORD"){
                Alert.alert("Inavalid Password", "Please enter your old password correctly")
                setOldField("")
            }
            else{
                Alert.alert("Something went wrong", "Try again later.")
            }
            return
        }
        await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
            {
                idToken: authCtx.token,
                password: newField,
                returnSecureToken: true
            }
        )
        Alert.alert("Success", "Password changed successfully, login with new credentials.")
        authCtx.logout()
    }

    return (
        <View style={styles.container}>
            <InputField
                placeholder={"Old Password"}
                label={"Old Password"}
                value={oldField}
                changeState={stateChange.bind(this, "old")}
            />
            <InputField
                placeholder={"New Password"}
                label={"New Password"}
                value={newField}
                changeState={stateChange.bind(this, "new")}
            />
            <FlatButton onPress={changePass}>Change Password</FlatButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 15
    }
})
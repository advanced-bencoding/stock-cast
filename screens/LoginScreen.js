import { View, StyleSheet, Alert } from 'react-native'
import FlatButton from '../components/ui/FlatButton'
import InputField from '../components/InputField'
import Title from '../components/ui/Title'
import { Colors } from '../constants/styles'
import { useNavigation } from '@react-navigation/native'
import { useContext, useState } from 'react'
import { AuthContext } from '../store/auth-context'
import { authenticate } from '../util/auth'

export default function LoginScreen(){
    const navigation = useNavigation()
    const authCtx = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    function stateChange(type, value){
        switch(type){
            case "email":
                setEmail(value)
                break;
            case "password":
                setPassword(value)
        }
    }

    async function loginHandler(email, password){
        try{
            const token = await authenticate("login", email, password)
            authCtx.authenticate(token)
        }
        catch(error){
            Alert.alert("Login Failed", "Check your username and password and try again.")
        }
    }

    return(
        <View style={styles.container}>
            <Title>Login To Your Account</Title>
            <View>
                <InputField
                    label="Email"
                    placeholder="someone@example.com"
                    value={email}
                    changeState={stateChange.bind(this, 'email')}
                />
                <InputField
                    label="Password"
                    value={password}
                    secure
                    changeState={stateChange.bind(this, 'password')}
                />
            </View>
            <FlatButton onPress={()=>loginHandler(email, password)}>Login</FlatButton>
            <FlatButton onPress={()=>{navigation.navigate("Signup")}}>Signup</FlatButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 24,
        flex: 1,
        backgroundColor: Colors.accent400,
        paddingVertical: 50
    }
})
import { View, StyleSheet, Alert } from 'react-native'
import InputField from '../components/InputField'
import FlatButton from '../components/ui/FlatButton'
import Title from '../components/ui/Title'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../constants/styles'
import { useContext, useState } from 'react'
import { AuthContext } from '../store/auth-context'
import { authenticate, validate } from '../util/auth'

export default function SignupScreen(){
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cnfpass, setCnfpass] = useState("")

    const authCtx = useContext(AuthContext)

    async function signupHandler(email, password, cnfpass){
        try{
            if(validate({email:email})){
                throw "Incorrect email format."
            }
            if(password!==cnfpass){
                throw "Passwords don't match."
            }
            if(password.length < 8){
                throw "Passwords need to be at least 8 characters long."
            }
            const token = await authenticate("signup", email, password)
            authCtx.authenticate(token) 
        }
        catch(error){
            Alert.alert("Signup Failed", error)
        }
    }

    function stateChange(type, value){
        switch(type){
            case "email":
                setEmail(value)
                break;
            case "password":
                setPassword(value)
                break;
            case "cnfpass":
                setCnfpass(value)
                break;
        }
    }

    return(
            <View style={styles.container}>
                <Title>Sign Up and Get Started</Title>
                <View>
                    <InputField
                        label="Email"
                        placeholder="someone@example.com"
                        value={email}
                        changeState={stateChange.bind(this, 'email')}
                    />
                    <InputField
                        label="Password"
                        secure
                        value={password}
                        changeState={stateChange.bind(this, 'password')}
                    />
                    <InputField
                        label="Confirm  Password"
                        secure
                        value={cnfpass}
                        changeState={stateChange.bind(this, 'cnfpass')}
                    />
                </View>
                <View style={styles.btnHolder}>
                    <FlatButton onPress={()=>signupHandler(email, password, cnfpass)}>Signup</FlatButton>
                    <FlatButton onPress={()=>{navigation.navigate("Login")}}>Login</FlatButton>
                </View>
            </View>
        
    )
}
const styles = StyleSheet.create({
    container:{
        padding: 24,
        flex: 1,
        backgroundColor: Colors.accent400,
        paddingVertical: 50
    },
    btnHolder:{
        height: 125
    }
})
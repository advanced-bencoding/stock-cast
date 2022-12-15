import { View, StyleSheet, Alert } from 'react-native'
import InputField from '../components/InputField'
import FlatButton from '../components/ui/FlatButton'
import Title from '../components/ui/Title'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../constants/styles'
import { useContext, useState } from 'react'
import { AuthContext } from '../store/auth-context'
import { authenticate } from '../util/auth'

export default function SignupScreen(){
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cnfemail, setCnfemail] = useState("")

    const authCtx = useContext(AuthContext)

    async function signupHandler(email, password){
        try{
            const token = await authenticate("signup", email, password)
            authCtx.authenticate(token) 
        }
        catch(error){
            Alert.alert("Signup Failed", "Try again later")
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
            case "cnfmail":
                setCnfemail(value)
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
                        label="Confirm Email"
                        placeholder="someone@example.com"
                        value={cnfemail}
                        changeState={stateChange.bind(this, 'cnfmail')}
                    />
                    <InputField
                        label="Password"
                        secure
                        value={password}
                        changeState={stateChange.bind(this, 'password')}
                    />
                </View>
                <View style={styles.btnHolder}>
                    <FlatButton onPress={()=>signupHandler(email, password)}>Signup</FlatButton>
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
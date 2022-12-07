import { View, StyleSheet } from 'react-native'
import InputField from '../components/InputField'
import FlatButton from '../components/ui/FlatButton'
import Title from '../components/ui/Title'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../constants/styles'

export default function SignupScreen(){
    const navigation = useNavigation()
    return(
            <View style={styles.container}>
                <Title>Sign Up and Get Started</Title>
                <View>
                    <InputField label="Email" placeholder="someone@example.com"/>
                    <InputField label="Confirm Email" placeholder="someone@example.com"/>
                    <InputField label="Password" secure/>
                </View>
                <FlatButton >Signup</FlatButton>
                <FlatButton onPress={()=>{navigation.navigate("Login")}}>Login</FlatButton>
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
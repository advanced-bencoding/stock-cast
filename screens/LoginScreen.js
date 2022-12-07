import { View, StyleSheet } from 'react-native'
import FlatButton from '../components/ui/FlatButton'
import InputField from '../components/InputField'
import Title from '../components/ui/Title'
import { Colors } from '../constants/styles'
import { useNavigation } from '@react-navigation/native'

export default function LoginScreen(){
    const navigation = useNavigation()
    return(
        <View style={styles.container}>
            <Title>Login To Your Account</Title>
            <View>
                <InputField label="Email" placeholder="someone@example.com"/>
                <InputField label="Password" secure/>
            </View>
            <FlatButton >Login</FlatButton>
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
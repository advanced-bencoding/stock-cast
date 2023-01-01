import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

export default function AccountItem({title, onPress}){
    const nav = useNavigation()
    const authCtx = useContext(AuthContext)
    let press = function(){}
    if(onPress==="Logout"){
        press = () => authCtx.logout()
    }
    else{
        press = () => nav.navigate(onPress)
    }
    return(
        <View>
            <Pressable style={styles.container} onPress={press}>
                <Text style={styles.name}>{title}</Text>
            </Pressable>
            <View style={styles.rule}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 16
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    rule: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginHorizontal: 10
    }
})
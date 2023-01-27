import { TextInput, View, StyleSheet, Text } from "react-native";

export default function InputField({placeholder, label, secure, value, changeState}){
    return(
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                secureTextEntry={secure}            
                placeholder={placeholder}
                value={value}
                onChangeText={changeState}
                autoCapitalize="none"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    container:{
        marginVertical: 10
    },
    label:{
        marginBottom: 5
    }
})
import { Pressable, Text, StyleSheet, View } from "react-native";

export default function AccountItem({title}){
    return(
        <View>
            <Pressable style={styles.container}>
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
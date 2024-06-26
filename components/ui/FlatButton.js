import { View, Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";

export default function FlatButton({children, onPress, mode}){
    return(
        <Pressable
            style={({pressed})=>[styles.container, pressed && styles.pressed]}
            onPress={onPress}
        >
            <View style={styles.textWrapper}>
                <Text>{children}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.primary400,
        padding: 16,
        flex: 1,
        borderRadius: 5,
        marginVertical: 5,
        maxHeight: 50
    },
    pressed:{
        opacity: 0.75
    },
    textWrapper:{
        alignItems: 'center'
    }
})
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";

export default function FilterButton({children, onPress, mode}){
    return(
        <Pressable
            style={({pressed})=>[styles.container, pressed && styles.pressed]}
            onPress={onPress}
        >
            <View style={styles.textWrapper}>
                <Text style={styles.text}>{children}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.primary400,
        padding: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginVertical: 5,
    },
    pressed:{
        opacity: 0.75
    },
    textWrapper:{
        alignItems: 'center'
    },
    text:{
        fontSize: 15
    }
})
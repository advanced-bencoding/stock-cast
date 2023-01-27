import { Text, View, Pressable, StyleSheet } from "react-native"

export default function SegmentItem({title, color, onPress}){
    return(
            <Pressable style={({pressed})=> pressed? [styles.button, {opacity: 0.5}] : styles.button} onPress={onPress}>
                <View style={[styles.gridItem, {backgroundColor: color}]}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                </View>
            </Pressable>
    )
}

const styles = StyleSheet.create({
    gridItem:{
        flex: 1,
        margin: 8,
        height: 150,
        borderRadius: 10
    },
    innerContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        flex: 1
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
})
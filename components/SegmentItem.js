import { Text, View, Pressable, StyleSheet } from "react-native"

export default function SegmentItem({title, color}){
    return(
        <View style={[styles.gridItem, {backgroundColor: color}]}>
            <Pressable style={styles.button}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </Pressable>
        </View>
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
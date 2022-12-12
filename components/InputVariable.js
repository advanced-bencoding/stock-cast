import { View, TextInput, Text, StyleSheet} from 'react-native'
import Slider from '@react-native-community/slider'

export default function InputVariable({label, value, max, min}){
    return(
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.innerContainer}>
                <Slider
                    minimumValue={min}
                    maximumValue={max}
                    style={styles.slider}
                    value={value}
                />
                <TextInput
                    style={styles.input}
                    value={value.toString()}
                    keyboardType='decimal-pad'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginHorizontal: 5,
        padding: 10
    },
    innerContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    slider:{
        flex: 3
    },
    input:{
        height: 40,
        margin: 12,
        padding: 7,
        borderWidth: 0.7,
        borderRadius: 5,
        flex: 1
    },
    label:{

    }
})
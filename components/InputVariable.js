import { View, TextInput, Text, StyleSheet} from 'react-native'
import Slider from '@react-native-community/slider'

export default function InputVariable({label, value, max, min, onChange}){
    return(
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.innerContainer}>
                <Slider
                    minimumValue={min}
                    maximumValue={max}
                    style={styles.slider}
                    value={value}
                    onValueChange={onChange}
                />
                <TextInput
                    style={styles.input}
                    value={value.toString()}
                    keyboardType='decimal-pad'
                    onChangeText={onChange}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
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
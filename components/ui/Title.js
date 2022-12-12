import { View, Text, StyleSheet } from 'react-native'

export default function Title({children, size}){
    return(
        <View>
            <Text style={{fontSize: size}}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
})
import { View, StyleSheet } from 'react-native'
import MyChart from './MyChart'
import { indices } from '../constants/indices'
import Title from './ui/Title'

export function DummyNifty({route}){
    const index = route.params.index
    return (
        <View style={styles.container}>
            <Title size={40}>{route.params.title}</Title>
            <MyChart
                data={{datasets: [{data: indices[index].map(item => item.close), color: ()=>'#00ff00'}], legend:["close"]}}
            />
            <Title size={30}>Today's Value: {indices[index][indices[index].length-1].close}</Title>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 10
    }
})
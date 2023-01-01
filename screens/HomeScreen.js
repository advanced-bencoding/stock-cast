import { View, StyleSheet } from 'react-native'
import Title from '../components/ui/Title'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import MyChart from '../components/MyChart'
import FilterButton from '../components/graphs/FilterButton'
import { AuthContext } from '../store/auth-context'

export default function HomeScreen(){
    const [fetchedData, setFetchedData] = useState(false)
    const [dayData, setDayData] = useState({datasets: [{data:[0]}]})
    const [monthData, setMonthData] = useState({datasets: [{data:[0]}]})
    const [historicalData, setHistoricalData] = useState({datasets: [{data:[0]}]})
    const [data, setData] = useState(monthData)
    const authCtx = useContext(AuthContext)

    useEffect(()=>{
        axios.get("http://192.168.1.8:3030/day")
        .then(response => setDayData({datasets: [{data: response.data.map(item => item.value), color: ()=>'#00ff00'}, {data: response.data.map(item => item.value - 400), color: ()=> 'black'}], legend:["close", "prediction"]}))
        .catch(err => console.log(err))

        axios.get("http://192.168.1.8:3030/month")
        .then(response => setMonthData({datasets: [{data: response.data.map(item => item.close), color: ()=>'#00ff00'}, {data: response.data.map(item => item.close - 500), color: ()=> 'black'}], legend:["close", "prediction"]}))
        .catch(err => console.log(err))

        axios.get("http://192.168.1.8:3030/historical")
        .then(response => setHistoricalData({datasets: [{data: response.data.map(item => item.close), color: ()=>'#00ff00'}, {data: response.data.map(item => item.close - 750), color: ()=> 'black'}], legend:["close", "prediction"]}))
        .catch(err => console.log(err))
        setFetchedData(true)

        // setInterval(()=>{
        //     axios.get("http://192.168.1.5:8080/day")
        //     .then(response => setDayData({datasets: [{data: response.data.map(item => item.value), color: ()=>'#00ff00'}, {data: response.data.map(item => item.value - 1000), color: ()=> 'black'}], legend:["close", "prediction"]}))
        //     .catch(err => console.log(err))
        // }, 1080000)
        setInterval(()=>{
            axios.get("http://192.168.1.8:3030/day")
            .then(response => setDayData({datasets: [{data: response.data.map(item => item.value), color: ()=>'#00ff00'}, {data: response.data.map(item => item.value - 100), color: ()=> 'black'}], legend:["close", "prediction"]}))
            .catch(err => console.log(err))
        }, 10000)
    }
    ,[])

    return(
        <View>
            <Title size={30}>SENSEX: 68310</Title>
            <Title size={30}>Monthly Prediction: {authCtx.pred}</Title>
            {fetchedData && <MyChart data={data} />}
            <View style={styles.filterContainer}>
                <FilterButton onPress={()=>setData(dayData)}>1D</FilterButton>
                <FilterButton onPress={()=>setData(monthData)}>1M</FilterButton>
                <FilterButton onPress={()=>setData(historicalData)}>5Y</FilterButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    filterContainer:{
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})
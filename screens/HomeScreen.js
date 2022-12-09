import { View, Text, Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import Title from '../components/ui/Title'
import axios from 'axios'
import { useEffect, useState } from 'react'
import MyChart from '../components/MyChart'
import FlatButton from '../components/ui/FlatButton'

export default function HomeScreen(){
    const [fetchedData, setFetchedData] = useState(false)
    const [dayData, setDayData] = useState({datasets: [{data:[0]}]})
    const [monthData, setMonthData] = useState({datasets: [{data:[0]}]})
    const [historicalData, setHistoricalData] = useState({datasets: [{data:[0]}]})
    const [data, setData] = useState(monthData)
    useEffect(()=>{
        axios.get("http://192.168.1.5:8080/day")
        .then(response => setDayData({datasets: [{data: response.data.map(item => item.value), color: ()=>'#00ff00'}, {data: response.data.map(item => item.value - 1000), color: ()=> 'black'}], legend:["close", "prediction"]}))
        .catch(err => console.log(err))

        axios.get("http://192.168.1.5:8080/month")
        .then(response => setMonthData({datasets: [{data: response.data.map(item => item.close), color: ()=>'#00ff00'}, {data: response.data.map(item => item.close - 500), color: ()=> 'black'}], legend:["close", "prediction"]}))
        .catch(err => console.log(err))

        axios.get("http://192.168.1.5:8080/historical")
        .then(response => setHistoricalData({datasets: [{data: response.data.map(item => item.close), color: ()=>'#00ff00'}, {data: response.data.map(item => item.close - 750), color: ()=> 'black'}], legend:["close", "prediction"]}))
        .catch(err => console.log(err))

        setFetchedData(true)
    }
    ,[])

    return(
        <View>
            <Title>SENSEX: {dayData.datasets[0].data[0]}</Title>
            {fetchedData && <MyChart data={data} />}
            <FlatButton onPress={()=>setData(dayData)}>1 Day</FlatButton>
            <FlatButton onPress={()=>setData(monthData)}>1 Month</FlatButton>
            <FlatButton onPress={()=>setData(historicalData)}>historical</FlatButton>
        </View>
    )
}
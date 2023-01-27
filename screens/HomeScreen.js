import { View, StyleSheet } from 'react-native'
import Title from '../components/ui/Title'
import axios from 'axios'
import { useContext, useEffect, useMemo, useState } from 'react'
import MyChart from '../components/MyChart'
import FilterButton from '../components/graphs/FilterButton'
import { AuthContext } from '../store/auth-context'
import { IP } from '../util/constants'

export default function HomeScreen(){
    const authCtx = useContext(AuthContext)
    const [fetchedData, setFetchedData] = useState(false)
    const [dayData, setDayData] = useState({datasets: [{data:[0]}]})
    const [monthData, setMonthData] = useState({datasets: [{data:[0]}]})
    const [historicalData, setHistoricalData] = useState({datasets: [{data:[0]}]})
    const [pred, setPred] = useState(authCtx.pred)
    const [data, setData] = useState(monthData)

    useEffect(()=>{
        axios.get(`http://${IP}:3030/preds`)
        .then(response => setPred(response.data.map( item => item.pred )))
        // setData(dayData)
        // console.log(dayData.datasets[0].data, fetchedData)

        // setInterval(()=>{
        //     axios.get("http://192.168.1.5:8080/day")
        //     .then(response => setDayData({datasets: [{data: response.data.map(item => item.value), color: ()=>'#00ff00'}, {data: response.data.map(item => item.value - 1000), color: ()=> 'black'}], legend:["close", "prediction"]}))
        //     .catch(err => console.log(err))
        // }, 1080000)
        // setTimeout(()=>{
        //     setData(dayData)
        //     console.log("i worked", dayData.datasets[0].data)
        //     axios.get(`http://${IP}:3030/day`)
        //     .then(response => setDayData({datasets: [{data: response.data.map(item => item.value), color: ()=>'#00ff00'}, {data: response.data.map(item => item.value - 100), color: ()=> 'black'}], legend:["close", "prediction"]}))
        //     .catch(err => console.log(err))
        // }, 5000)
    }
    ,[])

    useMemo(()=>{
        setData(dayData)
        setFetchedData(true)
    }, [dayData])

    useMemo(()=>{
        axios.get(`http://${IP}:3030/month`)
        .then(response => setMonthData({datasets: [{data: response.data.map(item => item.close), color: ()=>'#00ff00'}, {data: response.data.map((item, i) => {
            return pred[0] + i*(pred[1] - pred[0])/response.data.length
        }), color: ()=> 'black', withDots: true}], legend:["close", "prediction"]}))
        .catch(err => console.log(err))

        axios.get(`http://${IP}:3030/historical`)
        .then(response => setHistoricalData({datasets: [{data: response.data.map(item => item.close), color: ()=>'#00ff00'}], legend:["close"]}))
        .catch(err => console.log(err))

        axios.get(`http://${IP}:3030/day`)
        .then(response => setDayData({datasets: [{data: response.data.map(item => item.value), color: ()=>'#00ff00'}, {data: response.data.map(item => pred[1]), color: ()=> 'black'}], legend:["close", "prediction"]}))
        .then(setData(dayData))
        .catch(err => console.log(err))

        authCtx.pred = pred
    }, [pred])

    return(
        <View>
            <Title size={30}>SENSEX: 68310</Title>
            <Title size={30}>Monthly Prediction: {pred[1]}</Title>
            {fetchedData && <MyChart data={data} />}
            <View style={styles.filterContainer}>
                <FilterButton onPress={()=>{setData(dayData); console.log(pred)}}>1D</FilterButton>
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
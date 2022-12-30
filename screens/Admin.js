import { useState } from "react"
import { ScrollView, View, StyleSheet, Text } from "react-native"
import InputVariable from "../components/InputVariable"
import FlatButton from "../components/ui/FlatButton"
import axios from "axios"

export default function Admin(){
    function changeValue(type, value){
        switch(type){
            case "forex":
                setValues(old => ({...old, forex: value}))
                break
            case "iip":
                setValues(old => ({...old, iip: value}))
                break
            case "cpi":
                setValues(old => ({...old, cpi: value}))
                break
            case "lti":
                setValues(old => ({...old, lti: value}))
                break
            case "msciw":
                setValues(old => ({...old, msciw: value}))
                break
            case "msciem":
                setValues(old => ({...old, msciem: value}))
                break
            case "crude":
                setValues(old => ({...old, crude: value}))
                break
            case "gold":
                setValues(old => ({...old, gold: value}))
                break
            case "vix":
                setValues(old => ({...old, vix: value}))
                break
        }
    }

    const [values, setValues] = useState({
        forex: 78.07,
        iip: 104.07,
        cpi: 142.34,
        lti: 7.53,
        msciw: 2546,
        msciem: 1824,
        crude: 9119.55,
        gold: 50804,
        vix: 28.71
    })

    const [pred, setPred] = useState(68310)

    function getPred(features){
        console.log(features)
        axios.post("https://tensorflowbrsensex.onrender.com/hello",{
            "instances": [features]
        })
        .then(res => setPred(res.data["prediction"]))
        .catch(err => console.log(err))
    }

    return(
        <ScrollView style={styles.container}>
            <InputVariable
                label="Foreign Exchange Rate (USD to INR)"
                value={values.forex}
                min={50}
                max={250}
                onChange={changeValue.bind(this, "forex")}
            />
            <InputVariable
                label="Index of Industrial Production"
                value={values.iip}
                min={50}
                max={300}
                onChange={changeValue.bind(this, "iip")}
            />
            <InputVariable
                label="Consumer Price Index"
                value={values.cpi}
                min={100}
                max={300}
                onChange={changeValue.bind(this, "cpi")}
            /> 
            <InputVariable
                label="Long Term Interest Rate"
                value={values.lti}
                min={0}
                max={100}
                onChange={changeValue.bind(this, "lti")}
            /> 
            <InputVariable
                label="MSCI World"
                value={values.msciw}
                min={1000}
                max={5000}
                onChange={changeValue.bind(this, "msciw")}
            /> 
            <InputVariable
                label="MSCI Emerging Markets Index"
                value={values.msciem}
                min={1000}
                max={5000}
                onChange={changeValue.bind(this, "msciem")}
            /> 
            <InputVariable
                label="Crude Oil"
                value={values.crude}
                min={5000}
                max={50000}
                onChange={changeValue.bind(this, "crude")}
            /> 
            <InputVariable
                label="Gold"
                value={values.gold}
                min={20000}
                max={150000}
                onChange={changeValue.bind(this, "gold")}
            /> 
            <InputVariable
                label="India VIX"
                value={values.vix}
                min={0}
                max={100}
                onChange={changeValue.bind(this, "vix")}
            />
            <View style={styles.btnHolder}>
                <FlatButton onPress={()=>{
                    let instances = [values.cpi, values.crude, values.msciem, values.forex, values.gold, values.iip, values.lti, values.msciw, values.vix]
                    setPred(getPred(instances.map(x => Number(x))))
                }}>Get Prediction</FlatButton>
                <FlatButton>Update for Next Month</FlatButton>
            </View>
            <Text style={styles.highlight}>Prediction for next month:</Text>
            <Text style={styles.highlight}>{pred}</Text>
        </ScrollView>       
    )
}

const styles = StyleSheet.create({
    btnHolder:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    highlight:{
        fontSize: 30
    },
    container:{
        padding: 5,
        marginHorizontal: 5
    }
})
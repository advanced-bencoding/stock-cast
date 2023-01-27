import { useContext, useState } from "react"
import { ScrollView, View, StyleSheet, Text, Alert, Modal, Button } from "react-native"
import InputVariable from "../components/InputVariable"
import FlatButton from "../components/ui/FlatButton"
import axios from "axios"
import { AuthContext } from "../store/auth-context"
import InputField from "../components/InputField"
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Admin(){
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [modalVisible, setModalVisible] = useState(false)
    const [datePickVisible, setDatePickVisible] = useState(false)
    const [updateMonth, setUpdateMonth] = useState(new Date())
    const authCtx = useContext(AuthContext)
    const staticdate = new Date()

    async function pushUpdate(){
        let year = updateMonth.getFullYear()
        let month = (updateMonth.getMonth()+1).toString().padStart(2, "0")
        let collection_key = year + "-" + month
        await axios.patch(`https://firestore.googleapis.com/v1/projects/stockcast-8db50/databases/(default)/documents/predictions/${collection_key}` ,{
            "fields":{
                "value":{
                    "doubleValue": pred
                },
                "month":{
                    "stringValue": collection_key
                }
            }
        })
    }
    
    function handleDateChange(event, value){
        console.log(event)
        if(event.type==="dismissed"){
            setDatePickVisible(false)
            console.log("dismissed")
        }
        else{
            setUpdateMonth(value)
            setDatePickVisible(false)
            console.log("updated")
            console.log(updateMonth)
        }
    }

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

    const [pred, setPred] = useState(authCtx.pred[1])

    function getPred(features){
        axios.post("https://tensorflowbrsensex.onrender.com/hello",{
            "instances": [features]
        })
        .then(res => setPred(res.data["prediction"]))
        .catch(err => console.log(err))
    }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.modal}> 
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={()=>setModalVisible(!modalVisible)}
            >
                <View style={styles.modalContentWrapper}>
                    {   
                        datePickVisible && 
                        <DateTimePicker
                            value={new Date(updateMonth)}
                            onChange={handleDateChange}
                            minimumDate={new Date(staticdate.getFullYear(), staticdate.getMonth(), 1)}
                            maximumDate={new Date(staticdate.getFullYear(), staticdate.getMonth()+2, 0)}
                        />
                    }
                    <Text style={styles.title}>Push Prediction Update</Text>
                    <Text>Updating for {monthNames[updateMonth.getMonth()]} {updateMonth.getFullYear()}</Text>
                    <Text>value: {pred}</Text>
                    <View style={styles.sideby}>
                        <Button
                            onPress={()=>setDatePickVisible(true)}
                            title="Choose Update Month"
                        />
                        <Button
                            onPress={()=>pushUpdate()}
                            title="Push Update"
                            color="#4BB543"
                        />
                    </View>
                    <View style={styles.soloBtn}>
                        <Button
                            onPress={()=>setModalVisible(false)}
                            title="Cancel"
                            color="red"
                        />
                    </View>
                </View>
            </Modal>
            </View>
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
                    try{
                        let features = instances.map(x => Number(x))
                        for(x of features){
                            if(isNaN(x) || x < 0.01) throw "Enter numbers greater than or equal to 0.1"
                        }
                        getPred(features)
                    }
                    catch(error){
                        Alert.alert("Error", error.message)
                    }
                }}>Get Prediction</FlatButton>
                <FlatButton onPress={()=>setModalVisible(!modalVisible)}>Update for Next Month</FlatButton>
            </View>
            <Text style={styles.highlight}>Prediction for next month: </Text>
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
    },
    sideby: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginVertical: 10
    },
    soloBtn: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "center"
    },
    modalContentWrapper: {
        padding: 15
    },
    title:{

    }
})
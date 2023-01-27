import { FlatList, Text, StyleSheet, View } from "react-native"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import SegmentItem from "../components/SegmentItem"
import { SEGMENTS } from "../segments"

function renderItem(itemData){
    return <SegmentItem title={itemData.item.title} color={itemData.item.color} onPress={()=>console.log(itemData.item.title)}/>
}

export default function MarketSegments(){
    return(
        <FlatList
            data={SEGMENTS}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            numColumns={2}
        />
    )
}

const styles = StyleSheet.create({
    pressable:{
        width: '50%'
    }
})
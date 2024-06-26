import { FlatList, StyleSheet } from "react-native"
import SegmentItem from "../components/SegmentItem"
import { SEGMENTS } from "../segments"
import { useNavigation } from "@react-navigation/native"

export default function MarketSegments(){
    const test = useNavigation()
    function renderItem(itemData){
        return <SegmentItem title={itemData.item.title} color={itemData.item.color} onPress={()=>test.navigate('Indices', {index: itemData.item.id, title: itemData.item.title})}/>
    }
    return(
        <FlatList
            data={SEGMENTS}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            numColumns={2}
        />
    )
}
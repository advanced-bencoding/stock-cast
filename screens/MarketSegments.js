import { FlatList, Text } from "react-native"
import SegmentItem from "../components/SegmentItem"
import { SEGMENTS } from "../segments"

function renderItem(itemData){
    return <SegmentItem title={itemData.item.title} color={itemData.item.color} />
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
import { Text, FlatList } from "react-native"
import AccountItem from "../components/AccountItem"

const items = ["Account Details", "Change Password", "Subscription Details", "Logout"]

function renderItem(item){
    return <AccountItem title={item.item} />
}

export default function Accounts(){
    return(
        <FlatList
            data={items}
            renderItem={renderItem}
        />
    )
}
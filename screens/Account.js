import { Text, FlatList, Pressable } from "react-native"
import AccountItem from "../components/AccountItem"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AccountDetails from "./Account/AccountDetails"
import ChangePassword from "./Account/ChangePassword"
import Subscription from "./Account/Subscription"

const items = [
    {name: "Change Password", id: 2, press: "ChangePassword"},
    {name: "Logout", id: 4, press:"Logout"}
]

function renderItem(item){
    return <AccountItem title={item.item.name} onPress={item.item.press}/>
}

function MainPage(){
    return (
        <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={ item => item.id }
        />
    )
}

export default function Accounts(){
    const Stack = createNativeStackNavigator()
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Account"
                component={MainPage}
            />
            <Stack.Screen 
                name="ChangePassword"
                component={ChangePassword}
            />
        </Stack.Navigator>
    )
}
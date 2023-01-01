import { Text, FlatList, Pressable } from "react-native"
import AccountItem from "../components/AccountItem"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AccountDetails from "./Account/AccountDetails"
import ChangePassword from "./Account/ChangePassword"
import Subscription from "./Account/Subscription"
import { useNavigation } from "@react-navigation/native"

const items = [
    {name: "Account Details", id: 1, press: "Details"},
    {name: "Change Password", id: 2, press: "ChangePassword"},
    {name: "Subscription Details", id: 3, press: "Subscription"},
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
    const nav = useNavigation()
    const Stack = createNativeStackNavigator()
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Account"
                component={MainPage}
            />
            <Stack.Screen 
                name="Details"
                component={AccountDetails}
            />
            <Stack.Screen 
                name="ChangePassword"
                component={ChangePassword}
            />
            <Stack.Screen 
                name="Subscription"
                component={Subscription}
            />
        </Stack.Navigator>
    )
}
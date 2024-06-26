import { StatusBar } from 'expo-status-bar';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Colors } from './constants/styles'
import { useContext } from 'react';
import { AuthContext, AuthContextProvider } from './store/auth-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'
import Accounts from './screens/Account';
import MarketSegments from './screens/MarketSegments';
import Admin from './screens/Admin';
import { DummyNifty } from './components/DummyNifty';

const Stack = createNativeStackNavigator()
const Tabs = createBottomTabNavigator()

function Unauthenticated(){
  return(
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary800},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: 'white'}
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
}

function Indices(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="MSegments" component={MarketSegments} options={{headerTitle: "Market Segments"}}/>
      <Stack.Screen name="Indices" component={DummyNifty} />
    </Stack.Navigator>
  )
}

function Authenticated({admin}){
  return(
    <Tabs.Navigator>
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused})=> focused ? <Ionicons name='home-sharp' size={30}/> : <Ionicons name='home-outline' size={30}/>
        }}
      />
      <Tabs.Screen
        name="Segments"
        component={Indices}
        options={{
          tabBarIcon: ({focused})=> focused ? <Ionicons name='pie-chart-sharp' size={30}/> : <Ionicons name='pie-chart-outline' size={30}/>,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Accounts"
        component={Accounts}
        options={{
          tabBarIcon: ({focused})=> focused ? <Ionicons name='settings-sharp' size={30}/> : <Ionicons name='settings-outline' size={30}/>,
          headerShown: false
        }}
      />
      {
        admin &&
        <Tabs.Screen
          name="Admin"
          component={Admin}
          options={{
            tabBarIcon: ({focused})=> focused ? <Ionicons name='hammer-sharp' size={30}/> : <Ionicons name='hammer-outline' size={30}/>
          }}
        />
      }
    </Tabs.Navigator>
  )
}

function Root(){
  const authCtx = useContext(AuthContext)
  return(
    <NavigationContainer>
      {!authCtx.isAuthenticated && <Unauthenticated />}
      {authCtx.isAuthenticated && <Authenticated admin={authCtx.isAdmin}/>}
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
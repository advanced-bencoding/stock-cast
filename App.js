import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Colors } from './constants/styles'
import { useContext } from 'react';
import { AuthContext } from './store/auth-context';

const Stack = createNativeStackNavigator()

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

function Authenticated(){
  return(
    <Text>Authenticated</Text>
  )
}

function Root(){
  const authCtx = useContext(AuthContext)
  return(
    <NavigationContainer>
      {!authCtx.isAuthenticated && <Unauthenticated />}
      {authCtx.isAuthenticated && <Authenticated />}
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Unauthenticated />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

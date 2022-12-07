import { createContext, useState } from "react";

export const AuthContext = createContext({
    token: '',
    authenticate: () =>{},
    logout: ()=>{},
    isAuthenticated: false
})

export function AuthContextProvider({children}){
    const [authToken, setAuthToken] = useState()

    const value = {
        token: authToken,
        authenticate: authenticate,
        isAuthenticated: !!authToken,
        logout: logout,
    }

    function authenticate(token){
        setAuthToken(token)
    }

    function logout(){
        setAuthToken(null)
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
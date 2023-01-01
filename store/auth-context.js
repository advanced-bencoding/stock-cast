import { createContext, useState } from "react";

export const AuthContext = createContext({
    token: '',
    authenticate: () =>{},
    logout: ()=>{},
    newPred: ()=>{},
    pred: 0,
    isAuthenticated: false
})

export function AuthContextProvider({children}){
    const [authToken, setAuthToken] = useState()
    const [pred, setPred] = useState(0)

    const value = {
        token: authToken,
        authenticate: authenticate,
        isAuthenticated: !!authToken,
        logout: logout,
        pred: pred,
        newPred: newPred
    }

    function authenticate(token){
        setAuthToken(token)
    }

    function logout(){
        setAuthToken(null)
    }

    function newPred(value){
        setPred(value)
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
import { createContext, useState } from "react";

export const AuthContext = createContext({
    token: '',
    authenticate: () =>{},
    logout: ()=>{},
    newPred: ()=>{},
    setAdmin: ()=>{},
    pred: 0,
    isAuthenticated: false,
    isAdmin: false
})

export function AuthContextProvider({children}){
    const [authToken, setAuthToken] = useState()
    const [pred, setPred] = useState(0)
    const [isAdmin, setIsAdmin] = useState(false)

    const value = {
        token: authToken,
        authenticate: authenticate,
        isAuthenticated: !!authToken,
        logout: logout,
        pred: pred,
        newPred: newPred,
        isAdmin: isAdmin,
        setAdmin: setAdmin
    }

    function authenticate(token){
        setAuthToken(token)
    }

    function setAdmin(admin){
        setIsAdmin(admin)
    }

    function logout(){
        setAuthToken(null)
    }

    function newPred(value){
        setPred(value)
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
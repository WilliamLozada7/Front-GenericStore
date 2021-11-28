import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const [dataUser, setDataUser] = useState({
        state : '',
        message : '',
        error : ''
    });

    useEffect(() => {
        try {
            localStorage.setItem("user", JSON.stringify(user))
        } catch (error) {
            localStorage.removeItem("user")
        }
    }, [user])

    const contextValue = {
        user,
        dataUser,
        login (logon, password) { 
            axios
            .post("http://localhost:8080/api/store/users/login", 
                {
                    "logon": logon,
                    "password": password
                })
            .then(response => {  
                if(response.data.state === "1"){
                    setUser(response.data.results)
                    setDataUser({
                        error : '',
                        message : response.data.message,
                        state : response.data.state
                    })
                }else{
                    setDataUser({
                        error : response.data.error,
                        message : response.data.message,
                        state : response.data.state
                    })
                }
                
            })
            .catch(error => console.log(error))
        },
        logout () { setUser(null);},
        isLogged() { return !! user}
    }
    return(
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;
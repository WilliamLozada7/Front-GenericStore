import React from "react";
import { Navigate } from "react-router";
import UseAuth from "../../auth/UseAuth";


export const PrivateRoute = ({children}) => {
    const auth = UseAuth();
    return ( auth.isLogged() ? children : <Navigate to ="/" />)
}

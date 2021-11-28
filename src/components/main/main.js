import React from "react";
import { Button } from "react-bootstrap";
import UseAuth from "../../auth/UseAuth";

export const Main = () => {

    const auth = UseAuth();

    const handleLogout = () => {
        auth.logout();
    }

    return(
        <div>
            <h1>Pagina principal</h1>
            <Button variant="outline-primary" size="sm" onClick={handleLogout}>Logout</Button>
        </div>
    )
}
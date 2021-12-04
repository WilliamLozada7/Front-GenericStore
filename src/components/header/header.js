import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import UseAuth from "../../auth/UseAuth";

export const Header = () => {
    const auth = UseAuth();

    const handleLogout = () => {
        auth.logout();
    }

    return(
        <Navbar expand="lg" variant="light" style={{ backgroundColor: "#e3f2fd"}}>
            <Container >
                <div id="imageMintic"></div>
                {auth.isLogged() &&  (
                <>
                    <div>GROCERY STORE - <b>{auth.user.name || JSON.parse(localStorage.getItem("user")).name}</b>
                    <div style={{textAlign:"center"}}>Branch Office - <b>{auth.user.branchOffice || JSON.parse(localStorage.getItem("user")).branchOffice}</b></div>
                </div>
                
                </>
                )}
                <div id="imageUbosque"></div>
            </Container>
            {auth.isLogged() && (
                <Button style={{margin:"0px 3rem"}} variant="outline-primary" size="sm" onClick={handleLogout}>Logout</Button>
            )}
        </Navbar>
    )
}
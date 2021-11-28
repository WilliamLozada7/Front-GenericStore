import React from "react";
import { Container, Navbar } from "react-bootstrap";

export const Header = () => {
    return(
        <Navbar expand="lg" variant="light" style={{ backgroundColor: "#e3f2fd"}}>
            <Container >
                <div id="imageMintic"></div>
                <div id="imageUbosque"></div>
            </Container>
        </Navbar>
    )
}
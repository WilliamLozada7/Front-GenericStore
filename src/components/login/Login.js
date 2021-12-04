import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../auth/UseAuth";
import { Footer } from "../footer/Footer";
import { Header } from "../header/header";
import { Modal } from "../modal/Modal";
import './Login.css';

export const Login = () => {

    const [userLogin, setUserLogin] = useState({
        logon : '',
        password : ''
    });

    const [message, setMessage] = useState({
        title: 'Error',
        message: '',
        messageX: 'just now',
        styleMessage: 'danger',
        show: true
    });

    const toggleShowMessage = () => setMessage({
        show:!message.show    
    });

    const handleChangeLogon = (e) => {
        const { target: { value } } = e;
        setUserLogin((state) => ({
            ...state,
            logon: value
        })); 
    }

    const handleChangePassword = (e) => {
        const { target: { value } } = e;
        setUserLogin((state) => ({
            ...state,
            password: value
        })); 
    }

    const auth = UseAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        auth.login(userLogin.logon, userLogin.password);
        setTimeout(navegar,100);
    }

    const handleRegister = () => {
        navigate('/registerUser')
    }

    const navegar = () =>{
        navigate('/home')
    }

    return (
        <React.Fragment>
            <Header/>
            <div id="divCard"> 
            <Card id='cardLogin'>
                <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/512/1828/1828506.png" />
                <Card.Title style={{textAlign: 'center'}}>Member Login</Card.Title>
                <Form>
                    <Form.Group>
                        <Form.Label>User:</Form.Label>
                        <Form.Control 
                            style={{textAlign: 'center'}}
                            type="text"
                            placeholder="Enter user"
                            value={userLogin.logon}
                            onChange={(e) => handleChangeLogon(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control 
                            style={{textAlign: 'center'}} 
                            type="password" 
                            placeholder="Enter password" 
                            vale={userLogin.password}
                            onChange={(e) => handleChangePassword(e)}
                        />
                        <Form.Label></Form.Label>
                    </Form.Group>
                </Form>
                <Button variant="outline-primary" size="sm" onClick={handleLogin}>Login</Button>
                <Button variant="link" onClick={handleRegister}>No account? Create One!</Button>
            </Card>
            </div>
            <Footer></Footer>
            {auth.dataUser.state === "0" &&  (
                {toggleShowMessage},
                <Modal title={auth.dataUser.error} message={auth.dataUser.message } messageX={message.messageX} 
                styleMessage={message.styleMessage} show={message.show} onClose={toggleShowMessage}/>
            )}
        </React.Fragment>
    );
}
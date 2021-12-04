import axios from "axios";
import React, { useState } from "react";
import { Card, Button, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Footer } from "../footer/Footer";
import { Header } from "../header/header";
import { Modal } from "../modal/Modal";
import './RegisterUser.css'

export const RegisterUser = () => {
    const [state, setState] = useState({
        name: "",
        id: "",
        email: "",
        branchOffice: "",
        address: "",
        username: "",
        password: "",
        cpassword: ""
    });

    const [message, setMessage] = useState({
        title: '',
        message: '',
        messageX: '',
        styleMessage: '',
        show: false
    });

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        e.target.className += " was-validated";
    };

    const handleChangeName = (e) => {
        const { target: { value } } = e;
        setState((state) => ({
            ...state,
            name: value
        })); 
    }
    const handleChangeId = (e) => {
        const { target: { value } } = e;
        setState((state) => ({
            ...state,
            id: value
        })); 
    }
    const handleChangeEmail = (e) => {
        const { target: { value } } = e;
        setState((state) => ({
            ...state,
            email: value
        })); 
    }
    const handleChangeBranchOffice = (e) => {
        const { target: { value } } = e;
        setState((state) => ({
            ...state,
            branchOffice: value
        })); 
    }
    const handleChangeAddress = (e) => {
        const { target: { value } } = e;
        setState((state) => ({
            ...state,
            address: value
        })); 
    }
    const handleChangeUsername = (e) => {
        const { target: { value } } = e;
        setState((state) => ({
            ...state,
            username: value
        })); 
    }
    const handleChangePassword = (e) => {
        const { target: { value } } = e;
        setState((state) => ({
            ...state,
            password: value
        })); 
    }
    const handleChangeCPassword = (e) => {
        const { target: { value } } = e;
        setState((state) => ({
            ...state,
            cpassword: value
        })); 
    }

    const submitHandle = async () => {
        if(state.name ==="" || state.id ==="" || state.email==="" || state.branchOffice ===""
        || state.address ==="" || state.username === "" || state.password ==="" || state.cpassword ===""){
            setMessage({
                title: 'Error',
                message: '¡Empty data, check again!',
                messageX: 'just now',
                styleMessage: 'warning',
                show: true
            })
        }else if(state.password !== state.cpassword){
            setMessage({
                title: 'Error',
                message: 'Different passwords, check again',
                messageX: 'just now',
                styleMessage: 'danger',
                show: true
            })
        }
        else{
            axios
                .post("http://localhost:8080/api/store/users/register", 
                    {
                        "userAddres": state.address,
                        "userBranchOffice": state.branchOffice,
                        "userEmail": state.email,
                        "userId": state.id,
                        "userLogon": state.username,
                        "userName": state.name,
                        "userPassword": state.password
                    })
                .then(response => {  
                    if(response.data.state === "1"){
                        setMessage({
                            title: 'Success',
                            message: response.data.message,
                            messageX: 'just now',
                            styleMessage: 'success',
                            show: true
                        })
                        setTimeout(messageSuccess, 2000);
                        
                    }else{
                        setMessage({
                            title: 'Error',
                            message: response.data.message + " " + response.data.error,
                            messageX: 'just now',
                            styleMessage: 'danger',
                            show: true
                        })
                        
                    }
                })
                .catch(error => console.log(error))
        }
    }

    const cancelHandle = () => {
        navigate('/')
    }

    const toggleShowMessage = () => setMessage({
        show:!message.show    
    });

    const messageSuccess = () => {
        setMessage({
            show: false
        })
        cancelHandle()
    }

    return(
        <React.Fragment>
            <Header/>
            <div id="divRegister"> 
                <Card id='cardRegister'>
                    <Card.Header as="h2">Register User</Card.Header>
                    <Card.Body>
                    <form className="needs-validation" onSubmit={submitHandler} noValidate>
                        <div className="row mb-2">
                            <div className="col-4">
                                <label >Name: </label>
                            </div>
                            <div className="col-sm">
                                <input
                                    value={state.name}
                                    name="name"
                                    onChange={handleChangeName}
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-4">
                                <label >Identification code: </label>
                            </div>
                            <div className="col-sm">
                                <input
                                    value={state.id}
                                    name="id"
                                    onChange={handleChangeId}
                                    type="text"
                                    className="form-control"
                                    placeholder="Identification code"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-4">
                                <label >Email: </label>
                            </div>
                            <div className="col-sm">
                                <input
                                    value={state.email}
                                    name="email"
                                    onChange={handleChangeEmail}
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-4">
                                <label >City: </label>
                            </div>
                            <div className="col-sm">
                                <input
                                    value={state.branchOffice}
                                    name="branchOffice"
                                    onChange={handleChangeBranchOffice}
                                    type="text"
                                    className="form-control"
                                    placeholder="City"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-4">
                                <label >Address: </label>
                            </div>
                            <div className="col-sm">
                                <input
                                    value={state.address}
                                    name="address"
                                    onChange={handleChangeAddress}
                                    type="text"
                                    className="form-control"
                                    placeholder="Address"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-4">
                                <label >Username: </label>
                            </div>
                            <div className="col-sm">
                                <input
                                    value={state.username}
                                    name="username"
                                    onChange={handleChangeUsername}
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-4">
                                <label >Password: </label>
                            </div>
                            <div className="col-sm">
                                <input
                                    value={state.password}
                                    name="password"
                                    onChange={handleChangePassword}
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-4">
                                <label >Confirm password: </label>
                            </div>
                            <div className="col-sm">
                                <input
                                    value={state.cpassword}
                                    name="cpassword"
                                    onChange={handleChangeCPassword}
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm password"
                                    required
                                />
                            </div>
                        </div>
                        <ButtonToolbar id="divButtonGroup"aria-label="Toolbar with button groups">
                            <ButtonGroup className=" me-5" aria-label="First group">
                                <Button type="submit" value="Submit" onClick={submitHandle} variant="outline-primary">Register</Button>
                            </ButtonGroup>
                            <ButtonGroup className=" me-2" aria-label="Second group">
                                <Button variant="outline-primary" onClick={cancelHandle}>Cancel</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </form>
                    </Card.Body>
                </Card>
                <Modal title={message.title} message={message.message} messageX={message.messageX} 
                    styleMessage={message.styleMessage} show={message.show} onClose={toggleShowMessage}/>
            </div>
            <Footer/>
        </React.Fragment>
        
    )
}
import axios from "axios";
import React, { useState } from "react";
import { ButtonGroup, ButtonToolbar, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import UseAuth from "../../auth/UseAuth";
import { Modal } from "../../components/modal/Modal";

export const RegisterProvider = () => {

    const auth = UseAuth();

    const [message, setMessage] = useState({
        title: '',
        message: '',
        messageX: '',
        styleMessage: '',
        show: false
    });

    const navigate = useNavigate();

    const [state, setState] = useState({
        nit: "",
        name: "",
        email: "",
        phone: "",
        city: ""
    });

    const handleChange = (e) => {
        const { target: {value}} = e;
        setState((state) => ({
            ...state,
            [e.target.name]: value
        }));
    }

    const submitHandler = (e) => {
        e.preventDefault();
        e.target.className += " was-validated";
    };

    const submitHandle = async () => {
        if(state.name ==="" || state.code ==="" || state.providerNIT==="" || state.acquisitionPrice ===""
        || state.acquisitionIVA ==="" || state.sellingPrice === ""){
            setMessage({
                title: 'Error',
                message: '¡Empty data, check again!',
                messageX: 'just now',
                styleMessage: 'warning',
                show: true
            })
        }
        else{
            axios
                .post("http://localhost:8080/api/store/provider/registerProvider", 
                    {
                        "providerPhone": state.phone,
                        "providerCity": state.city,
                        "providerEmail": state.email,
                        "providerNIT": state.nit,
                        "providerName": state.name
                    },
                    {
                        headers : {
                            "authorization": auth.user.token || JSON.parse(localStorage.getItem("user")).token
                        }
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
                .catch(error => {
                    console.log(error)
                })
        }
        console.log("datos: " + state)
    }

    const cancelHandle = () => {
        navigate('/home/proveedores')
    }

    const toggleShowMessage = () => setMessage({
        show:!message.show    
    });

    return(
        <React.Fragment>
            <div id="divRegister"> 
                <Card id='cardRegister'>
                    <Card.Header as="h2">Register Provider</Card.Header>
                    <Card.Body>
                    <form className="needs-validation" onSubmit={submitHandler} noValidate>
                        <div className="row mb-2">
                            <div className="col-4">
                                <label >NIT: </label>
                            </div>
                            <div className="col-sm">
                                <input
                                    value={state.nit}
                                    name="nit"
                                    onChange={handleChange}
                                    type="number"
                                    className="form-control"
                                    placeholder="NIT"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-4">
                                <label >Name: </label>
                            </div>
                            <div className="col-sm">
                                <input
                                    value={state.name}
                                    name="name"
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
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
                                    onChange={handleChange}
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-4">
                                <label >Phone: </label>
                            </div>
                            <div className="col-sm">
                                <input
                                    value={state.phone}
                                    name="phone"
                                    onChange={handleChange}
                                    type="number"
                                    className="form-control"
                                    placeholder="Phone"
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
                                    value={state.city}
                                    name="city"
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                    placeholder="City"
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
        </React.Fragment>
    )
}
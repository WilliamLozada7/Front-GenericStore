import axios from "axios";
import React, { useState } from "react";
import { ButtonGroup, ButtonToolbar, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import UseAuth from "../../auth/UseAuth";
import { Modal } from "../modal/Modal";

export const RegisterProduct = () => {

    const auth = UseAuth();
    const navigate = useNavigate();

    const [message, setMessage] = useState({
        title: '',
        message: '',
        messageX: '',
        styleMessage: '',
        show: false
    });

    const submitHandler = (e) => {
        e.preventDefault();
        e.target.className += " was-validated";
        console.log(e)
    };

    const handleChange = (e) => {
        const { target: {value}} = e;
        setState((state) => ({
            ...state,
            [e.target.name]: value
        }));
    }

    const [state, setState] = useState({
        code: "",
        name: "",
        providerNIT: "",
        acquisitionPrice: "",
        acquisitionIVA: "",
        sellingPrice: ""
    });

    const cancelHandle = () => {
        navigate('/home/productos')
    }

    const toggleShowMessage = () => setMessage({
        show:!message.show    
    });

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
                .post("http://localhost:8080/api/store/loadProducts/registerProduct", 
                    {
                        "productCode": parseInt(state.code),
                        "productName": state.name,
                        "providerNIT": parseInt(state.providerNIT),
                        "acquisitionPrice": parseFloat(state.acquisitionPrice),
                        "acquisitionIVA": parseFloat(state.acquisitionIVA),
                        "sellingPrice": parseFloat(state.sellingPrice)
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

    return(
        <React.Fragment>
            <div id="divRegister"> 
                <Card id='cardRegister'>
                    <Card.Header as="h2">Register Product</Card.Header>
                    <Card.Body>
                    <form className="needs-validation" onSubmit={submitHandler} noValidate>
                        <div className="row mb-2">
                            <div className="col-4">
                                <label >Code: </label>
                            </div>
                            <div className="col-sm">
                                <input
                                    value={state.code}
                                    name="code"
                                    onChange={handleChange}
                                    type="number"
                                    className="form-control"
                                    placeholder="Code"
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
                                <label >Provider NIT: </label>
                            </div>
                            <div className="col-sm">
                                <input
                                    value={state.providerNIT}
                                    name="providerNIT"
                                    onChange={handleChange}
                                    type="number"
                                    className="form-control"
                                    placeholder="Provider NIT"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-4">
                                <label >Acquisition Price: </label>
                            </div>
                            <div className="col-sm">
                                <input
                                    value={state.acquisitionPrice}
                                    name="acquisitionPrice"
                                    onChange={handleChange}
                                    type="number"
                                    className="form-control"
                                    placeholder="Acquisition Price"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-4">
                                <label >Acquisition IVA: </label>
                            </div>
                            <div className="col-sm">
                                <input
                                    value={state.acquisitionIVA}
                                    name="acquisitionIVA"
                                    onChange={handleChange}
                                    type="number"
                                    className="form-control"
                                    placeholder="Acquisition IVA"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-4">
                                <label >Selling  Price: </label>
                            </div>
                            <div className="col-sm">
                                <input
                                    value={state.sellingPrice}
                                    name="sellingPrice"
                                    onChange={handleChange}
                                    type="number"
                                    className="form-control"
                                    placeholder="Selling  Price"
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
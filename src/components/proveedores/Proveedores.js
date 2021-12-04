import axios from "axios";
import React, { Fragment } from "react";
import { Table, Button, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import UseAuth from "../../auth/UseAuth";

export const Proveedores = ({ providers }) => {

    const auth = UseAuth();

    const deleteProvider = (e) => {
        axios
            .delete("http://localhost:8080/api/store/provider/deleteProvider/"+e.target.name,
                {
                    headers : {
                        "authorization": auth.user.token || JSON.parse(localStorage.getItem("user")).token
                    }
                })
    }
    return(
        <>
        <div id="tableProducts">
        <ButtonToolbar className="mb-2 mt-2" id="divButtonGroup"aria-label="Toolbar with button groups">
                <ButtonGroup className=" me-5" aria-label="First group">
                    <Button className="bottonRegister" size="sm" variant="outline-primary"><Link style={{textDecoration:"none", color:"#0d6efd"}} to = {"registerprovider"}>Register Provider</Link></Button>
                </ButtonGroup>
            </ButtonToolbar>
            <Table striped bordered hover size="sm" responsive="sm" style={{width:"99.9%"}}>
                <thead style={{textAlign:"center"}}>
                    <th>NIT</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </thead>
                {providers !== null && (
                <tbody>
                    {
                        providers.map((provider) => {
                            
                            return(
                                <Fragment>
                                    <tr>
                                        <td>{provider.providerNIT}</td>
                                        <td>{provider.providerName}</td>
                                        <td>{provider.providerEmail}</td>
                                        <td>{provider.providerPhone}</td>
                                        <td>{provider.providerCity}</td>
                                        <td >
                                            <div style={{display: "flex" , justifyContent:"center"}}>
                                                
                                                <Button className="bottonEdit" size="sm" variant="outline-info"><Link style={{textDecoration:"none", color:"#0dcaf0"}} to = {provider._id}>Edit</Link></Button>
                                            </div>
                                        </td>
                                        <td >
                                            <div style={{display: "flex" , justifyContent:"center"}}>
                                                <Button size="sm" variant="outline-danger" name={provider._id} onClick={deleteProvider}>Delete</Button>
                                            </div>
                                        </td>
                                    </tr>
                                </Fragment>
                            )
                        })
                    }
                </tbody>
                )}
            </Table>
        </div>
        </>
    )
}
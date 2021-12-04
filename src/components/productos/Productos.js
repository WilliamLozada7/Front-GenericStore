import axios from "axios";
import React, { Fragment } from "react";
import { Button, ButtonGroup, ButtonToolbar,Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import UseAuth from "../../auth/UseAuth";
import './Productos.css'

export const Productos = ({ productos })  => {

    const productosDB = productos;
    const auth = UseAuth();
    
    const currency = (number) =>{
        return new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD', minimumFractionDigits: 2}).format(number);
    }

    const deleteProduct = (e) => {
        axios
            .delete("http://localhost:8080/api/store/loadProducts/deleteProduct/"+e.target.name,
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
                    <Button className="bottonRegister" size="sm" variant="outline-primary"><Link style={{textDecoration:"none", color:"#0d6efd"}} to = {"registerproduct"}>Register Product</Link></Button>
                </ButtonGroup>
                <ButtonGroup className=" me-2" aria-label="Second group">
                    <Button className="bottonRegister" size="sm" variant="outline-primary"><Link style={{textDecoration:"none", color:"#0d6efd"}} to = {"registerproducts"}>Register Products</Link></Button>
                </ButtonGroup>
            </ButtonToolbar>
            <Table striped bordered hover size="sm" responsive="sm" style={{width:"99.9%"}}>
                <thead style={{textAlign:"center"}}>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Provider NIT</th>
                    <th>Acquisition Price</th>
                    <th>Adquisicion IVA</th>
                    <th>Selling Price</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </thead>
                {productosDB !== null && (
                <tbody>
                    {
                        productosDB.map((producto) => {
                            
                            return(
                                <Fragment>
                                    <tr>
                                        <td>{producto.productCode}</td>
                                        <td>{producto.productName}</td>
                                        <td>{producto.providerNIT}</td>
                                        <td>{currency(producto.acquisitionPrice)}</td>
                                        <td>{producto.acquisitionIVA}</td>
                                        <td>{currency(producto.sellingPrice)}</td>
                                        <td >
                                            <div style={{display: "flex" , justifyContent:"center"}}>
                                                
                                                <Button className="bottonEdit" size="sm" variant="outline-info"><Link style={{textDecoration:"none", color:"#0dcaf0"}} to = {producto._id}>Edit</Link></Button>
                                            </div>
                                        </td>
                                        <td >
                                            <div style={{display: "flex" , justifyContent:"center"}}>
                                                <Button size="sm" variant="outline-danger" name={producto._id} onClick={deleteProduct}>Delete</Button>
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
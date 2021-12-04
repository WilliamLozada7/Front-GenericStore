import React, { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import { PrivateRoute } from "../privateRoute/privateRoute";
import { Productos } from "../productos/Productos";
import { Clientes } from "../clientes/Clientes";
import { Proveedores } from "../proveedores/Proveedores";
import { Reportes } from "../reportes/Reportes";
import { Ventas } from "../ventas/Ventas";
import './NavMenu.css'
import axios from "axios";
import UseAuth from "../../auth/UseAuth";
import { EditProducts } from "../../auth/edit/EditProducts";
import { RegisterProduct } from "../registerUser/RegisterProduct";
import { EditProviders } from "../../auth/edit/EditProviders";
import { RegisterProvider } from "../registerUser/RegisterProvider";

export const NavMenu = () => {
    const auth = UseAuth();

    const [productosDB, setProductosDB] = useState(null);
    const [clientsDB, setClientsDB] = useState(null);
    const [providersDB, setProvidersDB] = useState(null);

    const getProducts = async () => {
        await axios.get("http://localhost:8080/api/store/loadProducts/getProduct", {
            headers : {
                "authorization": auth.user.token || JSON.parse(localStorage.getItem("user")).token
            }
        })
        .then(response => {
            if(response.data.state === "1"){
                setProductosDB(response.data.results)
            }
        })
    }
    
    const getClients = async () => {
        await axios.get("http://localhost:8080/api/store/users/getUsers", {
            headers : {
                "authorization": auth.user.token || JSON.parse(localStorage.getItem("user")).token
            }
        })
        .then(response => {
            if(response.data.state === "1"){
                setClientsDB(response.data.results)
            }
        })
    }

    const getProviders = async () => {
        await axios.get("http://localhost:8080/api/store/provider/getProviders", {
            headers : {
                "authorization": auth.user.token || JSON.parse(localStorage.getItem("user")).token
            }
        })
        .then(response => {
            if(response.data.state === "1"){

                setProvidersDB(response.data.results)
            }
        })
    }
    
    return (
        <Container>
            <Nav className="justify-content-center" variant="tabs" >
                <Nav.Item onClick={getProducts}>
                    <Nav.Link as="div" eventKey="productos">
                        <Link  to="productos">Productos</Link>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={getClients}>
                    <Nav.Link as="div" eventKey="clientes">
                        <Link to="clientes">Clientes</Link>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={getProviders}>
                <Nav.Link  as="div" eventKey="proveedores">
                        <Link to="proveedores">Proveedores</Link>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link as="div"  eventKey="ventas">
                        <Link to="ventas">Ventas</Link>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link  as="div" eventKey="reportes">
                        <Link to="reportes">Reportes</Link>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <Routes>
                <Route exact path="productos" element= {<PrivateRoute><Productos productos = {productosDB}/></PrivateRoute>}/>
                <Route path="clientes" element= {<PrivateRoute><Clientes clients = {clientsDB}/></PrivateRoute>}/>
                <Route path="proveedores" element= {<PrivateRoute><Proveedores providers = {providersDB}/></PrivateRoute>}/>
                <Route path="ventas" element= {<PrivateRoute><Ventas/></PrivateRoute>}/>
                <Route path="reportes" element= {<PrivateRoute><Reportes/></PrivateRoute>}/>
                <Route exact path="productos/:id" element= {<PrivateRoute><EditProducts/></PrivateRoute>}/>
                <Route exact path="productos/registerproduct" element= {<PrivateRoute><RegisterProduct></RegisterProduct></PrivateRoute>}/>
                <Route exact path="productos/registerproducts" element= {<PrivateRoute><h1>Registrar productos</h1></PrivateRoute>}/>
                <Route exact path="proveedores/:id" element= {<PrivateRoute><EditProviders/></PrivateRoute>}/>
                <Route exact path="proveedores/registerprovider" element= {<PrivateRoute><RegisterProvider/></PrivateRoute>}/>
            </Routes>
        </Container>
    )
}



import axios from "axios";
import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import UseAuth from "../../auth/UseAuth";
import { Modal } from "../modal/Modal";

export const Ventas = () => {

    const auth = UseAuth();

    const [state, setState] = useState({
        idUser: "",
        nameUser: ""
    });

    const [consecutive, setConsecutive] = useState({
        saleConsecutive: ""
    })

    let products = []

    const [sales, setSales] = useState({
        totalSale: "",
        totalIVA: "",
        totalSaleIVA: ""
    })

    const [product1, setProduct1] = useState(null);
    const [product2, setProduct2] = useState(null);
    const [product3, setProduct3] = useState(null);

    const [productState1, setProductState1] = useState({
        codeProduct1 : "",
        nameProduct1 : "",
        quantityProduct1 : "",
        totalValueProduct1 : "",
        acquisitionPrice1 : ""
    });
    const [productState2, setProductState2] = useState({
        codeProduct2 : "",
        nameProduct2 : "",
        quantityProduct2 : "",
        totalValueProduct2 : "",
        acquisitionPrice2 : ""
    });
    const [productState3, setProductState3] = useState({
        codeProduct3 : "",
        nameProduct3 : "",
        quantityProduct3 : "",
        totalValueProduct3 : "",
        acquisitionPrice3 : ""
    });

    const [message, setMessage] = useState({
        title: '',
        message: '',
        messageX: '',
        styleMessage: '',
        show: false
    });

    const handleChange = (e) => {
        const { target: {value}} = e;
        console.log(value)
        setProductState1((status) => ({
            ...status,
            [e.target.name]: value
        }));
        setProductState2((status) => ({
            ...status,
            [e.target.name]: value
        }));
        setProductState3((status) => ({
            ...status,
            [e.target.name]: value
        }));
        setState((status) => ({
            ...status,
            [e.target.name]: value
        }));

        if(e.target.name === "quantityProduct1"){
            if(product1 !== null){
                const valueProduct = parseFloat(value)*parseFloat(product1.sellingPrice)
                if(value !== ""){
                    setProductState1({
                        totalValueProduct1: valueProduct,
                        quantityProduct1: value
                    })
                }
            }
        }

        if(e.target.name === "quantityProduct2"){
            if(product2 !== null){
                const valueProduct = parseFloat(value)*parseFloat(product2.sellingPrice)
                if(value !== ""){
                    setProductState2({
                        totalValueProduct2: valueProduct,
                        quantityProduct2: value
                    })
                }
            }
        }

        if(e.target.name === "quantityProduct3"){
            if(product3 !== null){
                const valueProduct = parseFloat(value)*parseFloat(product3.sellingPrice)
                if(value !== ""){
                    setProductState3({
                        totalValueProduct3: valueProduct,
                        quantityProduct3: value
                    })
                }
            }
        }
        
    }

    const findUser = async () => {
        if(state.idUser===""){
            setMessage({
                title: 'Error',
                message: '¡Empty data, check again!',
                messageX: 'just now',
                styleMessage: 'warning',
                show: true
            })
        }else{
            axios.get("http://localhost:8080/api/store/users/getUser/"+state.idUser,
            {
                headers : {
                    "authorization": auth.user.token || JSON.parse(localStorage.getItem("user")).token
                }
            })
            .then(response => {
                if(response.data.state === "1"){
                    setState({
                        idUser: response.data.results.userId,
                        nameUser:response.data.results.userName
                    })
                }
                else{
                    setMessage({
                        title: 'Error',
                        message: response.data.message + " " + response.data.error,
                        messageX: 'just now',
                        styleMessage: 'danger',
                        show: true
                    })
                }
            })
        }
    }

    const toggleShowMessage = () => setMessage({
        show:!message.show    
    });

    const getProduct1 = async () => {
        if(productState1.codeProduct1===""){
            setMessage({
                title: 'Error',
                message: '¡Empty code, check again!',
                messageX: 'just now',
                styleMessage: 'warning',
                show: true
            })
        }else{
            axios.get("http://localhost:8080/api/store/loadProducts/getProductByCode/"+productState1.codeProduct1,
            {
                headers : {
                    "authorization": auth.user.token || JSON.parse(localStorage.getItem("user")).token
                }
            })
            .then(response => {
                if(response.data.state==="1"){
                    setProductState1({
                        nameProduct1: response.data.results.productName
                    })
                    setProduct1(response.data.results)
                }else{
                    setMessage({
                        title: 'Error',
                        message: response.data.message + " " + response.data.error,
                        messageX: 'just now',
                        styleMessage: 'danger',
                        show: true
                    })
                }
            }
            )
        }
    }

    const getProduct2 = async () => {
        if(productState2.codeProduct2===""){
            setMessage({
                title: 'Error',
                message: '¡Empty code, check again!',
                messageX: 'just now',
                styleMessage: 'warning',
                show: true
            })
        }else{
            axios.get("http://localhost:8080/api/store/loadProducts/getProductByCode/"+productState2.codeProduct2,
            {
                headers : {
                    "authorization": auth.user.token || JSON.parse(localStorage.getItem("user")).token
                }
            })
            .then(response => {
                if(response.data.state==="1"){
                    setProductState2({
                        nameProduct2: response.data.results.productName
                    })
                    setProduct2(response.data.results)
                }else{
                    setMessage({
                        title: 'Error',
                        message: response.data.message + " " + response.data.error,
                        messageX: 'just now',
                        styleMessage: 'danger',
                        show: true
                    })
                }
            }
            )
        }
    }

    const getProduct3 = async () => {
        if(productState3.codeProduct3===""){
            setMessage({
                title: 'Error',
                message: '¡Empty code, check again!',
                messageX: 'just now',
                styleMessage: 'warning',
                show: true
            })
        }else{
            axios.get("http://localhost:8080/api/store/loadProducts/getProductByCode/"+productState3.codeProduct3,
            {
                headers : {
                    "authorization": auth.user.token || JSON.parse(localStorage.getItem("user")).token
                }
            })
            .then(response => {
                if(response.data.state==="1"){
                    setProductState3({
                        nameProduct3: response.data.results.productName
                    })
                    setProduct3(response.data.results)
                }else{
                    setMessage({
                        title: 'Error',
                        message: response.data.message + " " + response.data.error,
                        messageX: 'just now',
                        styleMessage: 'danger',
                        show: true
                    })
                }
            }
            )
        }
    }

    const confirmSale = () => {
        let totalSaleFinal = 0;
        let totalIVAFinal = 0;
        let totalSaleIVAFinal = 0;
        let productSend1 = {};
        let productSend2 = {};
        let productSend3 = {};
        console.log(state)
        if(state.nameUser===""){
            setMessage({
                title: 'Error',
                message: '¡Empty name, check again!',
                messageX: 'just now',
                styleMessage: 'warning',
                show: true
            })
        }else{
            if(productState1.quantityProduct1 !== undefined && productState1.quantityProduct1 !== "0" && productState1.quantityProduct1 !== ""){
                totalSaleFinal +=  parseFloat(productState1.quantityProduct1)*product1.acquisitionPrice
                totalSaleIVAFinal += parseFloat(productState1.quantityProduct1)*product1.sellingPrice
                totalIVAFinal += parseFloat(productState1.quantityProduct1)*product1.sellingPrice - parseFloat(productState1.quantityProduct1)*product1.acquisitionPrice;
                productSend1 = {
                    "detailIvaValue": (parseFloat(productState1.quantityProduct1)*product1.sellingPrice - parseFloat(productState1.quantityProduct1)*product1.acquisitionPrice).toString(),
                    "detailProductCode": (product1.productCode).toString(),
                    "detailProductQuantity": productState1.quantityProduct1,
                    "detailSalesValue": (parseFloat(productState1.quantityProduct1)*product1.acquisitionPrice).toString(),
                    "detailTotalValue": (parseFloat(productState1.quantityProduct1)*product1.sellingPrice).toString()
                }
                products.push(productSend1)
            }
            if(productState2.quantityProduct2 !== undefined && productState2.quantityProduct2 !== "0" && productState2.quantityProduct2 !== ""){
                totalSaleFinal +=  parseFloat(productState2.quantityProduct2)*product2.acquisitionPrice
                totalSaleIVAFinal += parseFloat(productState2.quantityProduct2)*product2.sellingPrice
                totalIVAFinal += parseFloat(productState2.quantityProduct2)*product2.sellingPrice - parseFloat(productState2.quantityProduct2)*product2.acquisitionPrice;
                productSend2 = {
                    "detailIvaValue": (parseFloat(productState2.quantityProduct2)*product2.sellingPrice - parseFloat(productState2.quantityProduct2)*product2.acquisitionPrice).toString(),
                    "detailProductCode": (product2.productCode).toString(),
                    "detailProductQuantity": productState2.quantityProduct2,
                    "detailSalesValue": (parseFloat(productState2.quantityProduct2)*product2.acquisitionPrice).toString(),
                    "detailTotalValue": (parseFloat(productState2.quantityProduct2)*product2.sellingPrice).toString()
                }
                products.push(productSend2)
            }
            if(productState3.quantityProduct3 !== undefined && productState3.quantityProduct3 !== "0" && productState3.quantityProduct3 !== ""){
                totalSaleFinal +=  parseFloat(productState3.quantityProduct3)*product3.acquisitionPrice
                totalSaleIVAFinal += parseFloat(productState3.quantityProduct3)*product3.sellingPrice
                totalIVAFinal += parseFloat(productState3.quantityProduct3)*product3.sellingPrice - parseFloat(productState3.quantityProduct3)*product3.acquisitionPrice;
                productSend3 = {
                    "detailIvaValue": (parseFloat(productState3.quantityProduct3)*product3.sellingPrice - parseFloat(productState3.quantityProduct3)*product3.acquisitionPrice).toString(),
                    "detailProductCode": (product3.productCode).toString(),
                    "detailProductQuantity": productState3.quantityProduct3,
                    "detailSalesValue": (parseFloat(productState3.quantityProduct3)*product3.acquisitionPrice).toString(),
                    "detailTotalValue": (parseFloat(productState3.quantityProduct3)*product3.sellingPrice).toString()
                }
                products.push(productSend3)
            }
            console.log(state.idUser)
            axios.post("http://localhost:8080/api/store/sale/registerSale",
            {
                "saleBranchOffice": auth.user.branchOffice || JSON.parse(localStorage.getItem("user")).branchOffice,
                "saleDatailSale": products,
                "saleIvaSales": totalIVAFinal.toString(),
                "saleSalesValue": totalSaleFinal.toString(),
                "saleTotalSale": totalSaleIVAFinal.toString(),
                "saleUserId": state.idUser
            },
            {
                headers : {
                    "authorization": auth.user.token || JSON.parse(localStorage.getItem("user")).token
                }
            })
            .then(response => {
                if(response.data.state === "1"){
                    setConsecutive({
                        saleConsecutive:  response.data.results
                    })
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

            setSales({
                totalSale: totalSaleFinal,
                totalIVA: totalIVAFinal,
                totalSaleIVA: totalSaleIVAFinal
            })
        }
    }


    return(
        <>
        <Table className="mt-5" hover size="sm" responsive="sm" style={{width:"99.9%"}}>
            <thead className="mb-10" style={{textAlign:"center"}}>
                <th>Code Id:</th>
                <th>
                    <input
                        value={state.idUser}
                        name="idUser"
                        onChange={handleChange}
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="ID Client"
                        required
                    />
                </th>
                <th>
                    <Button size="sm" variant="outline-primary" onClick={findUser}>Consult</Button>
                </th>
                <th>Client: </th>
                <th>
                    <input
                        value={state.nameUser}
                        name="nameUser"
                        onChange={handleChange}
                        type="text"
                        className="form-control form-control-sm"
                        readOnly="readOnly"
                        placeholder="Name User"
                        required
                    />
                </th>
                <th>Consecutive:</th>
                <th>
                    <input
                        value={consecutive.saleConsecutive}
                        name="saleConsecutive"
                        onChange={handleChange}
                        type="text"
                        className="form-control form-control-sm"
                        readOnly="readOnly"
                        placeholder="Consecutive"
                        required
                    />
                </th>
            </thead>
            <tbody>
                <tr>
                    <th colSpan="2">Code Product</th>
                    <th colSpan="3">Name Product</th>
                    <th>Quantity</th>
                    <th>Total Value</th>
                </tr>
                <tr>
                    <td>
                        <input
                            value={productState1.codeProduct1}
                            name="codeProduct1"
                            onChange={handleChange}
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="Code"
                            required
                        />
                    </td>
                    <td>
                        <div style={{display: "flex" , justifyContent:"center"}}>
                            <Button size="sm" variant="outline-primary" onClick={getProduct1}>Consult</Button>
                        </div>
                    </td>
                    <td colSpan="3">
                        <input
                            value={productState1.nameProduct1}
                            name="nameProduct1"
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-sm"
                            readOnly="readOnly"
                            placeholder="Name Product"
                            required
                        />
                    </td>
                    <td>
                        <input
                            value={productState1.quantityProduct1}
                            name="quantityProduct1"
                            onChange={handleChange}
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="Quantity"
                            required
                        />
                    </td>
                    <td>
                        <input
                            value={productState1.totalValueProduct1}
                            name="totalValueProduct1"
                            on
                            onChange={handleChange}
                            type="number"
                            className="form-control form-control-sm"
                            readOnly="readOnly"
                            placeholder="Total"
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input
                            value={productState2.codeProduct2}
                            name="codeProduct2"
                            onChange={handleChange}
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="Code"
                            required
                        />
                    </td>
                    <td>
                        <div style={{display: "flex" , justifyContent:"center"}}>
                            <Button size="sm" variant="outline-primary" onClick={getProduct2}>Consult</Button>
                        </div>
                    </td>
                    <td colSpan="3">
                        <input
                            value={productState2.nameProduct2}
                            name="nameProduct2"
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-sm"
                            readOnly="readOnly"
                            placeholder="Name Product"
                            required
                        />
                    </td>
                    <td>
                        <input
                            value={productState2.quantityProduct2}
                            name="quantityProduct2"
                            onChange={handleChange}
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="Quantity"
                            required
                        />
                    </td>
                    <td>
                        <input
                            value={productState2.totalValueProduct2}
                            name="totalValueProduct2"
                            onChange={handleChange}
                            type="number"
                            className="form-control form-control-sm"
                            readOnly="readOnly"
                            placeholder="Total"
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input
                            value={productState3.codeProduct3}
                            name="codeProduct3"
                            onChange={handleChange}
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="Code"
                            required
                        />
                    </td>
                    <td>
                        <div style={{display: "flex" , justifyContent:"center"}}>
                            <Button size="sm" variant="outline-primary" onClick={getProduct3}>Consult</Button>
                        </div>
                    </td>
                    <td colSpan="3">
                        <input
                            value={productState3.nameProduct3}
                            name="nameProduct3"
                            onChange={handleChange}
                            type="text"
                            className="form-control form-control-sm"
                            readOnly="readOnly"
                            placeholder="Name Product"
                            required
                        />
                    </td>
                    <td>
                        <input
                            value={productState3.quantityProduct3}
                            name="quantityProduct3"
                            onChange={handleChange}
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="Quantity"
                            required
                        />
                    </td>
                    <td>
                        <input
                            value={productState3.totalValueProduct3}
                            name="totalValueProduct3"
                            onChange={handleChange}
                            type="number"
                            className="form-control form-control-sm"
                            readOnly="readOnly"
                            placeholder="Total"
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan="5"></td>
                    <th>Total Sale</th>
                    <td>
                        <input
                            value={sales.totalSale}
                            name="totalSale"
                            onChange={handleChange}
                            type="number"
                            className="form-control form-control-sm"
                            readOnly="readOnly"
                            placeholder="Total Sale"
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan="5"></td>
                    <th>Total IVA</th>
                    <td>
                        <input
                            value={sales.totalIVA}
                            name="totalIVA"
                            onChange={handleChange}
                            type="number"
                            className="form-control form-control-sm"
                            readOnly="readOnly"
                            placeholder="Total IVA"
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan="5"></td>
                    <th>Total Sale with IVA</th>
                    <td>
                        <input
                            value={sales.totalSaleIVA}
                            name="totalSaleIVA"
                            onChange={handleChange}
                            type="number"
                            className="form-control form-control-sm"
                            readOnly="readOnly"
                            placeholder="Total Sale With IVA"
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan="5"></td>
                    <td colSpan="2">
                        <div style={{display: "flex" , justifyContent:"center"}}>
                            <Button size="sm" variant="outline-success" onClick={confirmSale}>Confirm</Button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </Table>
        <Modal title={message.title} message={message.message} messageX={message.messageX} 
                    styleMessage={message.styleMessage} show={message.show} onClose={toggleShowMessage}/>
        </>
    )
}
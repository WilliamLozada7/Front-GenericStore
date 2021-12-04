import React, { useState } from "react";
import { ButtonGroup, ButtonToolbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router";
import { PrivateRoute } from "../privateRoute/privateRoute";
import { ReportUsers } from "./ReportUser";
import axios from "axios";
import UseAuth from "../../auth/UseAuth";
import { ReportBranch } from "./ReportBranch";

export const Reportes = () => {

    const auth = UseAuth();

    const [reportUserDB, setReportUserDB] = useState(null);
    const [reportBranchDB, setReportBranchDB] = useState(null);

    const getReportUsers = async () => {
        await axios.get("http://localhost:8080/api/store/report/salesByUser", {
            headers : {
                "authorization": auth.user.token || JSON.parse(localStorage.getItem("user")).token
            }
        })
        .then(response => {
            if(response.data.state === "1"){
                setReportUserDB(response.data.results)
            }
        })
    }

    const getReportBranchOfficce = async () => {
        await axios.get("http://localhost:8080/api/store/report/salesByBranchOffice", {
            headers : {
                "authorization": auth.user.token || JSON.parse(localStorage.getItem("user")).token
            }
        })
        .then(response => {
            if(response.data.state === "1"){
                setReportBranchDB(response.data.results)
            }
        })
    }
    return(
        <>
        <div>
            <ButtonToolbar className="mb-2 mt-2" id="divButtonGroup"aria-label="Toolbar with button groups">
                <ButtonGroup className=" me-5" aria-label="First group">
                    <Button className="bottonRegister" size="sm" variant="outline-primary" onClick={getReportUsers}><Link style={{textDecoration:"none", color:"#0d6efd"}} to = {"reportssalesuser"}>Report Sales User</Link></Button>
                </ButtonGroup>
                <ButtonGroup className=" me-5" aria-label="First group">
                    <Button className="bottonRegister" size="sm" variant="outline-primary" onClick={getReportBranchOfficce}><Link style={{textDecoration:"none", color:"#0d6efd"}} to = {"reportssalesbranchoffice"}>Report Sales Branch Office</Link></Button>
                </ButtonGroup>
            </ButtonToolbar>
            <Routes>
                <Route exact path="reportssalesuser" element= {<PrivateRoute><ReportUsers reportUser={reportUserDB}/></PrivateRoute>}/>
                <Route path = "reportssalesbranchoffice" element= {<PrivateRoute><ReportBranch reportBranch={reportBranchDB}/></PrivateRoute>}/>
            </Routes>
        </div>
        </>
    )
}
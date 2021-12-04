import React, { Fragment } from "react";
import { Table } from "react-bootstrap";

export const ReportUsers = ({reportUser}) => {
    const currency = (number) =>{
        return new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD', minimumFractionDigits: 2}).format(number);
    }
    return(
        <>
        <div id="tableProducts">
            <Table striped bordered hover size="sm" responsive="sm" style={{width:"99.9%"}}>
                <thead style={{textAlign:"center"}}>
                    <th>Code ID</th>
                    <th>Name</th>
                    <th>Amount</th>
                </thead>
                {reportUser !== null && (
                <tbody>
                    {
                        reportUser.map((report) => {
                            
                            return(
                                <Fragment>
                                    <tr>
                                        <td>{report.userId}</td>
                                        <td>{report.userName}</td>
                                        <td style={{textAlign: "right"}}>{currency(report.userAmount)}</td>
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
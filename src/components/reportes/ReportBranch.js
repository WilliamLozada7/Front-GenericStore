import React, { Fragment } from "react";
import { Table } from "react-bootstrap";

export const ReportBranch = ({reportBranch}) => {
    const currency = (number) =>{
        return new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD', minimumFractionDigits: 2}).format(number);
    }

    return(
        <>
        <div id="tableProducts">
            <Table striped bordered hover size="sm" responsive="sm" style={{width:"99.9%"}}>
                <thead style={{textAlign:"center"}}>
                    <th>Branch Office</th>
                    <th>Amount</th>
                </thead>
                {reportBranch !== null && (
                <tbody>
                    {
                        reportBranch.map((report) => {
                            
                            return(
                                <Fragment>
                                    <tr>
                                        <td>{report.branchOfficeName}</td>
                                        <td style={{textAlign: "right"}}>{currency(report.branchOfficeAmount)}</td>
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
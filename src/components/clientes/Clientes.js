import React, { Fragment } from "react";
import { Table } from "react-bootstrap";

export const Clientes = ({ clients }) => {
    return(
        <>
        <div id="tableProducts">
            <Table className="mt-5" striped bordered hover size="sm" responsive="sm" style={{width:"99.9%"}}>
                <thead style={{textAlign:"center"}}>
                    <th>Code ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Branch Office</th>
                    <th>Address</th>
                </thead>
                {clients !== null && (
                <tbody>
                    {
                        clients.map((client) => {
                            
                            return(
                                <Fragment>
                                    <tr>
                                        <td>{client.userId}</td>
                                        <td>{client.userName}</td>
                                        <td>{client.userEmail}</td>
                                        <td>{client.userBranchOffice}</td>
                                        <td>{client.userAddres}</td>
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
import React, { useState } from 'react';
import {
    DataTable,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
} from '@carbon/react';


function ListLocations(props) {

    const headers = [
        {
            key: 'firewall',
            header: 'Firewall',
        },
        {
            key: 'id',
            header: 'IP',
        },
        {
            key: 'subnet',
            header: 'Subnet',
        },
    ];



    return (


        <div>

            <DataTable rows={props.rows} headers={headers}>
                {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
                    <Table {...getTableProps()}>
                        <TableHead>
                            <TableRow>
                                {headers.map((header) => (
                                    <TableHeader {...getHeaderProps({ header })}>
                                        {header.header}
                                    </TableHeader>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow  {...getRowProps({ row })}>
                                    {row.cells.map((cell) => (
                                        <TableCell key={index}>
                                            {cell.id === cell.value + ':id' ? (
                                                props.IP
                                            ) : (
                                                cell.value
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </DataTable> </div>

    )

}

export default ListLocations
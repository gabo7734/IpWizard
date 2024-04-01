import React, { useState, useEffect } from 'react';
import {
    DataTable,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
} from '@carbon/react';


function List(props) {

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






    const [rows, setRows] = useState([]);
  const [IP, setIP] = useState('');
  
  


    return (


        <div>

            <DataTable rows={rows} headers={headers}>
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
                                                IP
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

export default List
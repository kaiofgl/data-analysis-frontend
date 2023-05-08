import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PieChart, Trash } from 'react-feather';

export default function ListUpload(props) {
    const { structure } = props;

    function handlePreview(row) {
        props.handlePreview(row);
    }

    return (
        <TableContainer component={Paper}>
            <Table size='small' aria-label='a dense table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Coluna</TableCell>
                        <TableCell align='right'>Preview</TableCell>
                        {/* <TableCell align='right'>Remover</TableCell> */}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {structure.map((row) => (
                        <TableRow
                            key={row}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component='th' scope='row'>
                                {row}
                            </TableCell>
                            <TableCell onClick={() => handlePreview(row)} align='center' sx={{ cursor: 'pointer' }}><PieChart /></TableCell>
                            {/* <TableCell align='center'><Trash /></TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
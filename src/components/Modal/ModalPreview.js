import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { PieChart } from 'react-feather';
import BarGraph from '../Chart/Bar';

import './ModalPreview.scss';

const ModalPreview = (props) => {
    const { data, open, column } = props;

    function onClose() {
        props.onClose();
    }

    function onConfirm() {
        props.onConfirm();
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            className='modal-preview'
        >
            <DialogTitle className='d-flex justify-center' sx={{ fontWeight: 'bold' }}>
                {column} <div className='px-2'><PieChart /></div>
            </DialogTitle>
            <DialogContent>
                <div className='bar'>
                    <BarGraph processed={data} sheetName={column} />
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' color='secondary' status='danger' onClick={onClose}>Fechar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalPreview;
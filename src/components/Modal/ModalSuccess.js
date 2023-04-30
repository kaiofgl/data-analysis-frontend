import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Check } from 'react-feather';


const ModalSuccess = (props) => {
    const { title, open, message } = props;

    function onClose() {
        props.onClose();
    }

    function onConfirm() {
        props.onConfirm();
    }

    return (
        <Dialog
            open={open}
        >
            <DialogTitle className='d-flex justify-center' sx={{ fontWeight: 'bold' }}>
                {title} <div className='px-2'><Check status='success' className='align-middle' /></div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='success' onClick={onConfirm}>Fechar</Button>
            </DialogActions>
        </Dialog>
    )
}


export default ModalSuccess;
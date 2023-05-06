import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { XCircle } from 'react-feather';


const ModalError = (props) => {
    const { title, open, message } = props;

    function onClose() {
        props.onClose();
    }

    return (
        <Dialog
            open={open}
        >
            <DialogTitle className='d-flex justify-center' sx={{ fontWeight: 'bold' }}>
                {title} <div className='px-2'><XCircle status='error' className='align-middle' /></div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText className='text-center'>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='error' onClick={onClose}>Fechar</Button>
            </DialogActions>
        </Dialog>
    )
}


export default ModalError;
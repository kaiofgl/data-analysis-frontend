import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { AlertTriangle } from 'react-feather';

const ModalConfirm = (props) => {
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
            <DialogTitle className="d-flex justify-center" sx={{ fontWeight: "bold" }}>
                {title} <div className='px-2'><AlertTriangle status="danger" className='align-middle' /></div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="secondary" status="danger" onClick={onClose}>Cancelar</Button>
                <Button variant="contained" color="danger" onClick={onConfirm}>Confirmar</Button>
            </DialogActions>
        </Dialog>
    )
}


export default ModalConfirm;
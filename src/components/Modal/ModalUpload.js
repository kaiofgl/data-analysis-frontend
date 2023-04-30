import './ModalUpload.scss';

import { useEffect, useState } from 'react';
import { Divider, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Paperclip, X, UploadCloud } from 'react-feather';

import ListUpload from '../List/ListUpload';
import ModalPreview from './ModalPreview';

import api from '../../utils/api';

const ModalUpload = (props) => {
    const { open, file } = props;

    const [fileUpload, setFileUpload] = useState(false);

    const [preStructure, setPreStructure] = useState([]);

    const [preview, setPreview] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewcolumn, setPreviewColumn] = useState('');

    const formData = new FormData();

    function onClose() {
        props.onClose(false);
    }

    function onConfirm() {
        props.onConfirm();
    }

    function handleFile(e) {
        const file = e.target.files[0];
        setFileUpload(file);
        props.fileCallback(file);
    }

    function remomeFile() {
        setTimeout(() => {
            setFileUpload(false);
            setPreStructure([]);
            props.fileCallback(false);
        }, 100)
    }

    const handleStructureFile = (file) => {
        api.post('api/v1/processing/pre-structure', formData).then((response) => {
            const { status } = response
            if (status === 200) {
                setPreStructure(response.data)
            } else {
                console.log('handle error');
            }
        });
    }

    function handlePreview(row) {
        for (var key of formData.keys()) {
            formData.delete(key)
        };

        formData.set('file', file);
        formData.set('column', row);

        api.post('api/v1/processing/pre-structure/column', formData).then((response) => {
            const { status } = response
            if (status === 200) {
                setPreview(response.data);
                setPreviewColumn(row);
                setPreviewOpen(true);
            } else {
                console.log('handle error');
            }
        });
    }

    function closePreview() {
        setPreviewOpen(false);
        setTimeout(() => {
            setPreview([]);
            setPreviewColumn('');
        }, 200);
    }

    useEffect(() => {
        if (file && file.name) {
            setFileUpload(file);
            formData.set('file', file);
            handleStructureFile(file);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle className='d-flex justify-center' sx={{ fontWeight: 'bold' }}>
                Importação de dados
            </DialogTitle>
            <DialogContent>
                <label htmlFor='upload-modal' className='input-file'>
                    {fileUpload === false ?
                        <input
                            accept='.xlsx, .xls, .json, .csv'
                            id='upload-modal'
                            type='file'
                            hidden
                            onChange={handleFile}
                        />
                        : <></>}

                    <div className='filename'>
                        <div className='upload'>
                            {fileUpload === false ?
                                <div className='d-flex'>
                                    <UploadCloud />
                                    <div >
                                        <div className='px-3'>Enviar arquivo</div>
                                        <div className='p6 text-center'>.xslx, .xsl, .csv, .json</div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <Paperclip />
                                    {fileUpload.name}
                                    <div className='trash'>
                                        <X onClick={remomeFile} />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    <div className='bar'></div>
                </label>

                {preStructure.length > 0 ?
                    <div>
                        <Divider className='pt-4'></Divider>
                        <DialogTitle className='d-flex justify-center' sx={{ fontWeight: 'bold' }}>
                            Estrutura
                        </DialogTitle>
                        <ListUpload structure={preStructure} handlePreview={handlePreview} />
                        <ModalPreview data={preview} open={previewOpen} column={previewcolumn} onClose={closePreview} />
                    </div> : <></>}

            </DialogContent>
            <DialogActions>
                <Button variant='outlined' color='danger' onClick={onClose}>Cancelar</Button>
                <Button variant='contained' onClick={onConfirm}>Importar</Button>
            </DialogActions>
        </Dialog>
    )
}


export default ModalUpload;
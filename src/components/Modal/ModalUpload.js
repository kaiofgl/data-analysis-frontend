import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useEffect, useState } from "react";

import { Paperclip, X, UploadCloud } from "react-feather";
import "./ModalUpload.scss";

const ModalUpload = (props) => {
    const { open, file } = props;


    const [fileUpload, setFileUpload] = useState(null);

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
            setFileUpload(null);
            props.fileCallback(false);
        }, 100)
    }

    useEffect(() => {
        if (file.name) {
            setFileUpload(file);
        }
    }, [file]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle className="d-flex justify-center" sx={{ fontWeight: "bold" }}>
                Importação de dados
            </DialogTitle>
            <DialogContent>
                <label htmlFor="upload-modal" className="input-file">
                    {fileUpload == null ?
                        <input
                            accept=".xlsx, .xls, .json, .csv"
                            id="upload-modal"
                            type="file"
                            hidden
                            onChange={handleFile}
                        />
                        : <></>}

                    <div className="filename">
                        <div className="upload">
                            {fileUpload == null ?
                                <div className="d-flex">
                                    <UploadCloud />
                                    <div >
                                        <div className="px-3">Enviar arquivo</div>
                                        <div className="p6 text-center">.xslx, .xsl, .csv, .json</div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <Paperclip />
                                    {fileUpload.name}
                                    <div className="trash">
                                        <X onClick={remomeFile} />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="bar"></div>
                </label>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="danger" onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={onConfirm}>Importar</Button>
            </DialogActions>
        </Dialog>
    )
}


export default ModalUpload;
import "./CardFile.scss";

import { UploadCloud } from 'react-feather';

import { useState } from "react";
import ModalUpload from '../../components/Modal/ModalUpload';
import ModalConfirm from '../../components/Modal/ModalConfirm';

const CardFile = (props) => {

    const [file, setFile] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalConfirmOpen, setModalConfirmOpen] = useState(false);

    function handleFile(e) {
        const file = e.target.files[0];
        setFile(file);
        setModalOpen(true);
    }

    // Modal Upload
    function modalHandleConfirm() {
        props.onChange(file)
    }

    function modalHandleClose() {
        if (file === false) {
            setModalOpen(false);
        } else {
            setModalConfirmOpen(true);
        }
    }

    function fileCallback(file) {
        if (file === false) {
            setFile(false);
        } else {
            setFile(file)
        }
    }

    // Modal confirm
    function modalConfirmClose() {
        setModalConfirmOpen(false);
    }

    function modalConfirm() {
        setModalConfirmOpen(false);
        setModalOpen(false);
    }

    return (
        <>
            <label htmlFor="upload" className="card new">
                <div >
                    <input
                        accept=".xlsx, .xls, .json, .csv"
                        id="upload"
                        name="file"
                        className="mt-2 input"
                        type="file"
                        onChange={handleFile}
                    />
                    <div className="label">
                        <div>Enviar arquivo</div>
                        <UploadCloud />
                        <div className="p6">.xlsx, .xls, .csv, .json</div>
                    </div>
                </div>
            </label>
            <ModalUpload
                open={modalOpen}
                onClose={modalHandleClose}
                onConfirm={modalHandleConfirm}
                fileCallback={fileCallback}
                file={file}
            ></ModalUpload>
            <ModalConfirm
                title="Cancelar envio?"
                open={modalConfirmOpen}
                onConfirm={modalConfirm}
                onClose={modalConfirmClose}
                message="Você deseja cancelar o envio do arquivo? "
            ></ModalConfirm>
        </>
    )
}

export default CardFile;
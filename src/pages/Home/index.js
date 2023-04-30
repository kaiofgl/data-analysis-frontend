import "./Home.scss"

import Layout from "../../layout/Default";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CardFile from "../../components/Card/CardFile";
import ModalSuccess from "../../components/Modal/ModalSuccess";

import api from "../../utils/api";

const Home = () => {
    const navigate = useNavigate();

    const [modalSuccess, setModalSuccess] = useState(false);

    const [file, setFile] = useState(null);

    function handleFile(file) {
        if (file) {
            const formData = new FormData();
            formData.set("file", file)
            formData.set("name", file.name.replace(/\.[^/.]+$/, ""))

            api.post("api/v1/file/upload", formData).then((response) => {
                const { status } = response
                if (status === 200) {
                    const content = response.data

                    const storedContent = JSON.parse(localStorage.getItem('storage')) || [];
                    storedContent.push(content);

                    localStorage.setItem('storage', JSON.stringify(storedContent));
                    setFile(content)
                    setModalSuccess(true);
                } else {
                    console.log("handle error");
                }
            });
        }
    }

    function handleConfirm() {
        setModalSuccess(false);
        navigate("/dashboard/" + file.filename);
    }

    return (
        <Layout>
            <div className="home">
                <div className="d-flex justify-center h3 fw-100">Enviar novo arquivo</div>
                <div className="col body">
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {/* {storedItems.map((content, index) => (
                            <div onClick={handleMock} key={index} className="col-6 px-2 py-2">
                                <Card content={content} />
                            </div>
                        ))} */}
                        <div className="button col-8 px-2 py-2">
                            <CardFile onChange={handleFile} />
                        </div>
                    </div>
                </div>
            </div>
            <ModalSuccess title="Sucesso" open={modalSuccess} message="O arquivo foi enviado com sucesso" onConfirm={handleConfirm} />
        </Layout>
    )
}

export default Home;
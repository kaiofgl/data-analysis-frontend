import "./Home.scss"

import Layout from "../../layout/Default";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CardFile from "../../components/Card/CardFile";
import Card from "../../components/Card/Card";
import ModalSuccess from "../../components/Modal/ModalSuccess";

import api from "../../utils/api";

const Home = () => {
    const navigate = useNavigate();

    const [filesData, setFilesData] = useState([]);
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
                    setFile(file)
                    setModalSuccess(true);
                } else {
                    console.log("handle error");
                }
            });
        }
    }

    function handleConfirm() {
        setModalSuccess(false);
        navigate("/dashboard/" + file.name.replace(/\.[^/.]+$/, ""));
    }

    function handleMock() {
        console.log("call");
        // setFilesData([...filesData, {
        //     id: 5,
        //     filename: "processing.xlsx",
        //     createdAt: "2023-04-01",
        //     updatedAt: "2023-04-01",
        // },])
    }

    return (
        <Layout>
            <div className="home">
                <div className="d-flex justify-center h3 fw-100">Dashboard</div>
                <div className="col">
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {filesData.map((card, index) => (
                            <div key={card.id} className="col-6 px-2 py-2">
                                <Card />
                            </div>
                        ))}
                        <div onClick={handleMock} className="col-6 px-2 py-2">
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
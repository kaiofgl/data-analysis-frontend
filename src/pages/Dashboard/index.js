import Layout from "../../layout/Default"

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";

import BarGraph from "../../components/Chart/Bar";

import api from "../../utils/api";
import { useNavigate } from 'react-router';

import { AlertTriangle, PieChart } from "react-feather";

import "./Dashboard.scss";
import PieGraph from "../../components/Chart/Pie";
import WordCloud from "../../components/Chart/WordCloud";

const Dashboard = () => {
    const { filename } = useParams();

    const [filenameFriendly, setFilenameFriendly] = useState(null);

    const [processedData, setProcessedData] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function handleGraphics() {
        setLoading(true);

        const data = {
            filename: filename
        }

        api.post("api/v1/processing/all", data).then((response) => {
            setLoading(false);

            const { status } = response
            if (status === 200) {
                const allData = JSON.parse(JSON.stringify(response.data));
                setProcessedData((allData));
            } else {
                console.log("handle error");
            }
        });
    }

    useEffect(() => {
        setProcessedData(null);
        setLoading(false);
        const storage = JSON.parse(localStorage.getItem('storage'));
        if (storage) {
            const filenameFriendly = storage.find(e => e.filename === filename);
            setFilenameFriendly(filenameFriendly.filename_friendly + "." + filenameFriendly.extension);
        } else {
            navigate("/")
        }

    }, [filename])


    return (
        <Layout>
            <div className="processing">
                Dashboard
                <div className="card dashboard">
                    <div className="d-flex card-content">
                        <div className="col-6 py-4">
                            <div className="title">
                                Dashboard - {filenameFriendly}
                            </div>
                        </div>
                        <div className="col-6 py-4 card-actions">
                            <div>
                                dados
                            </div>
                            <div>
                                <div className="px-4">
                                    <Button variant="contained" >Preview rápido</Button>
                                </div>
                                <div className="px-4 d-flex pt-4">
                                    <div className="col-6 pe-3">
                                        <Button variant="contained">Exportar</Button>
                                    </div>
                                    <div className="col-6 ps-3">
                                        <Button variant="contained">Excluir</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="graphics">
                    <div className="title d-flex justify-content-center w-100 pt-4">
                        Gráficos <AlertTriangle className="ms-2 mt-1" />
                    </div>
                    <div>
                        <Button variant="contained" onClick={handleGraphics}><PieChart className="mx-2" /> Gerar gráficos automaticamente </Button>
                        <AlertTriangle className="ms-3" />
                    </div>
                    {loading ?
                        <div className="loading">
                            <CircularProgress />
                            <div className="ps-4">
                                Processando...
                            </div>
                        </div> :
                        <div className="list pt-4">
                            {processedData ? Object.keys(processedData).map((key) => {
                                if (Object.keys(processedData[key].data).length > 0) {
                                    return (
                                        <div key={key} className="card mx-2 my-2">
                                            <p className="title pt-4">{key}</p>
                                            {processedData[key].type_suggestion == "pie" &&
                                                <PieGraph processed={processedData[key].data} sheetName={key} />
                                            }
                                            {processedData[key].type_suggestion == "bar" &&
                                                <BarGraph processed={processedData[key].data} sheetName={key} />
                                            }
                                            {processedData[key].type_suggestion == "word_cloud" &&
                                                <WordCloud processed={processedData[key].data} />
                                            }

                                        </div>
                                    )
                                }
                            }) : <></>}
                        </div>
                    }
                    {/* <ModalPreview data={preview} open={previewOpen} column={previewcolumn} onClose={closePreview} /> */}
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;
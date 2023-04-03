import Layout from "../../layout/Default"

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


import BarGraph from "../../components/Chart/Bar";

import api from "../../utils/api";

import "./Dashboard.scss";

const Dashboard = () => {
    const { filename } = useParams();

    const [processedData, setProcessedData] = useState(null);

    function handleProcessingFilename(filename) {
        const data = {
            filename: filename
        }

        api.post("api/v1/processing/all", data).then((response) => {
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
        if (filename) {
            handleProcessingFilename(filename);
        }
    }, [filename]);

    return (
        <Layout>
            Dashboard
            <div className="processing">
                {processedData ? Object.keys(processedData).map((key) => {
                    return (
                        <div key={key} className="card mx-2 my-2">
                            <p className="title">{key}</p>
                            <BarGraph processed={processedData[key]} sheetName={key} />
                        </div>
                    )
                }) : <></>}
            </div>
        </Layout>
    )
}

export default Dashboard;
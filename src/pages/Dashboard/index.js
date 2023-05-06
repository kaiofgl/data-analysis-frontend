import Layout from '../../layout/Default'

import BarGraph from '../../components/Chart/Bar';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router';
import { AlertTriangle } from 'react-feather';

import ModalConfirm from '../../components/Modal/ModalConfirm';
import PieGraph from '../../components/Chart/Pie';
import WordCloud from '../../components/Chart/WordCloud';
import ModalError from '../../components/Modal/ModalError';
import api from '../../utils/api';
import './Dashboard.scss';

const Dashboard = () => {
    const { filename } = useParams();

    const [file, setFile] = useState([]);
    const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
    const [processedData, setProcessedData] = useState(null);
    const [loading, setLoading] = useState(false);


    const [messageErrorTitle, setMessageErrorTitle] = useState('');
    const [messageErrorOpen, setMessageErrorOpen] = useState(false);
    const [messageErrorMessage, setMessageErrorMessage] = useState('');

    const navigate = useNavigate();

    function handleGraphics() {
        setLoading(true);

        const data = {
            filename: filename
        }

        api.post('api/v1/processing/all', data).then((response) => {
            const { status } = response
            if (status === 200) {
                const allData = JSON.parse(JSON.stringify(response.data));
                setProcessedData((allData));
            } else {
                console.log('handle error');
            }
        })
            .catch(e => {
                setMessageErrorOpen(true);
                setMessageErrorTitle('Erro fatal');
                setMessageErrorMessage('Ocorreu um erro ao processar os dados. Reenvie o arquivo ou contate um administrador.')
                // console.log(e);
            })

            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        setProcessedData(null);
        setLoading(false);
        const storage = JSON.parse(localStorage.getItem('storage'));

        if (storage && storage.length > 0) {
            const fileFromStorage = storage.find(e => e.filename === filename);

            if (fileFromStorage) {
                setFile(fileFromStorage);
            } else {
                navigate('/');
            }
        } else {
            navigate('/');
        }
        handleGraphics();
    }, [filename])


    function modalConfirmClose() {
        setModalConfirmOpen(false);
    }

    function modalConfirm() {
        const storage = JSON.parse(localStorage.getItem('storage'));
        if (storage) {
            const indexOfExclusion = storage.map(e => e.filename).indexOf(file.filename);

            if (indexOfExclusion != -1) {
                storage.splice(indexOfExclusion, 1);

                localStorage.setItem('storage', JSON.stringify(storage));
                navigate('/');
            }
        }
    }

    return (
        <Layout>
            <ModalError
                title={messageErrorTitle}
                open={messageErrorOpen}
                message={messageErrorMessage}
                onClose={() => setMessageErrorOpen(false)}
            ></ModalError>
            <div className='processing'>
                <div className='card dashboard'>
                    <div className='d-flex card-content'>
                        <div className='col-8 py-4'>
                            <div className='pt-5 title d-flex justify-content-center flex-wrap'>
                                <p className='w-100 fw-light'>Dashboard</p>
                                <span className='w-100'>{file.filename_friendly}.{file.extension}</span>
                            </div>
                        </div>
                        <div className='col-4 py-4 card-actions '>
                            <div>
                                {/* <div className='px-4'>
                                    <Button variant='contained' >Preview rápido</Button>
                                </div> */}
                                <div className='px-4 d-flex pt-4 justify-content-end'>
                                    {/* <div className='col-6 pe-3'>
                                        <Button variant='contained'>Exportar</Button>
                                    </div> */}
                                    <div className='col-6 ps-3'>
                                        <Button onClick={(e) => {
                                            e.preventDefault();
                                            setModalConfirmOpen(true);
                                        }} variant='contained'>Excluir</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='graphics'>
                    <div className='title d-flex justify-content-center w-100 pt-4'>
                        Gráficos <AlertTriangle className='ms-2 mt-1' />
                    </div>
                    {/* <div>
                        <Button variant='contained' onClick={handleGraphics}><PieChart className='mx-2' /> Gerar gráficos automaticamente </Button>
                        <AlertTriangle className='ms-3' />
                    </div> */}
                    {loading ?
                        <div className='loading'>
                            <CircularProgress />
                            <div className='ps-4'>
                                Processando...
                            </div>
                        </div> :
                        <div className='list pt-4'>
                            {processedData ? Object.keys(processedData).map((key) => {
                                if (Object.keys(processedData[key].data).length > 0) {
                                    return (
                                        <div key={key} className='card mx-2 my-2'>
                                            <p className='title pt-4'>{key}</p>
                                            {processedData[key].type_suggestion == 'pie' &&
                                                <PieGraph processed={processedData[key].data} sheetName={key} />
                                            }
                                            {processedData[key].type_suggestion == 'bar' &&
                                                <BarGraph processed={processedData[key].data} sheetName={key} />
                                            }
                                            {processedData[key].type_suggestion == 'word_cloud' &&
                                                <WordCloud processed={processedData[key].data} />
                                            }

                                        </div>
                                    )
                                }
                            }) : <div className='ps-4 text-center'>
                                <span>

                                    Ocorreu um erro, tente novamente.
                                </span>
                            </div>}
                        </div>
                    }
                    {/* <ModalPreview data={preview} open={previewOpen} column={previewcolumn} onClose={closePreview} /> */}
                </div>
            </div>
            <ModalConfirm
                title='Excluir arquivo?'
                open={modalConfirmOpen}
                onConfirm={modalConfirm}
                onClose={modalConfirmClose}
                message='Você confirma a exclusão do arquivo? '
            ></ModalConfirm>
        </Layout>
    )
}

export default Dashboard;
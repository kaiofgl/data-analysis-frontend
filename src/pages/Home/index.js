import './Home.scss'

import Layout from '../../layout/Default';

import { useState } from 'react';

import CardFile from '../../components/Card/CardFile';
import Card from '../../components/Card/Card';

const Home = () => {

    const [filesData, setFilesData] = useState([]);

    function handleFile(file) {
    }


    function handleMock() {
        console.log('call');
        // setFilesData([...filesData, {
        //     id: 5,
        //     filename: 'processing.xlsx',
        //     createdAt: '2023-04-01',
        //     updatedAt: '2023-04-01',
        // },])
    }

    return (
        <Layout>
            <div className='home'>
                <div className='d-flex justify-center h3 fw-100'>Dashboard</div>
                <div className='col'>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {filesData.map((card, index) => (
                            <div key={card.id} className='col-6 px-2 py-2'>
                                <Card />
                            </div>
                        ))}
                        <div onClick={handleMock} className='col-6 px-2 py-2'>
                            <CardFile onChange={handleFile} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default Home;
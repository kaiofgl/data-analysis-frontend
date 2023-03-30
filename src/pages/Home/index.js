import Layout from '../../layout/Default';

import './Home.scss'

import CardFile from '../../components/Card/CardFile';

const Home = () => {


    function handleFile(file) {
    }


    return (
        <Layout>
            <div className='home'>
                <div className='d-flex justify-center h3 fw-100'>Dashboard</div>
                <div className='d-flex justify-between' >
                    <div className='col-6' sx={{ minHeight: "300px" }}>
                        <CardFile onChange={handleFile} />
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default Home;
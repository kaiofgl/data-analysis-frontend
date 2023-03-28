import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

function RoutesDefault() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesDefault;
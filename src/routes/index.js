import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';


function RoutesDefault() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard/:filename" element={<Dashboard />} />

            </Routes>
        </BrowserRouter>
    );
}

export default RoutesDefault;
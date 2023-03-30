import RoutesDefault from './routes';

import theme from './theme';

import { ThemeProvider } from '@mui/material';

import './sass/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <RoutesDefault />
            </ThemeProvider>
        </>
    );
}
export default App;
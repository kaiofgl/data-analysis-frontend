import { createTheme } from "@mui/material/styles";

import themeBase from "./sass/theme/_ThemeBase.scss";

const theme = createTheme({
    typography: {
        fontFamily: [
            'Poppins'
        ]
    },
    shape: {
        borderRadius: themeBase.borderRadius,
    },
    palette: {
        // mode: 'dark',
        danger: {
            main: themeBase.danger
        },
        primary: {
            main: themeBase.primary
        },
        secondary: {
            main: themeBase.secondary
        }
    }
});

export default theme;
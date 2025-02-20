import "@/styles/globals.css";

import MainLayout from "./menus/main-layout";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

// Create your theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#f1d70a',
        },
    },
});

export default function App({Component, pageProps}) {


    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/> {/* Apply baseline styling */}
                <MainLayout>


                    <Component {...pageProps} /></MainLayout>

            </ThemeProvider>
        </>);
}

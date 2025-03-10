import "@/styles/globals.css";

import MainLayout from "./menus/main-layout";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {useRouter} from "next/router";

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
    const router = useRouter();
    const excludedRoutes = ['/dont-show-me']; // Routes where the component should be hidden

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/> {/* Apply baseline styling */}
                <MainLayout>
                    {!excludedRoutes.includes(router.pathname)

                    &&  <Component {...pageProps} />
                    }

                   </MainLayout>

            </ThemeProvider>
        </>);
}

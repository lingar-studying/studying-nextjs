import "@/styles/globals.css";

import MainLayout from "./menus/main-layout";

export default function App({ Component, pageProps }) {
  return  <MainLayout>


    <Component {...pageProps} /></MainLayout>;
}

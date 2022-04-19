import type { AppProps } from "next/app";
import MarkersProvider from "@contexts/MarkersContext";
import { Wrapper } from "@googlemaps/react-wrapper";
import { ENVIRONMENT } from "@utils/environment";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Distancier 📍</title>{" "}
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <MarkersProvider>
        <Wrapper apiKey={ENVIRONMENT.googleMapsApiKey}>
          <Component {...pageProps} />
          <ToastContainer position="top-left" />
        </Wrapper>
      </MarkersProvider>
    </>
  );
}

export default MyApp;

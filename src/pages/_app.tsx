import type { AppProps } from "next/app";
import MarkersProvider from "@contexts/MarkersContext";
import { Wrapper } from "@googlemaps/react-wrapper";
import { ENVIRONMENT } from "@utils/environment";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MarkersProvider>
      <Wrapper apiKey={ENVIRONMENT.googleMapsApiKey}>
        <Component {...pageProps} />
        <ToastContainer position="top-left" />
      </Wrapper>
    </MarkersProvider>
  );
}

export default MyApp;

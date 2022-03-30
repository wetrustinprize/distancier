import "../styles/globals.css";
import type { AppProps } from "next/app";
import MarkersProvider from "@contexts/MarkersContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MarkersProvider>
      <Component {...pageProps} />
    </MarkersProvider>
  );
}

export default MyApp;

import Map from "@components/Map";
import MapMarker from "@components/MapMarker";
import MapMarkerDistances from "@components/MapMarkerDistances";
import Sidebar from "@components/Sidebar";
import { MarkersContext } from "@contexts/MarkersContext";
import type { NextPage } from "next";
import { useContext } from "react";
import { toast } from "react-toastify";

import styles from "./styles.module.scss";

const Home: NextPage = () => {
  const { markers, selectMarker } = useContext(MarkersContext);

  // Copy to the clipboard the lat and lng when click
  const copyLatLng = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    navigator.clipboard.writeText(`${e.latLng.lat()},${e.latLng.lng()}`);
    toast("Coordinates copied to clipboard!", {
      type: "info",
    });
  };

  return (
    <div className={styles.container}>
      <Map
        className={styles.map}
        onClick={copyLatLng}
        options={{
          disableDefaultUI: true,
        }}
      >
        <MapMarkerDistances />
        {markers.map((marker, index) => (
          <MapMarker
            onClick={() => selectMarker(marker)}
            key={index}
            mark={marker}
          />
        ))}
      </Map>
      <Sidebar className={styles.sidebar} />
    </div>
  );
};

export default Home;

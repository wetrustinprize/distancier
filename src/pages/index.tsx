import Map from "@components/Map";
import MapMarker from "@components/MapMarker";
import MapMarkerDistances from "@components/MapMarkerDistances";
import Sidebar from "@components/Sidebar";
import { MarkersContext } from "@contexts/MarkersContext";
import { Wrapper } from "@googlemaps/react-wrapper";
import { ENVIRONMENT } from "@utils/environment";
import type { NextPage } from "next";
import { useContext } from "react";

import styled from "./styles.module.scss";

const Home: NextPage = () => {
  const { markers, selectMarker } = useContext(MarkersContext);

  // Copy to the clipboard the lat and lng when click
  const copyLatLng = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    navigator.clipboard.writeText(`${e.latLng.lat()},${e.latLng.lng()}`);
  };

  return (
    <Wrapper apiKey={ENVIRONMENT.googleMapsApiKey}>
      <div className={styled.container}>
        <Map onClick={copyLatLng}>
          <MapMarkerDistances />
          {markers.map((marker, index) => (
            <MapMarker
              onClick={() => selectMarker(marker)}
              key={index}
              mark={marker}
            />
          ))}
        </Map>
        <Sidebar />
      </div>
    </Wrapper>
  );
};

export default Home;

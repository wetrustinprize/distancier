import Map from "@components/Map";
import MapMarker from "@components/MapMarker";
import Sidebar from "@components/Sidebar";
import { MarkersContext } from "@contexts/MarkersContext";
import { Wrapper } from "@googlemaps/react-wrapper";
import { ENVIRONMENT } from "@utils/environment";
import type { NextPage } from "next";
import { useContext } from "react";

import styled from "./styles.module.scss";

const Home: NextPage = () => {
  const { markers } = useContext(MarkersContext);

  return (
    <Wrapper apiKey={ENVIRONMENT.googleMapsApiKey}>
      <div className={styled.container}>
        <Map>
          {markers.map((marker, index) => (
            <MapMarker key={index} mark={marker} />
          ))}
        </Map>
        <Sidebar />
      </div>
    </Wrapper>
  );
};

export default Home;

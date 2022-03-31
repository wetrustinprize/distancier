import { MarkersContext } from "@contexts/MarkersContext";
import React, { useContext, useEffect, useState } from "react";

interface IMapMarkerProps {
  map?: google.maps.Map;
}

const MapMarkerDistances: React.FC<IMapMarkerProps> = ({
  map,
}: IMapMarkerProps) => {
  const [shape, setShape] = useState<google.maps.Polyline>();

  const { markers, selectedMarker } = useContext(MarkersContext);

  useEffect(() => {
    if (!shape) {
      const shape = new google.maps.Polyline();

      setShape(shape);
    }

    return () => {
      if (shape) {
        shape.setMap(null);
      }
    };
  }, [shape]);

  useEffect(() => {
    if (shape) {
      const coordinates: google.maps.LatLngLiteral[] = [];

      if (selectedMarker)
        markers.forEach((marker) => {
          coordinates.push(
            {
              lat: selectedMarker.position.lat,
              lng: selectedMarker.position.lng,
            },
            {
              lat: marker.position.lat,
              lng: marker.position.lng,
            }
          );
        });

      shape.setOptions({
        map: map,
        path: coordinates,
        strokeColor: "#2A9D8F",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        clickable: false,
      });
    }
  }, [shape, map, markers, selectedMarker]);

  return null;
};

export default MapMarkerDistances;

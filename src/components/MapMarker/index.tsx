import { Mark } from "@interfaces/Mark";
import React from "react";

interface IMapMarkerProps {
  mark: Mark;
  map?: google.maps.Map;
}

const MapMarker: React.FC<IMapMarkerProps> = ({
  mark,
  map,
}: IMapMarkerProps) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions({
        position: mark.position,
        map: map,
        title: mark.title,
        icon: mark.type === "house" ? "/house.png" : "/pin.png",
      });
    }
  }, [marker, mark, map]);

  return null;
};

export default MapMarker;

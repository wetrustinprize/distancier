import { Mark } from "@interfaces/Mark";
import React, { useEffect, useState } from "react";

interface IMapMarkerProps {
  mark: Mark;
  onClick?: () => void;
  map?: google.maps.Map;
}

const MapMarker: React.FC<IMapMarkerProps> = ({
  mark,
  onClick,
  map,
}: IMapMarkerProps) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      const marker = new google.maps.Marker();

      if (onClick) marker.addListener("click", onClick);

      setMarker(marker);
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
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

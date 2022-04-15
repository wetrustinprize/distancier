import { Mark } from "@interfaces/Mark";
import React, { useEffect, useState } from "react";

interface IMapMarkerProps {
  /**
   * The Mark object with the information about the mark.
   */
  mark: Mark;

  /**
   * The callback for when the marker is clicked.
   */
  onClick?: () => void;

  /**
   * The map reference.
   *
   * Automatically gets the maps reference from the parent.
   */
  map?: google.maps.Map;
}

/**
 * Shows a marker on the map. Should be placed as a child of the Map component.
 *
 * @component
 */
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

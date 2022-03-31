import { Mark } from "@interfaces/Mark";
import React, { createContext, useEffect } from "react";

const defaultValues: {
  markers: Mark[];
  selectedMarker: Mark | null;
  addMarker: (marker: Mark) => void;
  selectMarker: (marker: Mark) => void;
  removeMarker: (index: number) => void;
} = {
  markers: [],
  selectedMarker: null,
  selectMarker: () => {},
  addMarker: () => {},
  removeMarker: () => {},
};

export const MarkersContext = createContext(defaultValues);

const MarkersProvider: React.FC = ({ children }) => {
  const [markers, setMarkers] = React.useState<Mark[]>([]);

  const [selectedMarker, setSelectedMarker] = React.useState<Mark | null>(null);

  useEffect(() => {
    if (localStorage.getItem("markers"))
      setMarkers(JSON.parse(localStorage.getItem("markers") as string));

    if (localStorage.getItem("selectedMarker"))
      setSelectedMarker(
        JSON.parse(localStorage.getItem("selectedMarker") as string)
      );
  }, []);

  const selectMarker = (marker: Mark | null) => {
    // Check if marker is null
    if (marker === null) {
      setSelectedMarker(null);
      localStorage.removeItem("selectedMarker");
    } else {
      // Check if marker is a house
      if (marker.type !== "house") return;

      // Check if marker exists in array, if not, add it
      if (markers.findIndex((m) => m === marker) === -1) {
        addMarker(marker);
      }

      // Set the selected marker
      setSelectedMarker(marker);
      localStorage.setItem("selectedMarker", JSON.stringify(marker));
    }
  };

  const addMarker = (marker: Mark) => {
    // Adds new marker to the array
    const newMarkers = [...markers, marker];

    setMarkers(newMarkers);
    localStorage.setItem("markers", JSON.stringify(newMarkers));
  };

  const removeMarker = (index: number) => {
    // Remove selected marker
    if (selectedMarker && index === markers.indexOf(selectedMarker))
      selectMarker(null);

    // Remove marker from array
    const newMarkers = markers.filter((marker, i) => i !== index);

    setMarkers(newMarkers);
    localStorage.setItem("markers", JSON.stringify(newMarkers));
  };

  return (
    <MarkersContext.Provider
      value={{ markers, selectedMarker, selectMarker, addMarker, removeMarker }}
    >
      {children}
    </MarkersContext.Provider>
  );
};

export default MarkersProvider;

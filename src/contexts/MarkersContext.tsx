import { Mark } from "@interfaces/Mark";
import React, { createContext } from "react";

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
  const [markers, setMarkers] = React.useState<Mark[]>([
    {
      title: "Peter's House",
      position: {
        lat: -25.394801169945584,
        lng: -49.33209958875103,
      },
      tags: ["house", "peter"],
      type: "house",
    },
    {
      title: "Center of the World",
      position: {
        lat: 0,
        lng: 0,
      },
      tags: ["center", "world"],
      type: "place",
    },
  ]);

  const [selectedMarker, setSelectedMarker] = React.useState<Mark | null>(null);

  const selectMarker = (marker: Mark) => {
    // Check if marker exists in array, if not, add it
    if (markers.findIndex((m) => m === marker) === -1) {
      addMarker(marker);
    }

    // Set the selected marker
    setSelectedMarker(marker);
  };

  const addMarker = (marker: Mark) => {
    // Adds new marker to the array
    setMarkers([...markers, marker]);
  };

  const removeMarker = (index: number) => {
    // Remove selected marker
    if (selectedMarker && index === markers.indexOf(selectedMarker)) {
      setSelectedMarker(null);
    }

    // Remove marker from array
    setMarkers(markers.filter((marker, i) => i !== index));
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

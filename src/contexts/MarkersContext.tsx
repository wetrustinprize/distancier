import { Mark } from "@interfaces/Mark";
import React, { createContext } from "react";

const defaultValues: {
  markers: Mark[];
  addMarker: (marker: Mark) => void;
  removeMarker: (index: number) => void;
} = {
  markers: [],
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
  ]);

  const addMarker = (marker: Mark) => {
    setMarkers([...markers, marker]);
  };

  const removeMarker = (index: number) => {
    setMarkers(markers.filter((marker, i) => i !== index));
  };

  return (
    <MarkersContext.Provider value={{ markers, addMarker, removeMarker }}>
      {children}
    </MarkersContext.Provider>
  );
};

export default MarkersProvider;

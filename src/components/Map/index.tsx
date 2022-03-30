import { MarkersContext } from "@contexts/MarkersContext";
import React, { useContext, useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";

const Map: React.FC = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  const { markers } = useContext(MarkersContext);

  // Create the map
  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new google.maps.Map(ref.current, {
        zoom: 2,
        center: { lat: 0, lng: 0 },
      });

      setMap(newMap);
    }
  }, [ref, map]);

  return (
    <>
      <div className={styles.container} ref={ref} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

export default Map;

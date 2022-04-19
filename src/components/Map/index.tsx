import { MarkersContext } from "@contexts/MarkersContext";
import React, { useContext, useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";

interface IMap {
  /**
   * Callback for when the map is clicked.
   */
  onClick?: (e: google.maps.MapMouseEvent) => void;

  /**
   * Outer container class name
   */
  className?: string;

  /**
   * Callback reference to pan the map.
   */
  panToRef?: React.MutableRefObject<
    (latLng: google.maps.LatLngLiteral) => void
  >;

  /**
   * Google maps options
   */
  options?: google.maps.MapOptions;

  /**
   * Children
   */
  children?: React.ReactNode;
}

/**
 * Displays the Google map using the JavaScript API.
 *
 * @component
 */
const Map: React.FC<IMap> = ({
  children,
  onClick,
  options,
  className,
  panToRef,
}: IMap) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  const onClickListener = useRef<google.maps.MapsEventListener>();

  /**
   * Pans the map to a specific coordinate.
   *
   * @param latLng Latitude and longitude
   */
  const panTo = (latLng: google.maps.LatLngLiteral) => {
    map?.panTo(latLng);
  };
  if (panToRef) panToRef.current = panTo;

  // Create the map
  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new google.maps.Map(ref.current, {
        center: { lat: 0, lng: 0 },
        zoom: 2,
        ...options,
      });

      setMap(newMap);
    }
  }, [ref, map, options]);

  // Add event listeners
  useEffect(() => {
    if (map) {
      if (onClick) {
        if (onClickListener.current) onClickListener.current.remove();

        onClickListener.current = map.addListener("click", onClick);
      }
    }
  }, [map, onClick]);

  return (
    <div className={className}>
      <div className={styles.container} ref={ref} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </div>
  );
};

export default Map;

import React, { useContext } from "react";
import { MarkersContext } from "@contexts/MarkersContext";
import AddMarkModal from "@components/AddMarkModal";
import MarkItem from "@components/MarkItem";

import styles from "./styles.module.scss";
import { AnimatePresence, motion } from "framer-motion";

import { RiAddFill } from "react-icons/ri";
import NoMarkersInfo from "@components/NoMarkersInfo";

const Markers: React.FC = () => {
  const { markers } = useContext(MarkersContext);

  const openAddMarkModalRef = React.useRef<() => void>(() => {});

  return (
    <div className={styles.container}>
      <AddMarkModal openModalRef={openAddMarkModalRef} />
      <button
        className={styles.newMarker}
        onClick={() => openAddMarkModalRef.current()}
      >
        <RiAddFill size={24} />
        Add Marker
      </button>
      {markers.length > 0 ? (
        <div className={styles.markers}>
          {markers.map((marker, index) => (
            <MarkItem key={index} index={index} marker={marker} />
          ))}
        </div>
      ) : (
        <div className={styles.noMarkers}>
          <NoMarkersInfo />
        </div>
      )}
    </div>
  );
};

export default Markers;

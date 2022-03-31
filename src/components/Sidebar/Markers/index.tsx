import React, { useContext } from "react";
import { MarkersContext } from "@contexts/MarkersContext";
import AddMarkModal from "@components/AddMarkModal";
import MarkItem from "@components/MarkItem";

import styles from "./styles.module.scss";
import { AnimatePresence, motion } from "framer-motion";

import { RiAddFill } from "react-icons/ri";

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
        <RiAddFill />
        Add Marker
      </button>
      <div className={styles.markers}>
        {markers.map((marker, index) => (
          <MarkItem key={index} index={index} marker={marker} />
        ))}
      </div>
    </div>
  );
};

export default Markers;

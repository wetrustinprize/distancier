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
        <AnimatePresence>
          {markers.map((marker, index) => (
            <motion.div
              animate={{ opacity: [0, 1], y: [5, 0] }}
              exit={{ opacity: 0, y: 5 }}
              transition={{
                duration: 0.15,
              }}
              key={index}
            >
              <MarkItem index={index} marker={marker} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Markers;

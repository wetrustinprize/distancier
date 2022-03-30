import React, { useContext } from "react";
import { MarkersContext } from "@contexts/MarkersContext";
import AddMarkModal from "@components/AddMarkModal";
import MarkItem from "@components/MarkItem";

import styles from "./styles.module.scss";

const Markers: React.FC = () => {
  const { markers } = useContext(MarkersContext);

  const openAddMarkModalRef = React.useRef<() => void>(() => {});

  return (
    <div className={styles.container}>
      <AddMarkModal openModalRef={openAddMarkModalRef} />
      <button onClick={() => openAddMarkModalRef.current()}>Add mark</button>
      <div className={styles.markers}>
        {markers.map((marker, index) => (
          <MarkItem key={index} index={index} marker={marker} />
        ))}
      </div>
    </div>
  );
};

export default Markers;

import React, { useContext } from "react";
import { Mark } from "@interfaces/Mark";
import { MarkersContext } from "@contexts/MarkersContext";
import AddMarkModal from "@components/AddMarkModal";

interface IMarkItem {
  marker: Mark;
  index: number;
}

const MarkItem: React.FC<IMarkItem> = ({ index, marker }: IMarkItem) => {
  const { removeMarker } = useContext(MarkersContext);

  return (
    <div>
      <h1>{marker.title}</h1>
      <div>
        <span>{marker.position.lat}</span>
        <span>{marker.position.lng}</span>
      </div>
      <div>
        <span>{marker.type}</span>
      </div>
      <div>
        {marker.tags.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
      <button onClick={() => removeMarker(index)}>x</button>
    </div>
  );
};

const Markers: React.FC = () => {
  const { markers } = useContext(MarkersContext);

  const openAddMarkModalRef = React.useRef<() => void>(() => {});

  return (
    <div>
      <AddMarkModal openModalRef={openAddMarkModalRef} />
      <button onClick={() => openAddMarkModalRef.current()}>Add mark</button>
      <div>
        {markers.map((marker, index) => (
          <MarkItem key={index} index={index} marker={marker} />
        ))}
      </div>
    </div>
  );
};

export default Markers;

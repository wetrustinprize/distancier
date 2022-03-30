import { MarkersContext } from "@contexts/MarkersContext";
import React, { useContext, useState } from "react";
import ReactModal from "react-modal";

interface IAddMarkModal {
  openModalRef: React.MutableRefObject<() => void>;
}

const AddMarkModal: React.FC<IAddMarkModal> = ({
  openModalRef,
}: IAddMarkModal) => {
  const [isOpen, setIsOpen] = useState(false);
  const { addMarker } = useContext(MarkersContext);

  openModalRef.current = () => setIsOpen(true);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      ariaHideApp={false}
    >
      <form
        onSubmit={(e) => {
          const data = new FormData(e.currentTarget);
          e.preventDefault();

          addMarker({
            title: data.get("title") as string,
            position: {
              lat: parseFloat(data.get("lat") as string),
              lng: parseFloat(data.get("lng") as string),
            },
            tags: data.get("tags")?.toString().split(",") as string[],
            type: data.get("type") as any,
          });

          setIsOpen(false);
        }}
      >
        <label>Title</label>
        <input name="title" type="text" />
        <label>Lat</label>
        <input name="lat" type="number" />
        <label>Lng</label>
        <input name="lng" type="number" />
        <label>Type</label>
        <select name="type">
          <option value="house">House</option>
          <option value="place">Place</option>
        </select>
        <label>Tags</label>
        <input name="tags" type="text" />
        <input type="submit" value="Add" />
      </form>
    </ReactModal>
  );
};

export default AddMarkModal;

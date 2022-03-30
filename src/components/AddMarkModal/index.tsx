import { MarkersContext } from "@contexts/MarkersContext";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import ReactModal from "react-modal";

import styles from "./styles.module.scss";

interface IAddMarkModal {
  openModalRef: React.MutableRefObject<() => void>;
}

const AddMarkModal: React.FC<IAddMarkModal> = ({
  openModalRef,
}: IAddMarkModal) => {
  const [isOpen, setIsOpen] = useState(false);
  const { addMarker } = useContext(MarkersContext);

  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);

  const [latLngString, setLatLngString] = useState<string>("0,0");

  const setLatLng = (lat: number, lng: number) => {
    setLat(lat);
    setLng(lng);
    setLatLngString(`${lat}, ${lng}`);
  };

  useEffect(() => {
    const split = latLngString.replace(" ", "").split(",");

    if (split.length === 2) {
      const newLat = parseFloat(split[0]);
      const newLng = parseFloat(split[1]);

      if (newLat && newLng) {
        setLat(newLat);
        setLng(newLng);
      }
    }
  }, [latLngString]);

  openModalRef.current = () => setIsOpen(true);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      ariaHideApp={false}
      style={{
        content: {
          height: "max-content",
          width: "max-content",
          margin: "auto",
          backgroundColor: "transparent",
          padding: "0",
          border: "0",
          overflow: "visible",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <motion.div
        animate={{
          y: [10, 0],
          opacity: [0, 1],
        }}
        transition={{
          duration: 0.2,
        }}
        className={styles.container}
      >
        <form
          className={styles.form}
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
          <hr />
          <div className={styles.latLng}>
            <div>
              <label>Lat</label>
              <input
                onChange={(e) =>
                  setLatLng(parseFloat(e.currentTarget.value), lng)
                }
                value={lat}
                name="lat"
                type="number"
              />
            </div>
            <div>
              <label>Lng</label>
              <input
                onChange={(e) =>
                  setLatLng(lat, parseFloat(e.currentTarget.value))
                }
                value={lng}
                name="lng"
                type="number"
              />
            </div>
          </div>
          <label>
            Lat + Lng <small>(divided by comma)</small>
          </label>
          <input
            value={latLngString}
            onChange={(e) => setLatLngString(e.target.value)}
            type="text"
          />
          <hr />
          <label>Type</label>
          <select name="type">
            <option value="house">House</option>
            <option value="place">Place</option>
          </select>
          <label>
            Tags <small>(divided by comma)</small>
          </label>
          <input name="tags" type="text" />
          <div className={styles.buttons}>
            <input type="submit" value="Add" />
            <button type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </ReactModal>
  );
};

export default AddMarkModal;

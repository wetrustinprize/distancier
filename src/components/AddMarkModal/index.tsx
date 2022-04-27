import Map from "@components/Map";
import MapMarker from "@components/MapMarker";
import { MarkersContext } from "@contexts/MarkersContext";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BsFillHouseFill, BsPinFill } from "react-icons/bs";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import ReactModal from "react-modal";

import styles from "./styles.module.scss";

interface IAddMarkModal {
  /**
   * Reference callback to open the modal.
   */
  openModalRef: React.MutableRefObject<() => void>;
}

/**
 * Modal for creating a new modal.
 *
 * @component
 */
const AddMarkModal: React.FC<IAddMarkModal> = ({
  openModalRef,
}: IAddMarkModal) => {
  const [isOpen, setIsOpen] = useState(false);
  openModalRef.current = () => setIsOpen(true);

  const { addMarker } = useContext(MarkersContext);

  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);

  const [type, setType] = useState<"house" | "place">("house");

  const [latLngString, setLatLngString] = useState<string>("0,0");

  const [tags, setTags] = useState<string[]>([]);

  const panToRef = useRef<(latLng: google.maps.LatLngLiteral) => void>(
    () => {}
  );
  const tagInputRef = useRef<HTMLInputElement>(null);

  // Sets the new lat and lng
  const setLatLng = (lat: number, lng: number) => {
    setLat(lat);
    setLng(lng);
    setLatLngString(`${lat}, ${lng}`);
  };

  // Map click handler
  const onClickMap = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    setLatLng(e.latLng.lat(), e.latLng.lng());
  };

  // Create tag
  const addTag = (tag: string) => {
    if (!tag) return;
    if (tags.includes(tag)) return;

    setTags([...tags, tag]);
  };

  // Remove tag
  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // Form submit handler
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);

    event.preventDefault();

    addMarker({
      title: data.get("title") as string,
      position: {
        lat,
        lng,
      },
      tags,
      type,
    });

    setIsOpen(false);
  };

  // Reset values
  useEffect(() => {
    const checkClipboard = async () => {
      const clipboard = await navigator.clipboard.readText();
      const split = clipboard.split(",");

      if (split.length === 2) setLatLngString(clipboard);
    };

    setLatLng(0, 0);
    setLatLngString("");
    setType("house");
    checkClipboard();
  }, [isOpen]);

  // Moves the map to the new Lat and Lng
  useEffect(() => {
    if (panToRef.current) panToRef.current({ lat, lng });
  }, [lat, lng]);

  // Lat Lng to string
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
        <Map
          onClick={onClickMap}
          className={styles.map}
          panToRef={panToRef}
          options={{
            disableDefaultUI: true,
          }}
        >
          <MapMarker
            mark={{
              position: { lat, lng },
              title: "",
              tags: [],
              type,
            }}
          />
        </Map>
        <form className={styles.form} onSubmit={onSubmit}>
          <label>Name</label>
          <input placeholder="Put name here..." name="title" type="text" />
          <label>Latitude, Longitude</label>
          <input
            value={latLngString}
            onChange={(e) => setLatLngString(e.target.value)}
            type="text"
            placeholder="0.00, 0.00"
          />
          <label>Tags</label>
          <section className={styles.tagsInput}>
            <input
              placeholder="Type tag here..."
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                e.preventDefault();

                addTag((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = "";
              }}
              name="tags"
              type="text"
              ref={tagInputRef}
            />
            <button
              onClick={() => {
                if (!tagInputRef.current) return;

                addTag(tagInputRef.current.value);
                tagInputRef.current.value = "";
              }}
              type="button"
            >
              <IoIosAdd />
            </button>
          </section>
          <section className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag}>
                {tag}
                <button onClick={() => removeTag(tag)} type="button">
                  <IoIosClose />
                </button>
              </span>
            ))}
          </section>
          <label>Type</label>
          <section className={styles.type}>
            <button
              className={type === "house" ? styles.selected : ""}
              type="button"
              onClick={() => setType("house")}
            >
              <BsFillHouseFill />
            </button>
            <button
              className={type === "place" ? styles.selected : ""}
              type="button"
              onClick={() => setType("place")}
            >
              <BsPinFill />
            </button>
          </section>
          <section className={styles.buttons}>
            <input type="submit" value="Create" />
            <button type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
          </section>
        </form>
      </motion.div>
    </ReactModal>
  );
};

export default AddMarkModal;

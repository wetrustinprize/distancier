import Map from "@components/Map";
import MapMarker from "@components/MapMarker";
import { MarkersContext } from "@contexts/MarkersContext";
import { getCoordinatesByAddress } from "@services/Geocode";
import { motion } from "framer-motion";
import { debounce } from "lodash";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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

  const [latLngString, setLatLngString] = useState<string>("0,0");
  const [addressString, setAddressString] = useState<string>("");

  const panToRef = useRef<(latLng: google.maps.LatLngLiteral) => void>(
    () => {}
  );

  // Fetches the address with a debounce
  const fetchAddress = useRef(
    debounce(async (address: string) => {
      // TODO: Wait for Google's billing response to implement
      return;

      const result = await getCoordinatesByAddress(address);

      console.log({ ...result });
    }, 1000)
  ).current;

  // Sets the address
  const setAddress = (address: string) => {
    setAddressString(address);

    // Call the debounce function
    fetchAddress(address);
  };

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

  // Form submit handler
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);

    event.preventDefault();

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
  };

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
              type: "house",
              tags: [],
            }}
          />
        </Map>
        <form className={styles.form} onSubmit={onSubmit}>
          <label>Title</label>
          <input name="title" type="text" />
          <hr />
          <label>Address</label>
          <input
            name="address"
            type="text"
            value={addressString}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
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

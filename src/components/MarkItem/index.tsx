import { MarkersContext } from "@contexts/MarkersContext";
import { Mark } from "@interfaces/Mark";
import { useContext } from "react";

import { BsFillHouseFill, BsPinFill, BsFillTrashFill } from "react-icons/bs";
import { AiFillTag } from "react-icons/ai";

import styles from "./styles.module.scss";
import { toast } from "react-toastify";

interface IMarkItem {
  /**
   * The marker to show information about.
   */
  marker: Mark;

  /**
   * The marker index from the MarkersContext. (Used when need to delete the marker)
   */
  index: number;
}

/**
 * Shows information about a specific marker.
 *
 * @component
 */
const MarkItem: React.FC<IMarkItem> = ({ index, marker }: IMarkItem) => {
  const { removeMarker } = useContext(MarkersContext);

  const copyLatLang = () => {
    const latLngString = `${marker.position.lat}, ${marker.position.lng}`;

    navigator.clipboard.writeText(latLngString);
    toast("Coordinates copied to clipboard!", {
      type: "info",
    });
  };

  const handleDeleteMarker = () => {
    removeMarker(index);

    toast("Marker deleted!", {
      type: "success",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>
          {marker.type === "house" ? <BsFillHouseFill /> : <BsPinFill />}
          {marker.title}
        </h1>
        <div>
          <span>{marker.type}</span>
          <button onClick={() => handleDeleteMarker()}>
            <BsFillTrashFill />
          </button>
        </div>
      </div>
      <div className={styles.info}>
        <div onClick={copyLatLang} className={styles.latLng}>
          <span>{marker.position.lat.toFixed(2)}</span>
          <span>{marker.position.lng.toFixed(2)}</span>
        </div>
        <div className={styles.tags}>
          {marker.tags.map((tag, index) => (
            <span key={index}>
              <AiFillTag />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarkItem;

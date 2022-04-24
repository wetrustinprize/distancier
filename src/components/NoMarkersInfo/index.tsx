import { BsPinMap } from "react-icons/bs";

import styles from "./styles.module.scss";

interface INoMarkersInfoProps {
  text?: string;
}

const NoMarkersInfo: React.FC<INoMarkersInfoProps> = ({
  text,
}: INoMarkersInfoProps) => {
  return (
    <div className={styles.container}>
      <BsPinMap />
      <h1>{text || "No markers!"}</h1>
    </div>
  );
};

export default NoMarkersInfo;

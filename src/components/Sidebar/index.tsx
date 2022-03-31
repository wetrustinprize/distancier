import React, { useState } from "react";
import Markers from "./Markers";

import styles from "./styles.module.scss";

interface ISidebarHeader {
  title: string;
  component: React.ReactNode;
}

const Headers: ISidebarHeader[] = [
  {
    title: "Markers",
    component: <Markers />,
  },
  {
    title: "Details",
    component: <div>Details</div>,
  },
];

const Sidebar: React.FC = () => {
  const [selectedHeader, setSelectedHeader] = useState<string>(
    Headers[0].title
  );

  return (
    <div className={styles.container}>
      <div className={styles.headers}>
        {Headers.map((h) => (
          <button
            key={h.title}
            onClick={() => setSelectedHeader(h.title)}
            className={selectedHeader === h.title ? styles.selected : ""}
          >
            {h.title}
          </button>
        ))}
      </div>
      <div className={styles.content}>
        {Headers.find((h) => h.title === selectedHeader)?.component}
      </div>
    </div>
  );
};

export default Sidebar;

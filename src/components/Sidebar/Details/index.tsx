import { MarkersContext } from "@contexts/MarkersContext";
import {
  calculateAverageDistancePerTag,
  calculateMarkerDistances,
  MarkerDistance,
  MarkerDistancePerTag,
} from "@utils/markers";
import React, { useContext, useEffect, useState } from "react";
import { AiFillTag, AiFillTags } from "react-icons/ai";
import { BsFillHouseFill, BsPinFill } from "react-icons/bs";
import { RiPinDistanceFill } from "react-icons/ri";
import { PieChart } from "react-minimal-pie-chart";
import { LabelRenderFunction } from "react-minimal-pie-chart/types/commonTypes";

import seedColor from "seed-color";

import styles from "./styles.module.scss";

const Details: React.FC = () => {
  const { selectedMarker, markers } = useContext(MarkersContext);

  const [distances, setDistances] = useState<MarkerDistance[]>([]);
  const [averages, setAverages] = useState<MarkerDistancePerTag[]>([]);

  // Calculate distances and averages
  useEffect(() => {
    if (selectedMarker) {
      const newDistances = calculateMarkerDistances(
        markers.filter((m) => m.type !== "house"),
        selectedMarker
      );

      if (newDistances.length > 0) {
        const newAverages = calculateAverageDistancePerTag(
          newDistances,
          selectedMarker
        );

        setAverages(newAverages);
      } else {
        setAverages([]);
      }
      setDistances(newDistances);
    }
  }, [distances, markers, selectedMarker]);

  //Function to render pie chat label
  const renderPieLabel: LabelRenderFunction = ({ dataEntry }) => {
    if (dataEntry.percentage < 25) return null;

    return `${Math.round(dataEntry.percentage)}%`;
  };

  return (
    <div className={styles.container}>
      {selectedMarker === null ? (
        <>
          <h1 className={styles.notSelected}>Nothing selected</h1>
          <h2 className={styles.notSelected}>Select a house marker</h2>
        </>
      ) : (
        <>
          <h1 className={styles.title}>{selectedMarker.title}</h1>
          <div className={styles.chart}>
            <PieChart
              label={renderPieLabel}
              labelStyle={{
                color: "white",
              }}
              data={averages.map((a, index) => {
                return {
                  title: a.tag,
                  value: a.average,
                  color: seedColor(index.toString()).toHex(),
                };
              })}
            />
          </div>
          <div className={styles.dataContainer}>
            <h1>
              <AiFillTags />
              Average by tags
            </h1>
            <ul className={styles.data}>
              {averages.map((a, index) => {
                return (
                  <li key={index}>
                    <div>
                      <div
                        style={{
                          backgroundColor: seedColor(index.toString()).toHex(),
                        }}
                        className={styles.color}
                      />
                      <span className={styles.tag}>{a.tag}</span>
                    </div>
                    <div>
                      <span className={styles.value}>
                        {a.average.toFixed(2)}
                      </span>
                      <span className={styles.km}>km</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.dataContainer}>
            <h1>
              <RiPinDistanceFill />
              Distances
            </h1>
            <ul className={styles.data}>
              {distances.map((d, index) => {
                return (
                  <li key={index}>
                    <div>
                      <div
                        style={{
                          backgroundColor: seedColor(index.toString()).toHex(),
                        }}
                        className={styles.color}
                      >
                        {d.marker.type === "house" ? (
                          <BsFillHouseFill />
                        ) : (
                          <BsPinFill />
                        )}
                      </div>
                      <span className={styles.tag}>{d.marker.title}</span>
                    </div>
                    <div>
                      <span className={styles.value}>
                        {d.distance.toFixed(2)}
                      </span>
                      <span className={styles.km}>km</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;

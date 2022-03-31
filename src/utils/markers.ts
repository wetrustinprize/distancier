import { Mark } from "@interfaces/Mark";
import { distanceBetween } from "./coordinates";

export interface MarkerDistance {
  marker: Mark;
  distance: number;
}

export interface MarkerDistancePerTag {
  tag: string;
  distances: MarkerDistance[];
  totalDistance: number;
  average: number;
}

/**
 * Gets all tags from a array of distances and calculate the average for reach tag
 * @param distances The distances to calculate the average for
 * @returns Average distance and total per tag sorted by average
 */
export const calculateAverageDistancePerTag = (
  distances: MarkerDistance[],
  filter: Mark[] | Mark | undefined = undefined
): MarkerDistancePerTag[] => {
  const distancesPerTag: MarkerDistancePerTag[] = [];
  const tags = new Set<string>();

  const filterMark = filter ? (Array.isArray(filter) ? filter : [filter]) : [];

  distances.forEach((distance) => {
    if (filterMark.findIndex((mark) => mark === distance.marker) !== -1) return;

    distance.marker.tags.forEach((tag) => {
      tags.add(tag);
    });
  });

  tags.forEach((tag) => {
    const distancesForTag = distances.filter((distance) =>
      distance.marker.tags.includes(tag)
    );

    const average =
      distancesForTag.reduce((acc, curr) => acc + curr.distance, 0) /
      distancesForTag.length;

    const totalDistance = distancesForTag.reduce(
      (acc, curr) => acc + curr.distance,
      0
    );

    distancesPerTag.push({
      tag,
      distances: distancesForTag,
      totalDistance,
      average,
    });
  });

  return distancesPerTag.sort((a, b) => b.average - a.average);
};

/**
 *
 * @param markers The markers to loop through
 * @param point The point to calculate the distance from
 * @returns The markers sorted by distance from the point and their distance
 */
export const calculateMarkerDistances = (
  markers: Mark[],
  point: Mark
): MarkerDistance[] => {
  return markers
    .map((marker) => {
      const distance = distanceBetween(point.position, marker.position);
      return {
        marker,
        distance,
      };
    })
    .sort((a, b) => a.distance - b.distance);
};

/**
 * Calculates the distance between two points in km.
 * @param point1 First point
 * @param point2 Second point
 * @returns Distance in km
 */
export const distanceBetween = (
  point1: google.maps.LatLngLiteral,
  point2: google.maps.LatLngLiteral
) => {
  const R = 6371e3; // metres
  const φ1 = (point1.lat * Math.PI) / 180;
  const φ2 = (point2.lat * Math.PI) / 180;
  const Δφ = ((point2.lat - point1.lat) * Math.PI) / 180;
  const Δλ = ((point2.lng - point1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return (R * c) / 1000;
};

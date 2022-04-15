/**
 * Returns the distance using Google Maps Distance Matrix API
 * @param origins The origins
 * @param destinations The destinations
 * @param travelMode The travel mode
 * @returns The distances
 */
export const getDistanceMatrix = async (
  origins: google.maps.LatLngLiteral[],
  destinations: google.maps.LatLngLiteral[],
  travelMode: google.maps.TravelMode
): Promise<google.maps.DistanceMatrixResponse> => {
  const service = new google.maps.DistanceMatrixService();

  const response = await service.getDistanceMatrix({
    destinations,
    origins,
    travelMode,
  });

  return response;
};

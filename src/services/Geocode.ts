/**
 * Gets the geocode information by coordinates
 * @param latLng The coordinates to geocode
 * @returns The geocode response
 */
export const getAddressByCoordinates = async (
  latLng: google.maps.LatLngLiteral
): Promise<google.maps.GeocoderResponse> => {
  const service = new google.maps.Geocoder();

  const response = await service.geocode({
    location: latLng,
  });

  return response;
};

/**
 * Gets the geocode information by address
 * @param address The address to geocode
 * @returns The geocode response
 */
export const getCoordinatesByAddress = async (
  address: string
): Promise<google.maps.GeocoderResponse> => {
  const service = new google.maps.Geocoder();

  const response = await service.geocode({
    address,
  });

  return response;
};

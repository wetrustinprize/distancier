export interface Mark {
  title: string;
  type: "house" | "place";
  tags: string[];
  position: google.maps.LatLngLiteral;
}

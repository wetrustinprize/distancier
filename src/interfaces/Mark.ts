export interface Mark {
  title: string;
  type: "house" | "place";
  tags: string[];
  position: {
    lat: number;
    lng: number;
  };
}

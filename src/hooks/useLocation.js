import { useState, useEffect } from "react";
import * as Location from "expo-location";

export const useLocation = () => {
  const [location, setLocation] = useState("Lietuva");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let currentPosition = await Location.getCurrentPositionAsync({});
      let geocode = await Location.reverseGeocodeAsync(currentPosition.coords);
      if (geocode.length > 0) {
        setLocation(geocode[0].country);
      }
    })();
  }, []);

  return location;
};

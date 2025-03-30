import { useState, useEffect } from "react";
import * as Location from "expo-location";

export const useLocation = () => {
  const [location, setLocation] = useState("Lietuva");

  useEffect(() => {
    (async () => {
      // Request foreground permissions for location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      // Get the current position
      let currentPosition = await Location.getCurrentPositionAsync({});
      // Reverse-geocode to extract the country name
      let geocode = await Location.reverseGeocodeAsync(currentPosition.coords);
      if (geocode.length > 0) {
        setLocation(geocode[0].country);
      }
    })();
  }, []);

  return location;
};

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useState, useCallback, useEffect } from "react";
import { api } from "../lib/axios";
import axios from "axios";

const Minimap = () => {
  const center = {
    lng: 2.39865112304693,
    lat: 48.8894157409669,
  };
  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };

  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: "AIzaSyCTd-4w5z5_-dQtt6U1_dK-lWXRQVSjgGU",
  // });
  const [map, setMap] = useState<google.maps.Map>(null);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     let infoWindow = null;
  //     const geocoder = new google.maps.Geocoder();
  //     // Configure the click listener.
  //     if (map && isLoaded) {
  //       map.addListener(
  //         "click",
  //         async (mapsMouseEvent: google.maps.MapMouseEvent) => {
  //           // Close the current InfoWindow.
  //           infoWindow?.close();
  //           // Create a new InfoWindow.
  //           infoWindow = new google.maps.InfoWindow({
  //             position: mapsMouseEvent.latLng,
  //           });
  //           console.log(mapsMouseEvent.latLng.lat());
  //           const x = await geocoder.geocode({
  //             location: mapsMouseEvent.latLng,
  //           });
  //           console.log(x.results[0]);

  //           infoWindow.setContent(
  //             `<p>${JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)}</p>
  //            <p>${JSON.stringify(x.results[0], null, 2)}</p>`
  //           );
  //           infoWindow.open(map);
  //         }
  //       );
  //     }
  //   })();
  // }, [map, isLoaded]);
  return (
    // <div className=" w-full h-full">
    //   {isLoaded && (
    //     <GoogleMap
    //       mapContainerStyle={containerStyle}
    //       center={center}
    //       zoom={10}
    //       onLoad={onLoad}
    //       onUnmount={onUnmount}
    //     >
    //       {/* Child components, such as markers, info windows, etc. */}
    //       <></>
    //     </GoogleMap>
    //   )}
    // </div>
    <></>
  );
};
export default Minimap;

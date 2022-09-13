import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import Interface from "../components/Interface";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Home() {
  const [isOpenInterface, setIsOpenInterface] = useState(true)
  const defaultProps = {
    center: {
      lat: -33.868820,
      lng: 151.209290
    },
    zoom: 10
  };

  return (
    <>
      <div style={{ height: '100vh', width: '100%', position: 'relative' }}>


        {isOpenInterface && <Interface />}

        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCTd-4w5z5_-dQtt6U1_dK-lWXRQVSjgGU" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {/* <AnyReactComponent
          lat={-33.868820}
          lng={151.209290}
          text="My Marker"
        /> */}

        </GoogleMapReact>
      </div>
    </>

  );
}
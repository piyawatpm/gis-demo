import React, { useState, useCallback, useEffect, createContext } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  Polygon,
} from '@react-google-maps/api';

import Interface from '../components/Interface';
import Time from '../components/Time';

import AddDevice from '../components/AddDevice';
import Login from '../components/Login';
import { GetServerSidePropsContext } from 'next';
import { getCookieFromServer } from '../utils/cookie';
import ManageDevices from '../components/ManageDevices';
type HomeProps = {
  isLoggedin: boolean;
};

export const mockDistrict = ['area1', 'area2', 'area3'];
export const groupContext = createContext(null);

export default function Home({ isLoggedin }: HomeProps) {
  const libraries: (
    | 'drawing'
    | 'geometry'
    | 'localContext'
    | 'places'
    | 'visualization'
  )[] = ['places'];
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCTd-4w5z5_-dQtt6U1_dK-lWXRQVSjgGU',
    libraries: libraries,
  });
  const [map, setMap] = useState(null);
  const onLoad = useCallback(function callback(map) {
    map.setZoom(12);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  console.log(isLoggedin);
  const [isLogin, setIsLogin] = useState(isLoggedin);
  const [isAddDevice, setIsAddDevice] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');

  const containerStyle = {
    width: '100vw',
    height: '100vh',
  };

  const center = {
    lng: 2.39865112304693,
    lat: 48.8894157409669,
  };

  const openAddDevicePopup = () => {
    setIsAddDevice(true);
  };
  const closeAddDevicePopup = () => {
    setIsAddDevice(false);
  };
  const closeDeviceManage = () => {
    setIsDashboardOpen(false);
  };
  const createMapOptions = {
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: true,
    fullscreenControl: true,
    // disableDoubleClickZoom: true
  };

  return (
    <>
      <groupContext.Provider value={[setSelectedGroup, setIsDashboardOpen]}>
        <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
          {isAddDevice && (
            <AddDevice closeAddDevicePopup={closeAddDevicePopup} />
          )}

          {isDashboardOpen && (
            <ManageDevices
              selectedGroup={selectedGroup}
              closeDeviceManage={closeDeviceManage}
            />
          )}
          {isLogin ? (
            <Interface
              map={map}
              openAddDevicePopup={openAddDevicePopup}
              isVisible={!isDashboardOpen}
            />
          ) : (
            <Login login={setIsLogin} />
          )}

          {isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              options={createMapOptions}
              // zoom={10}

              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {/* Child components, such as markers, info windows, etc. */}

              {/* <Polygon
              onLoad={onLoad}
              paths={[
                { lat: 25.774, lng: -80.19 },
                { lat: 18.466, lng: -66.118 },
                { lat: 32.321, lng: -64.757 },
                { lat: 25.774, lng: -80.19 },
              ]}
              options={{
                fillColor: "lightblue",
                fillOpacity: 1,
                strokeColor: "red",
                strokeOpacity: 1,
                strokeWeight: 2,
                clickable: false,
                draggable: false,
                editable: false,
                geodesic: false,
                zIndex: 1,
              }}
            /> */}
            </GoogleMap>
          )}

          <Time />
        </div>
      </groupContext.Provider>
    </>
  );
}
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const token = getCookieFromServer('userToken', ctx);
    if (token) {
      return {
        props: {
          isLoggedin: true,
        },
      };
    } else {
      return {
        props: {
          isLoggedin: false,
        },
      };
    }
  } catch (error) {
    return {
      props: {
        isLoggedin: false,
      },
    };
  }
}

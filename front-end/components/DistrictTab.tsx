import { Fragment, ReactElement, useContext, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { groupContext } from "../pages";
import District from "./DistrictCard";
import MyCombobox from "./MyCombobox";
import { useMemo } from "react";
import useSWR from "swr";
import { api } from "../lib/axios";
type View = "overall" | string;

const districtTab = ({ openAddDevicePopup, map }: any) => {
  const [setSelectedGroup, setIsDashboardOpen] = useContext(groupContext);
  const [viewState, setViewState] = useState<View>("overall");
  const [selectDistrict, setSelectDistrict] = useState<string>();
  const [filteredByClient, setFilteredByClient] = useState();
  const [renderedMarker, setRenderedMarker] = useState([]);
  const [labelsOnmap, setLabelsOnMap] = useState([]);
  const addressDeviceGroup = `/api/v1/deviceGroup`;
  const fetcherDevice = async (url) =>
    await api.get(url).then((res) => res.data);
  const { data: deviceGroup } = useSWR(addressDeviceGroup, fetcherDevice);

  const addressClient = `/api/v1/client`;
  const fetcherClient = async (url) =>
    await api.get(url).then((res) => res.data);
  const { data: clients } = useSWR(addressClient, fetcherClient);

  const addressLocations = `/api/v1/location`;
  const fetcherLocation = async (url) =>
    await api.get(url).then((res) => {
      // const temp = JSON.parse(res.data.pop());
      const temp = res.data.pop();
      temp.geoJson = JSON.parse(temp.geoJson);
      console.log(temp);
      res.data.push(temp);
      return res.data;
    });
  const { data: location } = useSWR(addressLocations, fetcherLocation);

  const modifiedData = useMemo(() => {
    if (filteredByClient === "All") return deviceGroup;
    let output;
    if (deviceGroup) {
      output = deviceGroup.filter((e) => {
        return e.client.includes(
          clients?.filter((r) => r.name === filteredByClient)[0]?.id
        );
      });
    }
    return output;
  }, [deviceGroup, filteredByClient]);
  const devicesByDistrict = useMemo(() => {
    if (!modifiedData) return [];
    const grouped = modifiedData.reduce((prev, cur) => {
      return prev[cur.location]
        ? { ...prev, [cur.location]: [...prev[cur.location], cur] }
        : { ...prev, [cur.location]: [cur] };
    }, {});
    const formattedData = Object.entries(grouped).reduce(
      (prev, [key, value]) => {
        // @ts-ignore
        const r = value.reduce((prev, cur, idx) => {
          if (idx === 0) {
            return {
              offline_devices: cur["offline_devices"],
              online_devices: cur["online_devices"],
              total_devices: cur["total_devices"],
              warning_devices: cur["warning_devices"],
            };
          } else {
            return {
              offline_devices: prev["offline_devices"] + cur["offline_devices"],
              online_devices: prev["online_devices"] + cur["online_devices"],
              total_devices: prev["total_devices"] + cur["total_devices"],
              warning_devices: prev["warning_devices"] + cur["warning_devices"],
            };
          }
        }, {});
        return { ...prev, [key]: { sumData: r } };
      },
      {}
    );
    return formattedData;
  }, [modifiedData]);
  const filteredByDistrict = useMemo(() => {
    if (!modifiedData) return [];
    let filteredDistrict = modifiedData.filter((e) => e.location == viewState);
    return filteredDistrict;
  }, [viewState, modifiedData]);

  const extractCentroid = (coordinatesString: string) => {
    const pattern = /POINT \((.*) (.*)\)/;
    const match = coordinatesString.match(pattern);
    if (match) {
      const lat = parseFloat(match[2]);
      const lng = parseFloat(match[1]);
      return { lat: lat, lng: lng };
    }
  };

  const resetMap = () => {
    console.log(labelsOnmap);
    labelsOnmap.forEach((e) => {
      // console.log("delete ", e);
      e.setMap(null);
    });
    map.data.forEach(function (feature) {
      map.data.remove(feature);
    });
    setLabelsOnMap([]);
  };

  useEffect(() => {
    if (viewState !== "overall") {
      map.setZoom(14.8);

      map.data.forEach((event) => {
        const CentroidString = event.getProperty("centroid");
        const { lat, lng } = extractCentroid(CentroidString);
        map.setCenter(new google.maps.LatLng(lat, lng - 0.008));
      });
      filteredByDistrict.map((item) => {
        var marker = new google.maps.Marker({
          position: {
            lng: item.lng,
            lat: item.lat,
          },
        });
        setRenderedMarker((p) => [...p, marker]);
        marker.setMap(map);
      });
    } else {
      //clear marker if change view point
      renderedMarker.forEach((e) => {
        e.setMap(null);
      });
      const arr = Object.keys(devicesByDistrict);
      const filteredLocation = location?.filter((e) => arr.includes(`${e.id}`));
      filteredLocation?.map((location) => {
        map.data.addGeoJson(location.geoJson);
        const CentroidString = location.geoJson.features[0].properties.centroid;
        const { lat, lng } = extractCentroid(CentroidString);

        const label = new google.maps.Marker({
          position: {
            lat: lat,
            lng: lng,
          },
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 0,
            scaledSize: new google.maps.Size(30, 30),
          },
          map: map,
          label: {
            text: location.geoJson.features[0].properties.name_3,
            color: "#000000",
            fontSize: "15px",
            fontWeight: "bold",
          },
          visible: false,
        });

        setLabelsOnMap((p) => [...p, label]);
      });

      map.setZoom(12);
    }
  }, [viewState]);

  const filteredByClients = (targetClient) => {
    setFilteredByClient(targetClient);
  };
  const selectedDistrict = (district) => {
    resetMap();
    const targetDistrict = location?.find(
      (location) => location.id == district
    );
    map.data.addGeoJson(targetDistrict?.geoJson);

    setViewState(district);
  };

  useEffect(() => {
    const zoomListener = google.maps.event.addListener(
      map,
      "zoom_changed",
      () => {
        if (map.getZoom() < 14) {
          labelsOnmap.forEach((label) => label.setVisible(false));
        } else {
          labelsOnmap.forEach((label) => label.setVisible(true));
        }
      }
    );
    // for handle click map
    const clickListener = map.data.addListener("click", (event) => {
      // console.log("click : ", event.feature.getProperty("id"));
      const getId = event.feature.getProperty("id");
      if (getId) {
        handleHighlightDistrice(getId.toString());
      }
    });

    // handle double click map
    const dblclickListener = map.data.addListener("dblclick", (event) => {
      // console.log("click : ", event.feature.getProperty("id"));

      const getId = event.feature.getProperty("id");

      if (getId) {
        selectedDistrict(getId);
      }
    });
    return () => {
      google.maps.event.removeListener(zoomListener);
      google.maps.event.removeListener(clickListener);
      google.maps.event.removeListener(dblclickListener);
    };
  }, [labelsOnmap]);

  const handleHighlightDistrice = (district) => {
    console.log("handleHighlightDistrice = ", district);
    setSelectDistrict(district);
  };

  useEffect(() => {
    resetMap();
    const arr = Object.keys(devicesByDistrict);
    const filteredLocation = location?.filter((e) => arr.includes(`${e.id}`));
    filteredLocation?.map((location) => {
      map.data.addGeoJson(location.geoJson);
      const CentroidString = location.geoJson.features[0].properties.centroid;
      const { lat, lng } = extractCentroid(CentroidString);

      const isVisible = map.getZoom() >= 14;
      const label = new google.maps.Marker({
        position: {
          lat: lat,
          lng: lng,
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 0,
          scaledSize: new google.maps.Size(30, 30),
        },
        map: map,
        label: {
          text: location.geoJson.features[0].properties.name_3,
          color: "#000000",
          fontSize: "15px",
          fontWeight: "bold",
        },
        visible: isVisible,
      });

      setLabelsOnMap((p) => [...p, label]);
    });
  }, [devicesByDistrict]);

  useEffect(() => {
    map.data.setStyle((feature) => {
      let color = "white";
      if (feature.getProperty("isSelected")) {
        color = "#8F8F8F";
      } else {
        color = "white";
      }
      return /** @type {!google.maps.Data.StyleOptions} */ {
        fillColor: color,
        strokeWeight: 3,
        strokeColor: "#707070",
      };
    });

    map.data.forEach((e) => {
      if (
        location?.find((e) => e.id == selectDistrict)?.geoJson.features[0]
          .properties.name_3 == e.j.name_3
      ) {
        e.setProperty("isSelected", true);
      } else e.setProperty("isSelected", false);
    });
  }, [selectDistrict]);

  const openDeviceManager = (i) => {
    setSelectedGroup(
      filteredByDistrict.filter((group) => {
        return group.id === i;
      })[0]
    );
    setIsDashboardOpen((p) => !p);
  };
  const clientList = clients?.map((e) => e.name);

  return (
    <div className=" flex  flex-col pb-6 px-3 h-full bg-[#F5F5F5] rounded-b-md  ">
      <div className=" w-full flex  min-h-[104px] pt-8 pb-[18px] pl-[30px]  ">
        {viewState === "overall" ? (
          <>
            {clients && (
              <MyCombobox
                filteredByClients={filteredByClients}
                clients={["All", ...clientList]}
                isFilter={true}
                className="w-full outline-none border-none py-2 pl-3 pr-10 text-[20px] font-bold leading-5 text-gray-900 focus:ring-0 bg-[#F5F5F5]"
              />
            )}
            <div className=" text-left flex items-start ml-[30px]">
              <p className=" text-[20px] font-bold  text-[#656565]">Client</p>
            </div>
            <button
              onClick={openAddDevicePopup}
              className=" ml-auto flex items-center justify-center w-[136px] h-[54px] space-x-3 styled"
            >
              <img src="/images/add.png" alt="" />
              <img
                src="/images/machine.png"
                className="w-[27px] h-[35px]"
                alt=""
              />
            </button>
          </>
        ) : (
          <div className=" flex items-center w-full">
            <button
              onClick={() => {
                setViewState("overall");
              }}
              className=" styled w-11 h-11"
            >
              <img
                src="/images/left2.png"
                className=" mx-auto my-auto"
                alt=""
              />
            </button>
            <p className="  mx-auto text-black font-bold text-[20px]">
              {
                location?.find((e) => e.id == selectDistrict)?.geoJson
                  .features[0].properties.name_3
              }
            </p>
          </div>
        )}
      </div>
      <div className="overflow-scroll h-full space-y-11 flex flex-col items-center rounded-[6px]  pl-[30px] pr-[20px]  custom-scrollbar">
        {viewState === "overall" && devicesByDistrict ? (
          <>
            {Object.entries(devicesByDistrict).map(([key, value]) => {
              const districtName = location?.find((e) => e.id == key)?.geoJson
                .features[0]?.properties.name_3;
              return (
                <District
                  doubleClick={selectedDistrict}
                  key={key}
                  selectDistrict={selectDistrict}
                  setSelectDistrict={handleHighlightDistrice}
                  data={{
                    // @ts-ignore
                    ozoneMate: value.sumData.total_devices,
                    // @ts-ignore
                    online: value.sumData.online_devices,
                    // @ts-ignore
                    offline: value.sumData.offline_devices,
                    // @ts-ignore
                    warning: value.sumData.warning_devices,
                    district: districtName,
                    id: key,
                  }}
                />
              );
            })}
          </>
        ) : (
          filteredByDistrict && (
            // selected district
            <>
              {filteredByDistrict.map((e) => {
                return (
                  <>
                    <District
                      doubleClick={openDeviceManager}
                      key={e.id}
                      selectDistrict={selectDistrict}
                      setSelectDistrict={handleHighlightDistrice}
                      data={{
                        // @ts-ignore
                        ozoneMate: e.total_devices,
                        // @ts-ignore
                        online: e.online_devices,
                        // @ts-ignore
                        offline: e.offline_devices,
                        // @ts-ignore
                        warning: e.warning_devices,
                        district: e.address,
                        id: e.id,
                      }}
                    />
                  </>
                );
              })}
            </>
          )
        )}
      </div>
    </div>
  );
};
export default districtTab;

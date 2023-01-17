import { useState } from "react";
import DataCards from "./DistrictCard";
import { v4 as uuidv4 } from "uuid";

type DevicesStatus = {
  owner: string;
  district: string;
  districtId?: string;
  id: string;
  location: string;
  ozoneMate: number;
  online: number;
  offline: number;
  alert: number;
};
const mockDataDevices: DevicesStatus[] = [
  {
    owner: "Andrew Watson",
    district: "FAUBORG SAINT-GERMAIN",
    location: "30 Rue de Buzenval, 92000 Nanterre overflow overflow",
    ozoneMate: 5,
    online: 6,
    offline: 7,
    alert: 1,
    id: uuidv4(),
  },
  {
    owner: "Andrew Watson",
    district: "FAUBORG SAINT-GERMAIN",
    location: "30 Rue de Buzenval, 92000 Nanterre overflow overflow",
    ozoneMate: 2,
    online: 2,
    offline: 7,
    alert: 1,
    id: uuidv4(),
  },
  {
    owner: "Andrew Watson",
    district: "FAUBORG SAINT-GERMAIN",
    location: "43 Rue du Calvaire Nanterre, Île-de ...",
    ozoneMate: 5,
    online: 6,
    offline: 7,
    alert: 0,
    id: uuidv4(),
  },
  {
    owner: "Andrew Watson",
    district: "FAUBORG SAINT-GERMAIN",
    location: "9 Av. Elisa Mercœur",
    ozoneMate: 5,
    online: 6,
    offline: 7,
    alert: 1,
    id: uuidv4(),
  },
  {
    owner: "Andrew Watson",
    district: "FAUBORG SAINT-GERMAIN",
    location: "27-21 Rue de Verdun",
    ozoneMate: 5,
    online: 6,
    offline: 7,
    alert: 0,
    id: uuidv4(),
  },
  {
    owner: "Andrew Watson",
    district: "FAUBORG SAINT-GERMAIN",
    location:
      "27-21 Rue de Verdun 27-21 Rue de Verdun 27-21 Rue de Verdun 27-21 Rue de Verdun",
    ozoneMate: 5,
    online: 6,
    offline: 7,
    alert: 1,
    id: uuidv4(),
  },
];

const DevicesList = ({ changeToDistrictList }) => {
  const [isSelectDevices, setIsSelectDevices] = useState<string>();
  return (
    <>
      <div className=" w-full flex  min-h-[104px] pt-8 pb-[18px] pl-[30px] items-center ">
        <button
          onClick={changeToDistrictList}
          className=" styled w-11 h-11 flex items-center justify-center"
        >
          <img src="/images/back-icon.png" className=" mr-[10%]" alt="" />
        </button>
        <div className=" flex flex-col mx-auto text-center text-[20px] font-bold">
          <p>(Andrew Watson)</p> <p>FAUBORG SAINT-GERMAIN</p>
        </div>
      </div>
      <div className="overflow-scroll space-y-11 flex flex-col items-center rounded-[6px]  pl-[30px] pr-[20px]  custom-scrollbar">
        {mockDataDevices.map((data: DevicesStatus) => {
          return (
            <DataCards
              data={data}
              // @ts-ignore
              isSelected={isSelectDevices}
              setSelected={setIsSelectDevices}
            />
          );
        })}
      </div>
    </>
  );
};
export default DevicesList;

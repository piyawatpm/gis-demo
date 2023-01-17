import Image from 'next/image';
import { useState } from 'react';
import OverviewTab from './OverviewTab';
import DistrictTab from './DistrictTab';
enum Tab {
  overview = 'OVERVIEW',
  districtList = 'districtList',
}
type InterfaceProps = {
  openAddDevicePopup: () => void;
  map: any;
  isVisible: boolean;
};
const Interface = ({ openAddDevicePopup, map, isVisible }: InterfaceProps) => {
  const [tab, setTab] = useState<Tab>(Tab.overview);
  const resetMap = () => {
    map.data.forEach(function (feature) {
      // filter...
      console.log(feature);
      map.data.remove(feature);
    });
  };
  return (
    <div
      className={` ${
        !isVisible && 'invisible'
      } w-[586px] h-[888px] absolute z-10 my-auto  translate-y-[-53%] 3xl:translate-y-[-53%] top-1/2  left-[5%]  scale-[61%] 3xl:scale-100  `}
    >
      <div className=" flex text-center  text-white h-[64px]  text-[24px] font-semibold ">
        <div
          onClick={() => {
            setTab(Tab.overview);
          }}
          className="w-1/2 flex items-center justify-center bg-gray-400 rounded-tl-[10px]  font-bold cursor-pointer"
        >
          OVERVIEW
        </div>
        <div
          onClick={() => {
            setTab(Tab.districtList);
          }}
          className="w-1/2 flex items-center justify-center bg-gray-400 rounded-tr-[10px]  font-bold cursor-pointer"
        >
          DISTRICT LIST
        </div>
      </div>
      <div className=" w-full h-2 bg-gray-400">
        <div
          className={` ${
            tab === Tab.districtList && ' translate-x-[100%]'
          } transition relative  duration-500  w-1/2 h-full bg-[#00D3FF] shine `}
        ></div>
      </div>
      {tab === Tab.overview ? (
        <OverviewTab />
      ) : (
        <DistrictTab map={map} openAddDevicePopup={openAddDevicePopup} />
      )}
    </div>
  );
};
export default Interface;

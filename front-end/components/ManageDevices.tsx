import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import DeviceCards from "./DeviceCards";
import DeviceDashboard from "./DeviceDashboard";
enum MenuState {
  DeviceDashboard,
  RentalManagement,
  DeviceManager,
  SimLog,
}
const ManageDevices = () => {
  const [menuState, setMenuState] = useState<MenuState>(
    MenuState.DeviceDashboard
  );
  const [open, setOpen] = useState(true);
  const handleOpen = () => {
    setOpen((e) => !e);
  };
  const ChangeMenuTo = (p: MenuState) => {
    setMenuState(p);
  };

  function Icon2({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="25"
        viewBox="0 0 33 25"
        className={`${id === open ? "rotate-180" : ""}  transition-transform`}
      >
        <g
          id="Group_865"
          data-name="Group 865"
          transform="translate(-1675 -83)"
        >
          <path
            id="Polygon_6"
            data-name="Polygon 6"
            d="M16.5,0,33,25H0Z"
            transform="translate(1675 83)"
            fill="#fff"
          />
        </g>
      </svg>
    );
  }
  const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <Accordion
      open={open}
      icon={<Icon2 id={1} open={open} />}
      className={`  absolute w-[1574px] top-0 ${
        open && "mt-[-8%]"
      }  3xl:mt-[2%]  left-1/2 z-10 translate-x-[-50%]  scale-75 3xl:scale-100  flex flex-col`}
    >
      <AccordionHeader
        onClick={handleOpen}
        className=" w-full flex py-[16px] px-[33px] items-center bg-[#9B9B9B] justify-between rounded-t-[10px]"
      >
        <img src="/images/left.png" alt="" />
        <p className=" text-[24px]  font-semibold   text-white">
          9 Av. Elisa Mercœur
        </p>
      </AccordionHeader>

      <AccordionBody className=" flex justify-center items-center w-full  space-x-[10px] py-[28px] bg-[#F5F5F5] h-[888px]  rounded-b-[10px] ">
        <div className=" w-[332px] h-full flex flex-col space-y-10">
          <div className=" flex flex-col py-3 w-full pl-3 text-[16px] font-bold bg-[#F5F5F5] rounded-[6px] shadow-md border-t-[3px] border-l-[3px]  border-white shadow-gray-300">
            <div className=" flex space-x-2">
              <p>CLIENT NAME:</p>
              <p className="text-[#636363]"> Andrew Watson</p>
            </div>
            <div className=" flex space-x-2">
              <p>DIVICE NAME:</p>
              <p className="text-[#636363]">ALPHA-11</p>
            </div>
            <div className=" flex space-x-2">
              <p>SN:</p>
              <p className="text-[#636363]">34235235-121214535-561</p>
            </div>
          </div>
          <div className=" bg-white py-[20px] rounded-[10px] h-full flex flex-col items-center justify-around">
            <div
              onClick={() => ChangeMenuTo(MenuState.DeviceDashboard)}
              className={`${
                menuState !== MenuState.DeviceDashboard && " opacity-20"
              } text-[24px]  font-bold bg-[#F5F5F5] cursor-pointer text-[#636363] w-[275px] h-[151px] shadow-md   border-white shadow-gray-300 flex items-center justify-center rounded-[6px]`}
            >
              <p className=" max-w-[138px] text-center">Device Dashboard</p>
            </div>
            <div
              onClick={() => ChangeMenuTo(MenuState.RentalManagement)}
              className={`${
                menuState !== MenuState.RentalManagement && " opacity-20"
              } text-[24px]  font-bold bg-[#F5F5F5] cursor-pointer text-[#636363] w-[275px] h-[151px] shadow-md   border-white shadow-gray-300 flex items-center justify-center rounded-[6px]`}
            >
              <p className=" max-w-[138px] text-center"> Rental Management</p>
            </div>
            <div
              onClick={() => ChangeMenuTo(MenuState.DeviceManager)}
              className={`${
                menuState !== MenuState.DeviceManager && " opacity-20"
              } text-[24px]  font-bold bg-[#F5F5F5] cursor-pointer text-[#636363] w-[275px] h-[151px] shadow-md   border-white shadow-gray-300 flex items-center justify-center rounded-[6px]`}
            >
              <p className=" max-w-[138px] text-center"> Device Management</p>
            </div>
            <div
              onClick={() => ChangeMenuTo(MenuState.SimLog)}
              className={`${
                menuState !== MenuState.SimLog && " opacity-20"
              } text-[24px]  font-bold bg-[#F5F5F5] cursor-pointer text-[#636363] w-[275px] h-[151px] shadow-md   border-white shadow-gray-300 flex items-center justify-center rounded-[6px]`}
            >
              <p className=" max-w-[138px] text-center"> Sim Log</p>
            </div>
          </div>
        </div>
        <div className="rounded-[6px] w-[1128px] h-full bg-[#F5F5F5] shadow-md   border-white shadow-gray-30 border-t-[3px] border-l-[3px] flex py-[35px] ">
          <div className="  w-[656px]  h-full ">
            {menuState === MenuState.DeviceDashboard && <DeviceDashboard />}
          </div>
          <div className=" w-[373px] h-full bg-[#F5F5F5] shadow-md   border-white shadow-gray-30 border-t-[3px] border-l-[3px] rounded-[6px] px-3 py-[15px] ml-auto">
            <div className=" rounded-[6px] active-card   w-full  overflow-scroll custom-scrollbar small pl-[18px] py-[21px] h-full space-y-[20px] ">
              {testArr.map((e) => {
                return <DeviceCards />;
              })}
            </div>
          </div>
        </div>
      </AccordionBody>
    </Accordion>
  );
};
export default ManageDevices;

const DeviceCards = ({
  deviceNumber,
  currentDevice,
  setCurrentDevice,
  deviceSerial,
}) => {
  return (
    <div
      onClick={() => {
        console.log('click card : ', deviceSerial);
        setCurrentDevice(deviceSerial);
      }}
      className={`rounded-[6px] cursor-pointer w-[265px] h-[115px] ${
        currentDevice == deviceSerial
          ? 'bg-[#B7B7B7]'
          : 'bg-[#F9F9F9] border-white  border-t-[3px] border-l-[3px]'
      }  shadow-lg shadow-gray-300   px-[22px]  pt-[8px] pb-[10px] flex`}
    >
      <div className="w-[133px] h-[94px] bg-[#F5F5F5] shadow-lg rounded-[10px]   border-white shadow-gray-30 border-t-[3px] border-l-[3px] flex items-center justify-center space-x-2">
        <img src="/images/machine.png" alt="" />
        <h1 className=" text-[48px] font-bold text-[#707070]">
          0{deviceNumber}
        </h1>
      </div>
      <div className=" flex flex-col justify-center space-y-5 ml-[14px] ">
        <div className=" flex space-x-[14px] items-center justify-center">
          <img src="/images/warning.png" className="w-[21px] h-[18px]" alt="" />
          <div className="  rounded-[6px] w-[39px] h-[29px] active-card-small flex items-center justify-center">
            <div className=" w-[29px] h-[21px] bg-[#FF0000] rounded-[4px]"></div>
          </div>
        </div>
        <div className=" flex space-x-[14px] items-center justify-center">
          <img
            src="/images/transfer.png"
            className="w-[21px] h-[15px]"
            alt=""
          />
          <div className="rounded-[6px] w-[39px] h-[29px] active-card-small flex items-center justify-center">
            <div className=" w-[29px] h-[21px] bg-[#00FF22] rounded-[4px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeviceCards;

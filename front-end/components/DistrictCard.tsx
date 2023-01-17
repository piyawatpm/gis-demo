type DistrictCardProps = {
  setSelectDistrict?: any;
  selectDistrict?: any;
  data: any;
  doubleClick?: any;
};
const DistrictCard = ({
  setSelectDistrict,
  selectDistrict,
  data,
  doubleClick,
}: DistrictCardProps) => {
  return (
    <div
      id={data.id}
      onClick={() => setSelectDistrict(data.id)}
      onDoubleClick={() => doubleClick(data.id)}
      className={` flex flex-col items-center rounded-[6px] w-full space-y-3 shadow-md ${
        data.id === selectDistrict
          ? "bg-[#B9B9B9]"
          : "bg-[#F5F5F5] border-t-[3px] border-l-[3px] border-white "
      }   shadow-gray-300   p-4 relative`}
    >
      {data.warning > 0 && (
        <img
          src="/images/alert.png"
          className="  absolute top-3  left-0 "
          alt=""
        />
      )}
      <div
        className={` ${
          data.warning > 0
            ? " text-white bg-[#FF0000]  "
            : " text-black bg-[#F5F5F5] shadow-md border-t-[3px] border-l-[3px]  border-white shadow-gray-300"
        }}  px-6 py-3  text-[20px] font-bold overflow-hidden  w-full rounded-[6px] whitespace-nowrap text-ellipsis `}
      >
        {data.district}
      </div>
      <div
        className={` flex justify-around w-full font-bold ${
          data.id === selectDistrict ? " text-black " : "  text-[#707070] "
        }`}
      >
        <div className=" flex items-center space-x-3">
          <img className="" src="/images/machine.png" alt="" />
          <h2 className="  text-[24px] ">{data.ozoneMate}</h2>
        </div>
        <div className=" flex items-center space-x-3">
          <img className="" src="/images/online.png" alt="" />
          <h2 className="  text-[24px] ">{data.online}</h2>
        </div>
        <div className=" flex items-center space-x-3">
          <img className="" src="/images/offline.png" alt="" />
          <h2 className="  text-[24px] ">{data.offline}</h2>
        </div>
        <div className=" flex items-center space-x-3">
          <img className="" src="/images/warning.png" alt="" />
          <h2 className="  text-[24px] ">{data.warning}</h2>
        </div>
      </div>
    </div>
  );
};
export default DistrictCard;

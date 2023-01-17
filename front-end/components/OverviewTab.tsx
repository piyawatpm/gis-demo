import { api } from '../lib/axios';
import useSWR from 'swr';
const overviewTab = () => {
  console.log('env = ', process.env.NEXT_PUBLIC_API_URL);
  const address = `/api/v1/overview`;
  const fetcher = async (url) => await api.get(url).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);

  return (
    <div className=" flex  justify-around  space-y-1 flex-col pt-[52px] pb-[33px] px-[28px] h-full bg-gray-100 rounded-b-md ">
      {data ? (
        <>
          {' '}
          <div className=" flex items-center rounded-[6px] min-h-[16%] shadow-md border-t-[3px] border-l-[3px] bg-gray-100 border-white shadow-gray-300  px-2 py-1 text-[20px] font-bold">
            <div className="flex flex-col items-center  translate-x-[-50%] ml-[15%] ">
              <img src="/images/machine.png" className=" " alt="" />
              <h2>OzoneMate</h2>
            </div>
            <div className="flex flex-col">
              <h2>Total Device</h2>
              <p className=" text-[70px] font-light text-[#707070] leading-[50px]">
                {data.total_devices}
              </p>
            </div>
          </div>
          <div className=" flex items-center rounded-[6px] min-h-[16%] shadow-md border-t-[3px] border-l-[3px] bg-gray-100 border-white shadow-gray-300  px-2 py-1">
            <div className="flex flex-col items-center  translate-x-[-50%] ml-[15%] w-1/4  ">
              <img src="/images/online.png" className="  " alt="" />
              <div className=" relative">
                <h2>Online</h2>
                <p className=" text-[50px] font-light text-[#707070] absolute bottom-[-13px] ml-[103px]">
                  {data.online_devices}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center  translate-x-[-50%] ml-[25%] ">
              <img src="/images/offline.png" className="  " alt="" />
              <div className=" relative">
                <h2>Offline</h2>
                <p className=" text-[50px] font-light text-[#707070] absolute bottom-[-13px] ml-[103px]">
                  {data.offline_devices}
                </p>
              </div>
            </div>
          </div>
          <div className=" flex items-center rounded-[6px] min-h-[16%] shadow-md border-t-[3px] border-l-[3px] bg-gray-100 border-white shadow-gray-300  px-2 py-1">
            <div className="flex flex-col items-center  translate-x-[-50%] ml-[15%] w-1/4  ">
              <img src="/images/warning.png" className="  " alt="" />
              <div className=" relative">
                <h2>Warning</h2>
                <p className=" text-[50px] font-light text-[#707070] absolute bottom-[-5px] ml-[112px]">
                  {data.warning_devices}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center  translate-x-[-50%] ml-[25%] ">
              <img src="/images/maintencence.png" className="  " alt="" />
              <div className=" relative">
                <h2>Maintencence</h2>
                <p className=" text-[50px] font-light text-[#707070] absolute bottom-[-5px] right-[-54%]">
                  {data.maintainence_devices}
                </p>
              </div>
            </div>
          </div>
          <div className=" flex flex-col rounded-[6px] min-h-[26%] shadow-md border-t-[3px] border-l-[3px] bg-gray-100 border-white shadow-gray-300  px-2 py-1 space-y-3">
            <div className="flex space-x-3">
              <div className="flex  items-center  translate-x-[-50%] ml-[15%] ">
                <img src="/images/cell.png" className=" " alt="" />
              </div>
              <div className=" flex flex-col">
                <h2>Cell Total Hours</h2>
                <p className=" text-[50px] font-light text-[#707070] ">
                  {Math.round(data.cellTotalHours / 60)}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <div className="flex  items-center  translate-x-[-50%] ml-[15%] ">
                <img src="/images/oxy.png" className=" " alt="" />
              </div>
              <div className=" flex flex-col">
                <h2>Oxy Total Hours</h2>
                <p className=" text-[50px] font-light text-[#707070] ">
                  {Math.round(data.oxyTotalHours / 60)}
                </p>
              </div>
            </div>
          </div>
          <div className=" flex items-center space-x-3 rounded-[6px] min-h-[16%] shadow-md border-t-[3px] border-l-[3px] bg-gray-100 border-white shadow-gray-300  px-2 py-1">
            <div className="flex flex-col  items-center  translate-x-[-50%] ml-[15%] ">
              <img src="/images/location.png" className="" alt="" />
            </div>
            <div className="flex flex-col">
              <h2>Location</h2>
              <p className=" text-[50px] font-light text-[#707070]">
                {data.locations}
              </p>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default overviewTab;

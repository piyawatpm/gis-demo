import { Autocomplete } from '@react-google-maps/api';

import { api } from '../lib/axios';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import MyCombobox from './MyCombobox';
type AddDeviceProps = {
  closeAddDevicePopup: () => void;
};

type FormData = {
  deviceName: string;
  clientName: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  locationEmail: string;
  locationPhoneNumber: string;
  serialNumber: string;
  simcardPhoneNumber: string;
  imei: string;
  simSerialNumber: string;
};
const AddDevice = ({ closeAddDevicePopup }: AddDeviceProps) => {
  const [formData, setFormData] = useState<FormData>();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [autocomplete, setAutocomplete] = useState();
  const [selectedSerial, setSelectedSerial] = useState<string>();
  const [allSerial, setAllSerial] = useState<string[]>();

  const addressSerial = `/api/v1/avaliableDevice`;
  const fetcherSerial = async (url) =>
    await api.get(url).then((res) => {
      return res.data;
    });
  const { data: serialFromApi } = useSWR(addressSerial, fetcherSerial);

  const addressClient = `/api/v1/client`;
  const fetcherClient = async (url) =>
    await api.get(url).then((res) => res.data);
  const { data: clients } = useSWR(addressClient, fetcherClient);

  useEffect(() => {
    if (serialFromApi) setAllSerial(serialFromApi.map((e) => e.serial).sort());
  }, [serialFromApi]);
  const onLoad = (autocomplete) => {
    console.log('autocomplete: ', autocomplete);

    setAutocomplete(autocomplete);
  };
  const onPlacesChanged = () => {
    if (autocomplete !== null) {
      // @ts-ignores

      const addressData = autocomplete.getPlace();
      const latFromAddress = addressData.geometry.location.lat();
      const lngFromAddress = addressData.geometry.location.lng();

      setFormData((p) => {
        return {
          ...p,
          address: addressData.formatted_address,
          location: { lat: latFromAddress, lng: lngFromAddress },
        };
      });
    }
  };

  const handleSubmitForm = () => {
    api
      .post('/api/v1/addDevice', {
        ...formData,
      })
      .then(function (response) {
        setIsPopupOpen(true);
        setSelectedSerial('');
        setFormData((p) => {
          return {
            ...p,
            deviceName: '',
            serialNumber: '',
            simcardPhoneNumber: '',
            imei: '',
            simSerialNumber: '',
          };
        });
        setIsComplete(true);
      })
      .catch(function (error) {
        setIsPopupOpen(true);
        setIsComplete(false);
      });
  };
  const getClientName = (targetClient) => {
    setFormData((p) => {
      return { ...p, clientName: targetClient };
    });
  };
  const clientList = clients?.map((e) => e.name);
  return (
    <div className=" z-20    bg-black/[45%] fixed inset-0  items-center justify-center font-bold">
      <div className=" flex items-center justify-center h-full  scale-[61%] 3xl:scale-100">
        <div className=" w-[1548px] h-[990px] bg-[#F5F5F5] px-[125px] py-[55px]  relative rounded-[10px]">
          {isPopupOpen && (
            <div className=" z-10 absolute bg-black/[45%] inset-0">
              <div className=" bg-white w-[585px] h-[260px] rounded-[5px] top-1/2 left-1/2 absolute translate-x-[-50%]  translate-y-[-50%] flex flex-col items-center justify-center space-y-10">
                <h1 className=" text-[28px] font-bold">
                  {isComplete ? 'DEVICE ADDED' : 'FAIL TO ADD DEVICE'}
                </h1>
                <img
                  src={`images/${isComplete ? 'success' : 'fail'}.png`}
                  onClick={() => {
                    setIsPopupOpen(false);
                  }}
                  className="w-[51px] cursor-pointer"
                  alt=""
                />
              </div>
            </div>
          )}
          <div className=" flex justify-center items-center space-x-2">
            <h1 className=" text-center text-[28px] ">ADD NEW DEVICE</h1>
            <img
              src="/images/machine.png"
              className=" w-[26px] h-[34px]"
              alt=""
            />
          </div>
          <div className="flex flex-col space-y-[40px]">
            <div className=" space-y-[25px]">
              <h1 className="text-[22px] ">Basic Information</h1>
              <div className=" text-[#656565] flex text-[20px] space-x-10">
                <div className=" flex">
                  <h2>Device Name</h2>
                  <input
                    value={formData?.deviceName}
                    onChange={(e) => {
                      setFormData((p) => {
                        return { ...p, deviceName: e.target.value };
                      });
                    }}
                    type="text"
                    className=" bg-[#F5F5F5] border-b-2 border-[#656565] focus:outline-0 text-black px-2"
                  />
                </div>
                <div className=" flex">
                  <h2>Client Name</h2>
                  {/* 
                      <input
                        type="text"
                        value={formData?.clientName}
                        onChange={(e) => {
                          setFormData((p) => {
                            return { ...p, clientName: e.target.value };
                          });
                        }}
                        className=" bg-[#F5F5F5] border-b-2 border-[#656565] focus:outline-0 text-black px-2"
                      /> */}
                  {clients && (
                    <MyCombobox
                      filteredByClients={getClientName}
                      clients={[...clientList]}
                      isFilter={false}
                      className="w-full border-none  outline-none pl-3 pr-10 text-[20px] font-bold leading-5 text-gray-900 focus:ring-0 bg-[#F5F5F5]"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className=" space-y-[25px]">
              <h1 className="text-[22px] ">Location Information</h1>

              <div className=" text-[#656565] flex text-[20px] space-x-10">
                <div className=" flex w-full">
                  <h2>Address</h2>

                  <Autocomplete
                    onLoad={onLoad}
                    onPlaceChanged={onPlacesChanged}
                    className="w-full"
                  >
                    <input
                      type="text"
                      placeholder=""
                      className=" w-full bg-[#F5F5F5] border-b-2 border-[#656565] focus:outline-0 text-black px-2"
                    />
                  </Autocomplete>
                </div>
              </div>
              <div className=" text-[#656565] flex text-[20px] space-x-10">
                {/* <div className=" flex">
                      <h2>city</h2>
                      <input
                        type="text"
                        className="  w-[213px] bg-[#F5F5F5] border-b-2 border-[#656565] focus:outline-0 text-black px-2"
                      />
                    </div>
                    <div className=" flex">
                      <h2>Post Code</h2>
                      <input
                        type="text"
                        className="  w-[110px] bg-[#F5F5F5] border-b-2 border-[#656565] focus:outline-0 text-black px-2"
                      />
                    </div> */}
                <div className=" flex">
                  <h2>Email</h2>
                  <input
                    type="text"
                    value={formData?.locationEmail}
                    onChange={(e) => {
                      setFormData((p) => {
                        return { ...p, locationEmail: e.target.value };
                      });
                    }}
                    className="  w-[213px] bg-[#F5F5F5] border-b-2 border-[#656565] focus:outline-0 text-black px-2"
                  />
                </div>
                <div className=" flex">
                  <h2>Phone Number</h2>
                  <input
                    type="text"
                    value={formData?.locationPhoneNumber}
                    onChange={(e) => {
                      setFormData((p) => {
                        return {
                          ...p,
                          locationPhoneNumber: e.target.value,
                        };
                      });
                    }}
                    className=" w-[230px]  bg-[#F5F5F5] border-b-2 border-[#656565] focus:outline-0 text-black px-2"
                  />
                </div>
              </div>
            </div>
            <div className=" space-y-[25px]">
              <h1 className="text-[22px]  ">Device Serial Number </h1>
              <div className=" text-[#656565] flex text-[20px] space-x-10">
                <div className=" flex items-start ">
                  <h2 className="whitespace-nowrap">Serial Number</h2>
                  <input
                    type="text"
                    value={selectedSerial}
                    className=" w-[385px] bg-[#F5F5F5] border-b-2 border-[#656565] focus:outline-0 text-black px-2"
                  />
                </div>
                <div className=" w-[714px] h-[164px] flex flex-col custom-scrollbar small overflow-scroll  p-[12px]">
                  <div className=" bg-[#EFEFEF] active-card p-[12px] h-fit ">
                    <div className=" bg-[#EFEFEF] flex flex-col px-[23px]">
                      {allSerial &&
                        allSerial.map((e) => {
                          return (
                            <p
                              onClick={() => {
                                setSelectedSerial(e);
                                setFormData((p) => {
                                  return { ...p, serialNumber: e };
                                });
                              }}
                              className={`${
                                e === selectedSerial
                                  ? 'bg-[#656565] text-white'
                                  : 'hover:bg-[#656565]/20'
                              } cursor-pointer  w-full text-center text-[20px] font-semibold border-b-[2px] border-[#707070]/36`}
                            >
                              {e}
                            </p>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" space-y-[25px] ">
              <h1 className="text-[22px] ">SIM Card Information</h1>
              <div className=" text-[#656565] flex text-[20px] space-x-10">
                <div className=" flex">
                  <h2>Phone Number</h2>
                  <input
                    type="text"
                    value={formData?.simcardPhoneNumber}
                    onChange={(e) => {
                      setFormData((p) => {
                        return { ...p, simcardPhoneNumber: e.target.value };
                      });
                    }}
                    className=" w-[230px] bg-[#F5F5F5] border-b-2 border-[#656565] focus:outline-0 text-black px-2"
                  />
                </div>
                <div className=" flex">
                  <h2>IMEI</h2>
                  <input
                    type="text"
                    value={formData?.imei}
                    onChange={(e) => {
                      setFormData((p) => {
                        return { ...p, imei: e.target.value };
                      });
                    }}
                    className=" w-[230px] bg-[#F5F5F5] border-b-2 border-[#656565] focus:outline-0 text-black px-2"
                  />
                </div>
                <div className=" flex">
                  <h2>SIM Serial Number</h2>
                  <input
                    value={formData?.simSerialNumber}
                    onChange={(e) => {
                      setFormData((p) => {
                        return { ...p, simSerialNumber: e.target.value };
                      });
                    }}
                    type="text"
                    className=" w-[230px]  bg-[#F5F5F5] border-b-2 border-[#656565] focus:outline-0 text-black px-2"
                  />
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-center space-x-[15%] pt-[40px]">
              <button
                onClick={closeAddDevicePopup}
                className=" w-[225px] h-[69px] text-center styled text-[24px]"
              >
                CANCEL
              </button>
              <button
                onClick={handleSubmitForm}
                className=" w-[225px] h-[69px] text-center styled text-[24px]"
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDevice;

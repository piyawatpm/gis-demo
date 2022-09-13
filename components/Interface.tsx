import Image from "next/image"
import { useState } from "react"
enum Tab {
    overview = "OVERVIEW",
    regienList = "REGIENLIST"
}
type Status = {
    address: string,
    ozoneMate: number,
    online: number,
    offline: number,
    alert: number
}
const Interface = () => {
    const [tab, setTab] = useState<Tab>(Tab.overview)
    const mockData: Status[] = [
        {
            address: " 43 Rue du Calvalre Nanterre, lie-deoverflow overflow",
            ozoneMate: 5,
            online: 6,
            offline: 7,
            alert: 1
        },
        {
            address: " 43 Rue du Calvalre Nanter",
            ozoneMate: 5,
            online: 6,
            offline: 7,
            alert: 0
        },
        {
            address: " 43 Rue du Calvalre Nanterre, lie-deoverflow overflow",
            ozoneMate: 5,
            online: 6,
            offline: 7,
            alert: 0
        },
        {
            address: " 43 Rue du Calvalre Nanterre, lie-deoverflow overflow",
            ozoneMate: 5,
            online: 6,
            offline: 7,
            alert: 4
        },
        {
            address: " 43 Rue du Calvalre Nanterre, lie-deoverflow overflow",
            ozoneMate: 5,
            online: 6,
            offline: 7,
            alert: 1
        },
        {
            address: " 43 Rue du Calvalre Nanterre, lie-deoverflow overflow",
            ozoneMate: 5,
            online: 6,
            offline: 7,
            alert: 0
        },
        {
            address: " 43 Rue du Calvalre Nanterre, lie-deoverflow overflow",
            ozoneMate: 5,
            online: 6,
            offline: 7,
            alert: 0
        },
        {
            address: " 43 Rue du Calvalre Nanterre, lie-deoverflow overflow",
            ozoneMate: 5,
            online: 6,
            offline: 7,
            alert: 0
        },
        {
            address: " 43 Rue du Calvalre Nanterre, lie-deoverflow overflow",
            ozoneMate: 5,
            online: 6,
            offline: 7,
            alert: 1
        },
        {
            address: " 43 Rue du Calvalre Nanterre, lie-deoverflow overflow",
            ozoneMate: 5,
            online: 6,
            offline: 7,
            alert: 7
        },
        {
            address: " 43 Rue du Calvalre Nanterre, lie-deoverflow overflow",
            ozoneMate: 5,
            online: 6,
            offline: 7,
            alert: 0
        },
        {
            address: " 43 Rue du Calvalre Nanterre, lie-deoverflow overflow",
            ozoneMate: 5,
            online: 6,
            offline: 7,
            alert: 0
        },
        {
            address: " 43 Rue du Calvalre Nanterre, lie-deoverflow overflow",
            ozoneMate: 5,
            online: 6,
            offline: 7,
            alert: 1
        },
        {
            address: " 43 Rue du Calvalre Nanterre, lie-deoverflow overflow",
            ozoneMate: 5,
            online: 6,
            offline: 7,
            alert: 5
        },
        {
            address: " 43 Rue du Calvalre Nanterre, lie-deoverflow overflow",
            ozoneMate: 5,
            online: 6,
            offline: 7,
            alert: 0
        },
        {
            address: " 43 Rue du Calvalre Nanterre, lie-deoverflow overflow",
            ozoneMate: 5,
            online: 6,
            offline: 7,
            alert: 0
        },

    ]
    return (
        <div className=" w-[60vh] h-[85vh]   absolute z-10 top-[5%] left-[10%] ">
            <div className=" flex text-center  text-white ">
                <div onClick={() => {
                    setTab(Tab.overview)
                }} className="w-1/2 py-2 bg-gray-400 rounded-tl-md  font-bold cursor-pointer">
                    OVERVIEW
                </div>
                <div onClick={() => {
                    setTab(Tab.regienList)
                }} className="w-1/2 py-2 bg-gray-400 rounded-tr-md  font-bold cursor-pointer">
                    DEVICE LIST
                </div>
            </div>
            <div className=" w-full h-2 bg-gray-400">
                <div className={` ${tab === Tab.regienList && " translate-x-[100%]"} transition relative  duration-500  w-1/2 h-full bg-[#34d3d6] shine `}></div>
            </div>
            {tab === Tab.overview ? <div className=" flex  justify-around  space-y-1 flex-col py-4 px-5 h-full bg-gray-100 rounded-b-md">
                <div className=" flex items-center rounded-[5px] min-h-[16%] shadow-md border-t-[3px] border-l-[3px] bg-gray-100 border-white shadow-gray-300  px-2 py-1">
                    <div className="flex flex-col items-center  translate-x-[-50%] ml-[15%] ">
                        <img src="/images/logo.png" className=" h-9 w-9 " alt="" />
                        <h2>OzoneMate</h2>
                    </div>
                    <div className="flex flex-col">
                        <h2>Total Device</h2>
                        <p className=" text-5xl text-gray-400">202</p>
                    </div>
                </div>
                <div className=" flex items-center rounded-[5px] min-h-[16%] shadow-md border-t-[3px] border-l-[3px] bg-gray-100 border-white shadow-gray-300  px-2 py-1">

                    <div className="flex flex-col items-center  translate-x-[-50%] ml-[15%] w-1/4  ">
                        <img src="/images/logo.png" className=" h-9 w-9 " alt="" />
                        <div className=" relative">
                            <h2>Online</h2>
                            <p className=" text-[30px] text-gray-400 absolute bottom-[-5px] right-[-100%]">140</p>
                        </div>

                    </div>

                    <div className="flex flex-col items-center  translate-x-[-50%] ml-[25%] ">
                        <img src="/images/logo.png" className=" h-9 w-9 " alt="" />
                        <div className=" relative">
                            <h2>Offline</h2>
                            <p className=" text-[30px] text-gray-400 absolute bottom-[-5px] right-[-100%]">30</p>

                        </div>
                    </div>

                </div>
                <div className=" flex items-center rounded-[5px] min-h-[16%] shadow-md border-t-[3px] border-l-[3px] bg-gray-100 border-white shadow-gray-300  px-2 py-1">
                    <div className="flex flex-col items-center  translate-x-[-50%] ml-[15%] w-1/4  ">
                        <img src="/images/logo.png" className=" h-9 w-9 " alt="" />
                        <div className=" relative">
                            <h2>Alert</h2>
                            <p className=" text-[30px] text-gray-400 absolute bottom-[-5px] right-[-120%]">20</p>
                        </div>

                    </div>

                    <div className="flex flex-col items-center  translate-x-[-50%] ml-[25%] ">
                        <img src="/images/logo.png" className=" h-9 w-9 " alt="" />
                        <div className=" relative">
                            <h2>Repairing</h2>
                            <p className=" text-[30px] text-gray-400 absolute bottom-[-5px] right-[-54%]">10</p>

                        </div>
                    </div>

                </div>
                <div className=" flex flex-col rounded-[5px] min-h-[26%] shadow-md border-t-[3px] border-l-[3px] bg-gray-100 border-white shadow-gray-300  px-2 py-1 space-y-3">
                    <div className="flex space-x-3">
                        <div className="flex  items-center  translate-x-[-50%] ml-[15%] ">
                            <img src="/images/logo.png" className=" h-9 w-9 " alt="" />
                        </div>
                        <div className=" flex flex-col">
                            <h2>Lamp Total Hours</h2>
                            <p className=" text-[30px] text-gray-400 ">1423510</p>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <div className="flex  items-center  translate-x-[-50%] ml-[15%] ">
                            <img src="/images/logo.png" className=" h-9 w-9 " alt="" />
                        </div>
                        <div className=" flex flex-col">
                            <h2>Pump Total Hours</h2>
                            <p className=" text-[30px] text-gray-400 ">1423510</p>
                        </div>
                    </div>
                </div>
                <div className=" flex items-center space-x-3 rounded-[5px] min-h-[16%] shadow-md border-t-[3px] border-l-[3px] bg-gray-100 border-white shadow-gray-300  px-2 py-1">
                    <div className="flex flex-col  items-center  translate-x-[-50%] ml-[15%] ">
                        <img src="/images/logo.png" className=" h-9 w-9 " alt="" />
                    </div>
                    <div className="flex flex-col">
                        <h2>Location</h2>
                        <p className=" text-[30px] text-gray-400">50</p>
                    </div>
                </div>
            </div> :
                <div className=" flex  flex-col py-4 px-5 h-full bg-gray-100 rounded-b-md">
                    <div className=" w-full flex border-gray-400 border-b-2 ">
                        <svg className="w-10 h-10 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <input type="text" className="w-full outline-none bg-gray-100 " />
                    </div>
                    <div className=" my-5 overflow-scroll space-y-3">
                        <div className=" space-y-8 flex flex-col items-center rounded-[5px]   ">
                            {mockData.map((data: Status) => {
                                return (
                                    <div className=" flex flex-col items-center rounded-[5px] w-full space-y-3 shadow-md border-t-[3px] border-l-[3px] bg-gray-100 border-white shadow-gray-300  p-3 relative">
                                        {data.alert > 0 && <img src="/images/alert.png" className=" w-6 h-6 absolute top-3 left-0 " alt="" />}
                                        <div className={` ${data.alert > 0 ? " text-white bg-red-600  " : " text-black bg-gray-100 shadow-md border-t-[3px] border-l-[3px]  border-white shadow-gray-300 "}} p-2   w-full rounded-[5px]  text-xl truncate`}>

                                            {data.address}
                                        </div>
                                        <div className=" flex justify-around w-full">
                                            <div className=" flex items-center space-x-1">
                                                <img className=" w-10 h-10" src="/images/logo.png" alt="" />
                                                <h2 className=" text-gray-400">{data.ozoneMate}</h2>
                                            </div>
                                            <div className=" flex items-center space-x-1">
                                                <img className=" w-10 h-10" src="/images/logo.png" alt="" />
                                                <h2 className=" text-gray-400">{data.online}</h2>
                                            </div>
                                            <div className=" flex items-center space-x-1">
                                                <img className=" w-10 h-10" src="/images/logo.png" alt="" />
                                                <h2 className=" text-gray-400">{data.offline}</h2>
                                            </div>
                                            <div className=" flex items-center space-x-1">
                                                <img className=" w-10 h-10" src="/images/logo.png" alt="" />
                                                <h2 className=" text-gray-400">{data.alert}</h2>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>

                    </div>
                </div>
            }

        </div>
    )
}
export default Interface
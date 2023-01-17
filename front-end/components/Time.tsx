import axios from 'axios';
import { useEffect, useState } from 'react';

const Time = () => {
  const art = new Date();
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  const handleCheck = async () => {
    try {
      const res = await axios.post('/api/mock-auth/check');
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });
  function tick() {
    setDateTime(new Date());
  }
  return (
    <div
      onClick={handleCheck}
      className="flex flex-col w-[241px] h-[92px] py-[10px] pl-[25px] pr-5 bg-[#F5F5F5] rounded-[5px]   absolute z-10   top-[5%]  right-[4%] scale-[61%] 2xl:scale-100 "
    >
      <div className=" flex justify-end items-center space-x-[25px]">
        <p className=" text-[20px] font-bold">
          GMT{(dateTime.getTimezoneOffset() / 60) * -1 >= 0 ? '+' : '-'}
          {(dateTime.getTimezoneOffset() / 60) * -1}
        </p>
        <p className=" text-[40px] font-light leading-none">
          {dateTime.getHours() === 0
            ? '00'
            : dateTime.getHours() <= 9
            ? '0' + dateTime.getHours()
            : dateTime.getHours()}
          :
          {dateTime.getMinutes() === 0
            ? '00'
            : dateTime.getMinutes() <= 9
            ? '0' + dateTime.getMinutes()
            : dateTime.getMinutes()}
        </p>
      </div>
      <div className=" text-[20px] font-medium flex justify-end">
        {weekday[dateTime.getDay()]} {dateTime.getDate()}{' '}
        {month[dateTime.getMonth()]} {dateTime.getFullYear()}
      </div>
    </div>
  );
};
export default Time;

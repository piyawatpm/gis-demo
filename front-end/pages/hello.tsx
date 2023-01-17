import { CircularProgressbar } from "react-circular-progressbar";

const Gauge = ({ percentage }) => {
  const calculateDeg = (percentage) => {
    return ((45 - -45) * percentage) / 100 + -45;
  };
  const calculateBottom = (percentage) => {
    return percentage <= 50
      ? ((58 - 30) * percentage) / 50 + 30
      : ((30 - 58) * (percentage - 50)) / 50 + 58;
  };
  const calculateLeft = (percentage) => {
    return ((82 - 18) * percentage) / 100 + 18;
  };
  return (
    <>
      <div className=" w-fit h-fit relative  hello bg-gray-600">
        <div className=" h-[200px] w-[500px]  p-2 overflow-scroll hello">
          <p>hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello</p>
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>

          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>

          <p>hello</p>
          <p>hello</p>
          <p>hello</p>

          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>

          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>

          <p>hello</p>
          <p>hello</p>
          <p>hello</p>

          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>

          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>

          <p>hello</p>
          <p>hello</p>
          <p>hello</p>

          <p>hello</p>
        </div>
        <div
          className={` w-[3.52px] h-[10.56px] rounded-[6px] bg-black absolute bottom-[${calculateBottom(
            percentage
          )}%] rotate-[${calculateDeg(
            percentage
          )}deg] translate-x-[-50%] left-[${
            ((82 - 18) * percentage) / 100 + 18
          }%] `}
        ></div>
        {/* <div
          className={` w-[3.52px] h-[10.56px] rounded-[6px] bg-black absolute bottom-[30%] rotate-[-45deg] translate-x-[-50%] left-[18%] `}
        ></div>
        <div
          className={` w-[3.52px] h-[10.56px] rounded-[6px] bg-black absolute bottom-[58%] rotate-[0deg] translate-x-[-50%] left-[50%] `}
        ></div>
        <div
          className={` w-[3.52px] h-[10.56px] rounded-[6px] bg-black absolute bottom-[30%] rotate-[45deg] translate-x-[-50%] left-[82%] `}
        ></div> */}
        <img src="/images/gauge.png" alt="" />
      </div>
    </>
  );
};
const hello = () => {
  const percentage = 0;
  return (
    <div className=" w-screen h-screen flex items-center justify-center">
      <Gauge percentage={percentage} />
    </div>
  );
};
export default hello;

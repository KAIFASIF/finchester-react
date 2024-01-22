
import React, { useRef, useState } from "react";
import Carousel from "./Carousel";

const slides = [
  "https://i.ibb.co/ncrXc2V/1.png",
  "https://i.ibb.co/B3s7v4h/2.png",
  "https://i.ibb.co/XXR8kzF/3.png",
  "https://i.ibb.co/yg7BSdM/4.png",
];

const AdminDashboard = () => {
  const numbers = Array.from({ length: 10 }, (_, index) => index + 1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);

  const Card = ({ ele }: any) => {
    return (
      <div
        key={ele}
        className="w-64 h-64 bg-red-400 flex justify-center items-center text-xl font-semibold text-white"
      >
        {ele}
      </div>
    );
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsMouseDown(true);
    setStartX(event.clientX);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setStartX(null);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isMouseDown && startX !== null && containerRef.current) {
      const deltaX = startX - event.clientX;
      containerRef.current.scrollLeft += deltaX;
      setStartX(event.clientX);
    }
  };

  return (
    <div className="p-20 bg-yellow-400 ">
      <div
        className="flex overflow-x-scroll py-10 pl-10 bg-blue-400 no-scrollbar"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex flex-nowrap gap-x-3 bg-green-400">
          {numbers.map((ele) => (
            <Card key={ele} ele={ele} />
          ))}
        </div>
      </div>

      <div className="mt-4 flex ">
        <button
          className="bg-red-400 text-white rounded px-4 py-2 mx-4"
          onClick={() =>
            containerRef.current?.scrollBy({ left: -200, behavior: "smooth" })
          }
        >
          Previous
        </button>
        <button
          className="bg-red-400 text-white rounded px-4 py-2 mx-4"
          onClick={() =>
            containerRef.current?.scrollBy({ left: 200, behavior: "smooth" })
          }
        >
          Next
        </button>
      </div>

      <div className=" flex bg-white justify-center items-center p-10">
        <div className=" w-[40%] h-96  flex bg-red-400">
          <Carousel autoSlide={false} autoSlideInterval={2000}>
            {slides.map((ele: string, i) => (
              <img src={ele} alt="" className="" />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

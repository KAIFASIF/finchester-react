import React from "react";

const TicketBooking = () => {
  const seatsArray = Array.from({ length: 40 }, (_, index) => index + 1);
  return (
    <div className=" bg-yellow-400 h-screen flex justify-center items-center">
      <div className="w-[50%] flex-wrap gap-x-3 gap-y-3 bg-white p-10 flex justify-center items-center ">
        {seatsArray.map((ele) => (
          <div className="bg-gray-400 w-12 h-12 rounded"></div>
        ))}
      </div>
    </div>
  );
};

export default TicketBooking;

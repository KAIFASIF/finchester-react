import { Avatar } from "@mui/material";
import React from "react";

interface StatusCardprops {
  statusKey: string;
  value: number;
}
const StatusCard: React.FC<StatusCardprops> = ({ statusKey, value }) => {
  return (
    <div>
      <div className="shadow-lg pl-2 rounded bg-white h-28 mr-2  items-center overflow-hidden w-full hidden lg:flex">
        <div className="w-1/5">
          <Avatar>{statusKey.substring(0, 1).toUpperCase()}</Avatar>
        </div>
        <div className="w-4/5  flex ml-2 overflow-hidden">
          <h1 className=" lg:text-xl  ">{value}</h1>
          <h1 className=" lg:text-xl font-regular ml-3">{statusKey}</h1>
        </div>
      </div>
      <div className="lg:hidden flex">
        <div className="w-1/5">
          <Avatar>B</Avatar>
        </div>
        <div className="w-4/5  flex   mt-1 overflow-hidden">
          <h1 className="text-2xl  ">{value}</h1>
          <h1 className="text-2xl font-regular ml-3">{statusKey}</h1>
        </div>
      </div>
    </div>
  );
};

export default React.memo(StatusCard);

import { CircularProgress } from "@mui/material";
import React from "react";

interface layoutProps {
  loader: Boolean;
  children: any;
}

const Layout: React.FC<layoutProps> = ({ loader, children }) => {
  return (
    <div>
      {loader && (
        <div className="absolute top-0 left-0  w-full h-full opacity-50  flex justify-center items-center z-40 bg-black">
          <CircularProgress />
        </div>
      )}
      {children}
    </div>
  );
};

export default React.memo(Layout);

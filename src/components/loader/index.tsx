import React from "react";
import { CircularProgress } from "@mui/material";

type loaderProps = {
  loader: boolean;
};
const Loader = ({ loader, ...rest }: loaderProps) => {
  return loader ? (
    <div
      className="fixed inset-0 z-40 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
    >
      <CircularProgress />
    </div>
  ) : null;
};

export default React.memo(Loader);

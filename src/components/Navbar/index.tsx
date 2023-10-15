import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { authAtom } from "../../recoil/authAtom";
import { Avatar } from "@mui/material";
import Layout from "../Layout";

const Navbar = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const [loader, setLoader] = useState<boolean>(false);
  const logout = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setAuth("");
    }, 1000);
  };

  return (
    <Layout loader={loader}>
      <nav>
        <div className="flex justify-between mt-4 border-b-2 ">
          <div>
            <h1 className=" text-4xl font-semibold">{auth?.partnerName}</h1>
          </div>
          <div className=" hidden lg:flex">
            <h1 className="mr-4 mt-1 text-2xl text-green-600 ">
              {auth?.user?.fullname}
            </h1>
            <Avatar>
              {auth?.user?.fullname.substring(0, 1).toUpperCase()}
            </Avatar>
            <button className="mx-5" onClick={logout}>
              Logout
            </button>
          </div>
          <div className=" mt-2 lg:hidden sm:flex">
            <button className="mx-5" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </Layout>
  );
};

export default React.memo(Navbar);

import React, {useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import RHFTextField from "../../libraries/form/RHFTextField";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../../recoil/authAtom";
import Toast from "../../components/snackbar";
import Layout from "../../components/Layout";
import Button from "../../components/button";


const Signin = () => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authAtom);
  const methods = useForm();
  const [loader, setLoader] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const handleToast = () => setOpen(false);

  const onSubmit = async (data: any) => {
    // navigate("/"); 
    // try {
    //   setLoader(true);
    //   const res = await axios.post("https://finchester.up.railway.app/signin", data);
    //   if (res?.status === 200) {
    //     localStorage.setItem("token", JSON.stringify(res?.data?.token));   
    //     setAuth({
    //       user: res?.data?.user,
    //       partnerId: res?.data?.partnerId,
    //       role: res?.data?.role,
    //       partnerName: res?.data?.partnerName,
    //     });    
    //       navigate("/");        
    //     }
    //     setLoader(false);
     
    // } catch (error: any) {
    //   setLoader(false);
    //   if (error?.response?.status === 404 || 406) {
    //     setMessage(error?.response?.data?.message);
    //     setSeverity("error");
    //     setOpen(true);
    //   }
    // }
    try {
      setLoader(true);
      const res = await axios.post("http://localhost:9090/signin", data);
      if (res?.status === 200) {
        localStorage.setItem("token", JSON.stringify(res?.data?.token));   
        setAuth({
          isLoggedin : true,
          user: res?.data?.user,
          partnerId: res?.data?.partnerId,
          // role: res?.data?.role,
          role: "ROLE_ADMIN",
          partnerName: res?.data?.partnerName,
        });    
          navigate("/s");        
        }
        setLoader(false);
     
    } catch (error: any) {
      setLoader(false);
      if (error?.response?.status === 404 || 406) {
        setMessage(error?.response?.data?.message);
        setSeverity("error");
        setOpen(true);
      }
    }
  };


 

  return (
    <Layout loader={loader}>
      <Toast
        message={message}
        open={open}
        severity={severity}
        handleClose={handleToast}
      />

      <FormProvider {...methods}>      

        <div className="flex justify-center items-start h-screen bg-gray-100  p-10 sm:p-32 lg:p-2">
          <div className="w-full p-7 rounded-lg shadow-lg space-y-5 sm:p-10  lg:w-1/4  lg:mt-40  bg-white gap-4">
            <RHFTextField name="username" label="Mobile" required />
            <RHFTextField
              name="password"
              label="Password"
              required
              type="password"
            />

            <div className="flex justify-center">
              <Button
                label="Submit"
                onClick={methods.handleSubmit(onSubmit)}
                className="btn btn-primary "
              />
            </div>
            <div className="flex justify-center flex-col align-middle">
             <h1>Sample login details:</h1>
             <h2 className="text-green-600">mobile: 9700174021,  Password: asif  comapany: Airblack</h2>
             <h2 className="text-red-600">mobile: 9700174022,  Password: kaif comapany: VahVah</h2>
            </div>
          </div>
        </div>
      </FormProvider>
    </Layout>
  );
};

export default React.memo(Signin);

import React, { useEffect, useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import RHFTextField from "../../libraries/form/RHFTextField";
import { mobileRegx } from "../../utilities/regex";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Modal, { modalMethods } from "../../components/modal";
import { FaUserCircle } from "react-icons/fa";
import { fetchProfileDetailsByMobile } from "../../service/loanApplicationApi";

interface mobileModalProps {
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
  setProfileDetails: React.Dispatch<React.SetStateAction<any>>;
  setBankDetail: React.Dispatch<React.SetStateAction<any>>;
  setLoanDetail: React.Dispatch<React.SetStateAction<any>>;
  setLoanStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileModal: React.FC<mobileModalProps> = ({
  setSearchVal,
  setProfileDetails,
  setBankDetail,
  setLoanDetail,
  setLoanStatus,
}) => {
  const methods = useForm();
  const navigate = useNavigate();
  const childRef = useRef<modalMethods>(null);

  const { setError, clearErrors, setValue } = methods;

  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if (childRef.current) {
      childRef.current.openModal();
    }
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val && val.length === 10 && val.match(mobileRegx)) {
      clearErrors("mobile");
      checkMobile(parseInt(val));
    }
    if (val && val.length >= 10 && !val.match(mobileRegx)) {
      setError("mobile", { message: "invalid format" });
    }
  };

  const checkMobile = async (mobileNumber: number) => {
    try {
      setLoader(true);
      const { status, data } = await fetchProfileDetailsByMobile(mobileNumber);

      if (status === 200) {
        childRef.current?.closeModal();

        setSearchVal(mobileNumber.toString());
        setLoader(false);
        if (data?.activeLoan?.loanId) {
          navigate(
            `/loan-application/${data?.activeLoan?.loanId}?status=${data?.activeLoan?.status}`
          );
          setProfileDetails(data?.profileDetail);
          setLoanDetail(data?.activeLoan);
          setBankDetail(data?.bankDetail);
        } else {
          setProfileDetails(data?.profileDetail);
          setLoanDetail(data?.activeLoan);
          setBankDetail(data?.bankDetail);
        }
      }
    } catch (error: any) {
      childRef.current?.closeModal();
      if (error?.response?.status === 404) {
        setLoanStatus(false);
        setProfileDetails(null);
        setBankDetail(null);
        setLoanDetail(null);
      }
      setSearchVal(mobileNumber.toString());
      setLoader(false);
    }
  };

  return (
    <Modal ref={childRef} modalSize="sm:w-[20%]">
      <div className="relative">
        <div>
          <div className="flex justify-center">
            <FaUserCircle className="text-7xl text-gray-200 font-light" />
          </div>
          <FormProvider {...methods}>
            <RHFTextField
              name="mobile"
              placeholder="search for mobile...."
              pattern={mobileRegx}
              onChange={handleSearch}
              required
              autoFocus
            />
          </FormProvider>
        </div>
        {loader && (
          <div className="absolute top-0 left-0  w-full h-full opacity-50  flex justify-center items-center">
            <CircularProgress />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default React.memo(MobileModal);

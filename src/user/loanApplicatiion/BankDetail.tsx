import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormFields from "../../libraries/FormFields";
import { ifscRegx } from "../../utilities/regex";
import axios from "axios";
import { postBankDetails } from "../../service/loanApplicationApi";
import Button from "../../components/button";

interface bankDetailProps {
  config: any;
  auth: any;
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
  profileId: number;
  bankDetail: any;
  setBankDetail: React.Dispatch<React.SetStateAction<string | false>>;
  loanStatus: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeverity: React.Dispatch<React.SetStateAction<"error" | "success">>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BankDetail: React.FC<bankDetailProps> = ({
  config,
  auth,
  setExpanded,
  profileId,
  bankDetail,
  setBankDetail,
  loanStatus,
  setLoader,
  setMessage,
  setSeverity,
  setOpen,
}) => {
  const methods = useForm();
  const { getValues, setValue, setError, register, clearErrors } = methods;
  const [filteredBankConfig, setFilteredBankConfig] = useState<any[]>([]);
  const [bankDetailStatus, setBankDetailStatus] =
    useState<Boolean>(false);

  useEffect(() => {
    let accountType = null;
    if (bankDetail !== null) {
      for (let [key, val] of Object.entries(bankDetail)) {
        setValue(key, val);
        if (key === "accountType") {
          accountType = val;
        }
      }
      if (
        bankDetail?.additionalFields !== null &&
        bankDetail?.additionalFields !== undefined &&
        Object.keys(bankDetail?.additionalFields).length > 0
      ) {
        const referenceObj = JSON.parse(bankDetail?.additionalFields);

        const updatedArray =
          config?.bankConfig?.length > 0 &&
          config?.bankConfig
            ?.map((obj: any) => {
              if (referenceObj.hasOwnProperty(obj.name)) {
                return { ...obj, render: true };
              }
            })
            .filter((obj: any) => obj !== undefined);

            if (config?.bankConfig?.length > 0) {
              const mergedArray = [...handleRenderFields(), ...updatedArray];
          
          const uniqueNames = new Set();

          const uniqueFields = mergedArray.reduce((result, obj) => {
            if (!uniqueNames.has(obj.name)) {
              uniqueNames.add(obj.name);
              result.push(obj);
            }
            return result;
          }, []);

          setFilteredBankConfig(uniqueFields);
          for (let [key, val] of Object.entries(
            JSON.parse(bankDetail?.additionalFields)
          )) {
            setValue(key, val);
          }
        }
      }
    } else {
      Object.keys(methods.getValues()).map((ele: any) => {
        setValue(ele, "");
      });
    }
    setValue("accountType", accountType);
  }, [bankDetail]);

  useEffect(() => {
    if (
      getValues("ifscCode") &&
      getValues("ifscCode").length >= 11 &&
      !ifscRegx.test(getValues("ifscCode"))
    ) {
      setError("ifscCode", { message: "invalid format" });
    }
    if (
      getValues("ifscCode") &&
      getValues("ifscCode").length >= 11 &&
      ifscRegx.test(getValues("ifscCode"))
    ) {
      fetchBankDetails(getValues("ifscCode"));
    }
  }, [getValues("ifscCode")]);

  useEffect(() => {
    if (getValues("panNo")) {
      setValue("panNo", getValues("panNo").toUpperCase());
    }
  }, [getValues("panNo")]);

  useEffect(() => {
    if (config?.bankConfig?.length > 0) {
      const newArray = handleRenderFields();
      if (newArray?.length > 0) {
        setFilteredBankConfig(newArray);
      }
    }
  }, [config?.bankConfig]);

  const fetchBankDetails = async (ifsc: string) => {
    try {
      setLoader(true)
      const res = await axios.get(`https://ifsc.razorpay.com/${ifsc}`);
      if (res?.status === 200) {
        for (let [key, value] of Object.entries(res?.data)) {
          key === "BANK"
            ? setValue("bankName", value)
            : setValue(key.toLowerCase(), value);
        }
        clearErrors();
      }
      setLoader(false)
    } catch (error) {setLoader(false)}
  };

  const handleRenderFields = () => {
    if (config?.bankConfig?.length > 0) {
      return config?.bankConfig?.filter((ele: any) => ele?.render);
    }
  };
  const handleDependentFields = (event: any) => {
    const { name, value } = event.target;
    clearErrors(name);
    setValue(name, value);
    if (name && value) {
      const dependentArray =
        config?.bankConfig.length > 0 &&
        config?.bankConfig.filter(
          (ele: any) =>
            ele?.dependentFieldName && ele?.dependentFieldName === name
        );

      dependentArray.length > 0 &&
        dependentArray.map((ele: any) => {
          setValue(ele?.name, null);
        });

      const filteredArray =
        config?.bankConfig.length > 0 &&
        config?.bankConfig
          .filter(
            (ele: any) =>
              ele?.dependentFieldName &&
              ele?.dependentFieldName === name &&
              ele?.dependentFieldValue &&
              ele?.dependentFieldValue.includes(value)
          )
          .map((ele: any) => ({ ...ele, render: true }));

      const fieldsRemoved = filteredBankConfig.filter(
        (ele: any) =>
          dependentArray.length > 0 &&
          dependentArray.some(
            (item: any) => ele?.dependentFieldName !== item?.dependentFieldName
          )
      );
      setFilteredBankConfig((prev) => [...fieldsRemoved, ...filteredArray]);
    }
  };

  const onSubmit = async (data: any) => {
    const {
      id,
      aadhaarNo,
      accountNo,
      accountType,
      ifscCode,
      bankName,
      branch,
      city,
      state,
      panNo,
      ...rest
    } = data;

    let updatedData = {
      id,
      aadhaarNo: parseInt(aadhaarNo),
      accountNo: parseInt(accountNo),
      accountType,
      ifscCode,
      bankName,
      branch,
      city,
      state,
      panNo,
      additionalFields: rest,
    };
    const additionalFields = updatedData?.additionalFields;
    for (let key in additionalFields) {
      if (additionalFields[key] === null) {
        delete additionalFields[key];
      }
    }
    delete rest.additionalFields;
    delete rest["@id"];
    updatedData = {
      ...updatedData,
      additionalFields: JSON.stringify(updatedData?.additionalFields),
    };
    try {
      if (parseInt(accountNo) !== parseInt(data?.confirmAccountNo)) {
        setError("accountNo", { message: "Account number did not match" });
        setError("confirmAccountNo", {
          message: "Account number did not match",
        });
        return;
      }
      setLoader(true);
      const res = await postBankDetails(
        auth?.partnerId,
        auth?.user?.id,
        profileId,
        updatedData
      );

      if (res?.status === 201 || 200) {
        setBankDetail(res?.data);
        if (Object.keys(res?.data)?.length > 0) {
          for (let [key, val] of Object.entries(res?.data)) {
            setValue(key, val);
          }
        }
        setBankDetailStatus(true)
        setExpanded("panel3");
      }

      setLoader(false);
    } catch (error: any) {
      setExpanded("panel2");
      setLoader(false);
      if (error?.response?.status === 400) {
        if (error?.response?.data === "Bank account already exists") {
          setError("accountNo", { message: error?.response?.data });
        }
        if (error?.response?.data === "Aadhaar no already exists") {
          setError("aadhaarNo", { message: error?.response?.data });
        }
        if (error?.response?.data === "Pan no already exists") {
          setError("panNo", { message: error?.response?.data });
        }
      }
      setMessage(error?.response?.data);
      setSeverity("error");
      setOpen(true);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 lg:p-7 gap-4">
        <input {...register("loanId")} hidden />
        <input {...register("id")} hidden />
        {filteredBankConfig.length > 0 &&
          filteredBankConfig.map((ele: any, i: number) => (
            <FormFields
              field={ele}
              key={i}
              disabled={loanStatus || bankDetailStatus ? true : false}
              onChange={ele?.onChange ? handleDependentFields : null}
            />
          ))}
      </div>
      <div className="-ml-10 lg:ml-1">
        <Button
          disabled={loanStatus || bankDetailStatus ? true : false}
          label="Next"
          onClick={methods.handleSubmit(onSubmit)}
          className="btn btn-primary "
        />
      </div>
    </FormProvider>
  );
};

export default React.memo(BankDetail);

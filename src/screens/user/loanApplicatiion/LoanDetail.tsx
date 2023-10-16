import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormFields from "../../../libraries/FormFields";

import { useNavigate } from "react-router-dom";
import { postLoanDetails } from "../../../service/loanApplicationApi";
import Button from "../../../components/button";

interface loanDetailProps {
  config: any;
  auth: any;
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
  profileId: number;
  loanDetail: any;
  setLoanDetail: React.Dispatch<React.SetStateAction<any>>;
  loanStatus: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeverity: React.Dispatch<React.SetStateAction<"error" | "success">>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoanDetails: React.FC<loanDetailProps> = ({
  config,
  auth,
  setExpanded,
  profileId,
  loanDetail,
  setLoanDetail,
  loanStatus,
  setLoader,
  setMessage,
  setSeverity,
  setOpen,
}) => {
  const methods = useForm();
  const { setValue, register, setError, clearErrors } = methods;
  const navigate = useNavigate();
  const [filteredLoanConfig, setFilteredLoanConfig] = useState<any[]>([]);
  useEffect(() => {
    if (config?.loanConfig?.length > 0) {
      const newArray = handleRenderFields();
      if (newArray?.length > 0) {
        setFilteredLoanConfig(newArray);
      }
    }  // eslint-disable-next-line
  }, [config?.loanConfig]);

  useEffect(() => {
    if (loanDetail !== null) {
      for (let [key, val] of Object.entries(loanDetail)) {
        setValue(key, val);
      }
      if (
        loanDetail?.additionalFields !== null &&
        loanDetail?.additionalFields !== undefined &&
        Object.keys(loanDetail?.additionalFields).length > 0
      ) {
        const referenceObj = JSON.parse(loanDetail?.additionalFields);
        const updatedArray =
          config?.loanConfig?.length > 0 &&
          config?.loanConfig
            ?.map((obj: any) => {
              if (referenceObj.hasOwnProperty(obj.name)) {
                return { ...obj, render: true };
              }
            })
            .filter((obj: any) => obj !== undefined);
            
        if (config?.loanConfig?.length > 0) {
          const mergedArray = [...handleRenderFields(), ...updatedArray];
          const uniqueNames = new Set();

          const uniqueFields = mergedArray.reduce((result, obj) => {
            if (!uniqueNames.has(obj.name)) {
              uniqueNames.add(obj.name);
              result.push(obj);
            }
            return result;
          }, []);

          setFilteredLoanConfig(uniqueFields);
          for (let [key, val] of Object.entries(
            JSON.parse(loanDetail?.additionalFields)
          )) {
            setValue(key, val);
          }
        }
      }
    } else {
      Object.keys(methods.getValues()).map((ele: any) => {
        setValue(ele, "");
      });
    } // eslint-disable-next-line
  }, [loanDetail]);

  // useEffect(() => {
  //   if (loanDetail !== null) {
  //     for (let [key, val] of Object.entries(loanDetail)) {
  //       setValue(key, val);
  //     }
  //     if (
  //       loanDetail?.additionalFields !== null &&
  //       loanDetail?.additionalFields !== undefined &&
  //       Object.keys(loanDetail?.additionalFields).length > 0
  //     ) {
  //       const referenceObj = JSON.parse(loanDetail?.additionalFields);

  //       const updatedArray = config?.loanConfig.map((ele: any) =>
  //         Object.keys(referenceObj).every((property: string) =>
  //           referenceObj.hasOwnProperty(ele.name)
  //         )
  //           ? { ...ele, render: true }
  //           : ele
  //       );
  //       setFilteredLoanConfig(updatedArray);

  //       for (let [key, val] of Object.entries(
  //         JSON.parse(loanDetail?.additionalFields)
  //       )) {
  //         setValue(key, val);
  //       }
  //     }
  //   } else {
  //     Object.keys(methods.getValues()).map((ele: any) => {
  //       setValue(ele, "");
  //     });
  //   }
  // }, [loanDetail]);

  const handleRenderFields = () => {
    if (config?.loanConfig?.length > 0) {
      return config?.loanConfig?.filter((ele: any) => ele?.render);
    }
  };
  const handleDependentFields = (event: any) => {
    const { name, value } = event.target;
    clearErrors(name);
    setValue(name, value);
    if (name && value) {
      const dependentArray =
        config?.loanConfig.length > 0 &&
        config?.loanConfig.filter(
          (ele: any) =>
            ele?.dependentFieldName && ele?.dependentFieldName === name
        );

      dependentArray.length > 0 &&
        dependentArray.map((ele: any) => {
          setValue(ele?.name, null);
        });

      const filteredArray =
        config?.loanConfig.length > 0 &&
        config?.loanConfig
          .filter(
            (ele: any) =>
              ele?.dependentFieldName &&
              ele?.dependentFieldName === name &&
              ele?.dependentFieldValue &&
              ele?.dependentFieldValue.includes(value)
          )
          .map((ele: any) => ({ ...ele, render: true }));

      const fieldsRemoved = filteredLoanConfig.filter(
        (ele: any) =>
          dependentArray.length > 0 &&
          dependentArray.some(
            (item: any) => ele?.dependentFieldName !== item?.dependentFieldName
          )
      );
      setFilteredLoanConfig((prev) => [...fieldsRemoved, ...filteredArray]);
    }
  };

  const onSubmit = async (data: any) => {
    const {
      id,
      loanId,
      reason,
      jobType,
      companyName,
      monthlyIncome,
      loanAmount,
      loanTenure,
      isLoanActive,
      status,
      date,
      ...rest
    } = data;

    let updatedData = {
      id,
      loanId,
      reason,
      jobType,
      companyName,
      monthlyIncome,
      loanAmount: parseInt(loanAmount),
      loanTenure: parseInt(loanTenure),
      isLoanActive: true,
      status: "Submitted",
      date,
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
      setLoader(true);
      const res = await postLoanDetails(
        auth?.partnerId,
        auth?.user?.id,
        profileId,
        updatedData
      );

      if (res?.status === 201 || res?.status === 200) {
        if (Object.keys(res?.data).length > 0) {
          for (let [key, val] of Object.entries(res?.data)) {
            setValue(key, val);
          }
        }
        if (res?.data?.loanId) {
          navigate(
            `/loan-application/${res?.data?.loanId}?status=${res?.data?.status}`
          );
        }
        setMessage("Loan sucessfully submitted");
        setOpen(true);
        setSeverity("success");
        setExpanded("panel3");
        setLoader(false);
      }
    } catch (error: any) {
      setExpanded("panel3");
      setLoader(false);
      if (error?.response?.status === 406) {
        setError("loanAmount", { message: error?.response?.data });
      }
      setMessage(error?.response?.data);
      setSeverity("error");
      setOpen(true);
    }
  };

  return (
    <FormProvider {...methods}>
      <input {...register("loanId")} hidden />
      <input {...register("id")} hidden />
      <input {...register("status")} hidden />
      <input {...register("isLoanActive")} hidden />
      <input {...register("date")} hidden />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 lg:p-7 gap-4">
        {filteredLoanConfig?.length > 0 &&
          filteredLoanConfig.map((ele: any, i: number) => (
            <FormFields
              field={ele}
              key={i}
              disabled={loanStatus}
              onChange={ele?.onChange ? handleDependentFields : null}
            />
          ))}
      </div>

      <div className="-ml-10 lg:ml-1">
        <Button
          label="Submit"
          onClick={methods.handleSubmit(onSubmit)}
          className="btn btn-primary "
          disabled={loanStatus}
        />
      </div>
    </FormProvider>
  );
};

export default LoanDetails;

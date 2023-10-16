import React, { useState } from "react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormFields from "../../../libraries/FormFields";
import { postProfileDetails } from "../../../service/loanApplicationApi";
import Button from "../../../components/button";

interface profileDetailProps {
  config: any;
  auth: any;
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
  searchVal: string;
  profileDetails: any;
  loanStatus: boolean;
  setProfileDetails: any;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeverity: React.Dispatch<React.SetStateAction<"error" | "success">>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ProfileDetail: React.FC<profileDetailProps> = ({
  config,
  auth,
  setExpanded,
  searchVal,
  profileDetails,
  loanStatus,
  setLoader,
  setMessage,
  setSeverity,
  setOpen,
  setProfileDetails,
}) => {
  const methods = useForm();
  const { setValue, register, setError, clearErrors } = methods;
  const [filteredProfileConfig, setFilteredProfileConfig] = useState<any[]>([]);
  const [profileDetailStatus, setProfileDetailStatus] =
    useState<Boolean>(false);

  useEffect(() => {
    if (config?.profileConfig?.length > 0) {
      const newArray = handleRenderFields();
      if (newArray?.length > 0) {
        setFilteredProfileConfig(newArray);
      }
    };// eslint-disable-next-line
  }, [config?.profileConfig]);

  useEffect(() => {
    let gender = null;
    if (profileDetails !== null) {
      for (let [key, val] of Object.entries(profileDetails)) {
        setValue(key, val);
      }
      if (
        profileDetails?.additionalFields !== null &&
        profileDetails?.additionalFields !== undefined &&
        Object.keys(profileDetails?.additionalFields).length > 0
      ) {
        const referenceObj = JSON.parse(profileDetails?.additionalFields);

        const updatedArray =
          config?.profileConfig?.length > 0 &&
          config?.profileConfig
            ?.map((obj: any) => { // eslint-disable-next-line
              if (referenceObj.hasOwnProperty(obj.name)) {
                return { ...obj, render: true };
              }
            })
            .filter((obj: any) => obj !== undefined);
        if (config?.profileConfig?.length > 0) {
          const mergedArray = [...handleRenderFields(), ...updatedArray];
          const uniqueNames = new Set();

          const uniqueFields = mergedArray.reduce((result, obj) => {
            if (!uniqueNames.has(obj.name)) {
              uniqueNames.add(obj.name);
              result.push(obj);
            }
            return result;
          }, []);

          setFilteredProfileConfig(uniqueFields);
          for (let [key, val] of Object.entries(
            JSON.parse(profileDetails?.additionalFields)
          )) {
            setValue(key, val);
            if (key === "gender") {
              gender = val;
            }
          }
        }
      }
    } else {
      Object.keys(methods.getValues()).map((ele: any) => {
        setValue(ele, "");
      });
    }

    setValue("gender", gender); ;// eslint-disable-next-line
  }, [profileDetails]);

  const handleRenderFields = () => {
    return config?.profileConfig?.filter((ele: any) => ele?.render);
  };

  useEffect(() => {
    setValue("mobile", searchVal);
  }, [searchVal]);

  const handleDependentFields = (event: any) => {

    const { name, value } = event.target;
    clearErrors(name);
    setValue(name, value);
    if (name && value) {
      const dependentArray =
        config?.profileConfig.length > 0 &&
        config?.profileConfig.filter(
          (ele: any) =>
            ele?.dependentFieldName && ele?.dependentFieldName === name
        );

      dependentArray.length > 0 &&
        dependentArray.map((ele: any) => { ;// eslint-disable-next-line
          setValue(ele?.name, null);
        });

      const filteredArray =
        config?.profileConfig.length > 0 &&
        config?.profileConfig
          .filter(
            (ele: any) =>
              ele?.dependentFieldName &&
              ele?.dependentFieldName === name &&
              ele?.dependentFieldValue &&
              ele?.dependentFieldValue.includes(value)
          )
          .map((ele: any) => ({ ...ele, render: true }));

      const fieldsRemoved = filteredProfileConfig.filter(
        (ele: any) =>
          dependentArray.length > 0 &&
          dependentArray.some(
            (item: any) => ele?.dependentFieldName !== item?.dependentFieldName
          )
      );
      setFilteredProfileConfig((prev) => [...fieldsRemoved, ...filteredArray]);
    }
  };

  const onSubmit = async (data: any) => {
    const {
      id,
      mobile,
      email,
      fullname,
      residence,
      address,
      city,
      pincode,
      ...rest
    } = data;
    let updatedData = {
      id,
      mobile: parseInt(mobile),
      email,
      fullname,
      residence,
      address,
      city,
      pincode: parseInt(pincode),
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
      const res = await postProfileDetails(
        auth?.partnerId,
        auth?.user?.id,
        updatedData
      );

      if (res?.status === 201 || res?.status === 200) {
        if (Object.keys(res?.data).length > 0) {
          for (let [key, val] of Object.entries(res?.data)) {
            setValue(key, val);
          }
        }
        setProfileDetails(res?.data);
        setProfileDetailStatus(true);
        setExpanded("panel2");
        setLoader(false);
      }
    } catch (error: any) {
      setExpanded("panel1");
      setLoader(false);
      if (
        error?.response?.status === 400 &&
        error?.response?.data === "Mobile number already exists"
      ) {
        setError("mobile", { message: error?.response?.data });
      }
      if (
        error?.response?.status === 400 &&
        error?.response?.data === "Email already exists"
      ) {
        setError("email", { message: error?.response?.data });
      }
      setMessage(error?.response?.data);
      setSeverity("error");
      setOpen(true);
    }
  };
  return (
    <FormProvider {...methods}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 lg:p-7 gap-4">
        <input {...register("id")} hidden />
       
        {filteredProfileConfig.length > 0 &&
          filteredProfileConfig.map((ele: any, i: number) => (
            <FormFields
              field={ele}
              key={i}
              disabled={loanStatus || profileDetailStatus ? true : false}
              onChange={ele?.onChange ? handleDependentFields : null}
            />
          ))}
      </div>
      <div className="-ml-10 lg:ml-1">
        <Button
          disabled={loanStatus || profileDetailStatus ? true : false}
          label="Next"
          onClick={methods.handleSubmit(onSubmit)}
          className="btn btn-primary "
        />
      </div>
    </FormProvider>
  );
};

export default React.memo(ProfileDetail);

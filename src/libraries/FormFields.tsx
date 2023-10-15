import React from "react";
import RHFCheckedField from "./form/RHFCheckedField";
import RHFRadioField from "./form/RHFRadioField";
import RHFSelectField from "./form/RHFSelectField";
import RHFTextField from "./form/RHFTextField";

const FormFields = ({ field, disabled, fieldChanged, onChange }: any) => {
  switch (field?.type) {
    case "text":
      return (
        <RHFTextField
          label={field?.label}
          name={field?.name}
          required={field?.rules?.required}
          pattern={eval(field?.rules?.pattern)}
          disabled={disabled}
          defaultValue={field?.defaultValue}
          onChange={onChange}
        />
      );
      break;

    case "select":
      return (
        <RHFSelectField
          label={field?.label}
          onChange={onChange}
          required={field?.rules?.required}
          name={field?.name}
          options={field?.options}
          disabled={disabled}
          defaultValue={field?.defaultValue}
          multiple={field?.multiple}
        />
      );
      break;
    case "radio":
      return (
        <RHFRadioField
          label={field?.label}
          onChange={onChange}
          required={field?.rules?.required}
          name={field?.name}
          options={field?.options}
          defaultValue={field?.defaultValue}
          errorMessage={field?.errorMessage}
          disabled={disabled}
        />
      );
      break;
    case "check":
      return (
        <RHFCheckedField
          label={field?.label}
          name={field?.name}
          defaultChecked={field.defaultChecked}
          required={field?.rules?.required}
          onChange={onChange}
          disabled={disabled}
          checked={field?.checked}
        />
      );
      break;

    default:
      return <h1>Error renderign the Field</h1>;
  }
};

export default React.memo(FormFields);

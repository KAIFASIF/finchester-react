import React, { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FormControlLabel, FormHelperText, Checkbox } from "@mui/material";
import { green, grey } from "@mui/material/colors";

type RHFCheckedFieldProps = {
  label: string;
  name: string;
  defaultChecked?: boolean;
  required?: boolean;
  onChange?: any;
  disabled?: boolean;
  onClick?: any;
  defaultValue?: boolean;
  checked?: boolean;
};

const RHFCheckedField: React.FC<RHFCheckedFieldProps> = ({
  label,
  name,
  defaultChecked,
  required,
  onChange,
  disabled,
  onClick,
  defaultValue,
  checked,
}) => {
  const { control, unregister, formState, setValue, clearErrors } =
    useFormContext();
  const { errors } = formState;

  useEffect(() => {
    return () => {
      unregister(name);
    };
  }, []);

  const handleChange = (e: any) => {
    setValue(name, e.target.checked);
    clearErrors(name);
  };

  return (
    <div className="">
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        rules={{
          required: required && "Please select an option",
        }}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onClick={onClick}
                defaultChecked={defaultChecked}
                disabled={disabled}
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 25,
                  },

                  "&.Mui-checked": {
                    color: disabled ? grey[400] : green[400],
                  },
                }}
              />
            }
            label={label}
            onChange={onChange ?? handleChange}
          />
        )}
      />

      {errors[name] && (
        <FormHelperText style={{ color: "red" }}>
          {errors[name]?.message?.toString()}
        </FormHelperText>
      )}
    </div>
  );
};

export default RHFCheckedField;

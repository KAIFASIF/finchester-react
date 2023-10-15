import React, { useEffect } from "react";
import { Select, MenuItem, Typography, FormHelperText } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

interface config {
  [key: string]: {
    type: string;
    message: string;
  };
}

interface Errors {
  [key: string]: config[] | undefined;
}

interface RHFSelectFieldProps {
  label?: string;
  name: string;
  options: { id: number; label: string; value: string | number | boolean }[];
  defaultValue: string | string[] | [];
  required?: boolean;
  errorMessage?: string;
  size?: "small" | "medium" | undefined;
  fullWidth?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  variant?: "filled" | "outlined" | "standard";
  className?: string;
  onChange?: any;
  style?: any;
  configName?: string;
  index?: number;
}
const RHFSelectField: React.FC<RHFSelectFieldProps> = ({
  label,
  name,
  defaultValue,
  required,
  errorMessage,
  size,
  fullWidth,
  multiple,
  disabled,
  variant,
  className,
  options,
  onChange,
  style,
  configName,
  index,
}) => {
  const { control, unregister, formState, setValue, clearErrors } =
    useFormContext();
  const { errors } = formState;
  const labelName = name.split(".")[1];
  useEffect(() => {
    return () => {
      unregister(name);
    };
  }, []);

  const handleChange = (e: any) => {
    clearErrors(e.target.name);
    setValue(e.target.name, e.target.value);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required:
          required && (errorMessage ? errorMessage : "Please select an option"),
      }}
      render={({ field }) => (
        <div className="">
          <Typography className="flex justify-start">{label}</Typography>
          <Select
            {...field}
            size={size ?? "small"}
            fullWidth={fullWidth ?? true}
            multiple={multiple ?? false}
            disabled={disabled ?? false}
            variant={variant ?? "outlined"}
            className={className ?? "mt-4"}
            margin="dense"
            error={
              Boolean(errors[name]) ||
              (errors[configName as keyof Errors] &&
                Array.isArray(errors[configName as keyof Errors]) &&
                (errors[configName as keyof Errors]?.[
                  index as keyof typeof configName
                ]?.[labelName]
                  ? true
                  : false))
            }
            onChange={onChange ? onChange : handleChange}
            style={style}
          >
            {options.map((option: any) => (
              <MenuItem key={option?.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {errors[name] && (
            <FormHelperText style={{ color: "red" }}>
              {errors[name]?.message?.toString()}
            </FormHelperText>
          )}

          {errors[configName as keyof Errors] &&
            Array.isArray(errors[configName as keyof Errors]) && (
              <FormHelperText style={{ color: "red" }}>
                {errors[configName as keyof Errors]?.[
                  index as keyof typeof configName
                ]?.[labelName]
                  ? "This field is required"
                  : null}
              </FormHelperText>
            )}
        </div>
      )}
    />
  );
};

export default RHFSelectField;

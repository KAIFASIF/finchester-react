import React, { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";

import { green, grey } from "@mui/material/colors";

type RHFRadioFieldProps = {
  label?: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  errorMessage?: string;
  options: { id: number; label: string; value: string }[];
  onChange?: any;
  disabled?: boolean;
  labelRow?: boolean;
  row?: boolean;
};

const RHFRadioField: React.FC<RHFRadioFieldProps> = ({
  label,
  name,
  defaultValue,
  required,
  errorMessage,
  options,
  onChange,
  disabled,
  labelRow,
  row
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
    setValue(e.target.name, e.target.value);
    clearErrors(e.target.name);
  };

  return (
    <div className={`${labelRow ? "flex mr-4":"flex-col"} `}>
      <label className="flex justify-start text-lg">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required:
            required &&
            (errorMessage ? errorMessage : "Please select an option"),
        }}
        render={({ field }) => (
          <RadioGroup {...field} row={row} className={`${labelRow ? "ml-4":"ml-0"}`}>
            {options.map((ele: any) => (
              <FormControlLabel
                key={ele?.id}
                value={ele?.value}
                control={
                  <Radio 
                    disabled={disabled}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 15,
                      },
                      "&.Mui-checked": {
                        color: !disabled ? green[400] : grey[400],
                      },
                    }}
                  />
                }
                label={ele?.label}
                onChange={onChange ? onChange : handleChange}
              />
            ))}
          </RadioGroup>
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

export default RHFRadioField;

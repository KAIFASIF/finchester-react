import { FormHelperText, TextField, Typography } from "@mui/material";
import { useEffect} from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";

interface config {
  [key: string]: {
    type: string;
    message: string;
  };
}

interface Errors {
  [key: string]: config[] | undefined;
}

interface TextFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  pattern?: any;
  autoFocus?: boolean;
  size?: "small" | "medium";
  type?: "text" | "password" | "date";
  fullWidth?: boolean;
  defaultValue?: string | number;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  variant?: "outlined" | "standard" | "filled";
  InputProps?: any;
  inputProps?: any;
  className?: any;
  placeholder?: string;
  InputLabelProps?: any;
  shrinkLabel?: string;
  style?: any;
  sx?: any;
  hidden?: boolean;
  value?: any;
  configName?: string;
  index?: number;
  onkeyup?: any;
}

const RHFTextField: React.FC<TextFieldProps> = ({
  name,
  label,
  pattern,
  required,
  autoFocus,
  size,
  type,
  fullWidth,
  disabled,
  onClick,
  onKeyPress,
  onChange,
  helperText,
  variant,
  InputProps,
  inputProps,
  className,
  placeholder,
  InputLabelProps,
  shrinkLabel,
  style,
  sx,
  hidden,
  value,
  configName,
  index,
  onkeyup
}) => {
  const {
    unregister,
    clearErrors,
    register,
    setValue,

    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    return () => {
      unregister(name);
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    onClick && onClick(event);
  };
  const rules: RegisterOptions = {
    required: {
      value: required ?? false,
      message: "This field is required",
    },
  };
  // };
  /**
   * Handles the on change call,
   * If there is any onchange requested by used the this function will take care of it.
   * It also takes care of clearing the error on value change (As user starts typing).
   */
  const handleChange = (event: any) => {
    setValue(event.target.name, event?.target?.value);
    clearErrors(event.target.name);
  };


  const labelName = name.split(".")[1];

  // useEffect(() => {
  //   hadleError();
  // }, [errors]);

  // const hadleError = () => {
  //   console.log(errors);
  //   if (Object.keys(errors).length > 0) {
  //     const errorArray = errors[configName as keyof Errors];
  //     if (Array.isArray(errorArray)) {
  //       const labelName = name.split(".")[1];
  //       if (typeof index !== "undefined" && errorArray.length > index) {
  //         setErrorMsg(errorArray[index]?.[labelName]?.message);
  //         console.log("errorsddddd: ", errorArray[index]?.[labelName]?.message);
  //       }
  //     }
  //   }
  // };


  if (pattern) {
    rules["pattern"] = {
      value: new RegExp(pattern),
      message: "Invalid format",
    };
  }

  return (
    <div>
      <Typography className="flex">{label}</Typography>
      <TextField
        required={required}
        size={size ?? "small"}
        type={type ?? "text"}
        fullWidth={fullWidth ?? true}
        autoFocus={autoFocus ?? false}
        {...register(name, rules)}
        onChange={onChange ?? handleChange}
        onClick={handleClick}
        disabled={disabled}
        margin="normal"
        onKeyPress={onKeyPress}
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
        helperText={Boolean(errors[name]) ? helperText : ""}
        variant={variant ?? "outlined"}
        InputLabelProps={InputLabelProps}
        InputProps={InputProps}
        inputProps={inputProps}
        className={className}
        placeholder={placeholder ?? ""}
        label={shrinkLabel}
        style={style}
        sx={sx}
        hidden={hidden}
        value={value}
        onKeyUp={onkeyup}
      />

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
              ? "This field is required with correct format"
              : null}
          </FormHelperText>
        )}
    </div>
  );
};

export default RHFTextField;

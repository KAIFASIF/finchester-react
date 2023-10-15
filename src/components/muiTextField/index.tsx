import React from "react";
import { Typography, TextField } from "@mui/material";

interface muiTextFieldProps {
  label?: string;
  size?: "small" | "medium";
  variant?: "outlined" | "standard" | "filled";
  value?: string | number |null;
  defaultValue?: string | number;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onKeyPress?: (Event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputProps?: any;
  InputProps?: any;
  fullWidth?: boolean;
}

const MuiTextField = ({
  label,
  size,
  variant,
  value,
  defaultValue,
  error,
  helperText,
  required,
  disabled,
  className,
  onChange,
  onClick,
  onKeyPress,
  autoFocus,
  placeholder,
  inputProps,
  InputProps,
  fullWidth,
  ...props
}: muiTextFieldProps) => {
  return (
    <>
      {label && (
        <div className="flex pb-4 self-start ">
          <Typography>{label}</Typography>
        </div>
      )}

      <TextField
        size={size ?? "small"}
        autoFocus={autoFocus ?? false}
        fullWidth={fullWidth ?? true}
        variant={variant ?? "outlined"}
        value={value ? value :""}
        defaultValue={defaultValue}
        error={error}
        helperText={helperText}
        required={required}
        disabled={disabled}
        inputProps={inputProps}
        InputProps={InputProps}
        className={className ?? "mb-4"}
        onChange={onChange}
        onClick={onClick}
        onKeyPress={onKeyPress}
        placeholder="search"
      />
    </>
  );
};

export default React.memo(MuiTextField);

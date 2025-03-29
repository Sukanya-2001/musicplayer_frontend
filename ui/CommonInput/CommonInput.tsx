import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { StandardTextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/system";
import React, { forwardRef } from "react";

const InputWrap = styled(TextField)(({ theme }) => ({
  ".MuiInputBase-root": {
    backgroundColor: "black !important", // Keep the input background black
    borderRadius: "10px",
    border: "1px solid white",
    padding: "1px 16px",
    color: "white",
    minWidth: "100px",
    "&:hover, &:focus, &:focus-within": {
      backgroundColor: "black !important",
    },
  },

  ".MuiInputBase-input": {
    color: "white !important", // Keep text color white
    backgroundColor: "black !important", // Prevent selection background change
    "-webkit-text-fill-color": "white !important", // Fix autofill background issue
  },

  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "white !important", // Keep the border white
  },

  // Fix dropdown option background
  ".MuiAutocomplete-popper, .MuiAutocomplete-listbox, .MuiAutocomplete-option": {
    backgroundColor: "black !important",
    color: "white !important",
  },

  "input, textarea": {
    border: 0,
    paddingLeft: 0,
    color: "white",
    backgroundColor: "transparent !important", // Ensure no override
    "&::placeholder": {
      color: "rgba(255, 255, 255, 0.6)",
      opacity: 1,
    },
    "&:focus": {
      backgroundColor: "transparent !important",
    },
  },

  // Ensure autocomplete dropdown does not change background color
  ".MuiAutocomplete-inputRoot": {
    backgroundColor: "black !important",
  },

  // Fix autofill background color
  "input:-webkit-autofill": {
    backgroundColor: "black !important",
    "-webkit-box-shadow": "0 0 0px 1000px black inset !important",
    "-webkit-text-fill-color": "white !important",
  },

  button: {
    backgroundColor: "transparent",
    padding: 0,
    "&:focus, &:hover": {
      backgroundColor: "transparent",
    },
  },
}));


type InputFieldCommonProps = StandardTextFieldProps & {
  isPassword?: boolean;
  adorMentIcon?: JSX.Element;
};

const InputFieldCommon = forwardRef<HTMLInputElement, InputFieldCommonProps>(
  ({ isPassword = false, adorMentIcon, ...others }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };

    return (
      <InputWrap
        fullWidth
        variant="outlined"
        {...others}
        type={isPassword ? (showPassword ? "text" : "password") : others?.type}
        InputProps={{
          inputRef: ref,
          endAdornment: isPassword ? (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                disableRipple
              >
                {showPassword ? <VisibilityIcon style={{ color: "rgb(255 14 188)" }} /> : <VisibilityOffIcon style={{ color: "rgb(255 14 188)" }}/>}
              </IconButton>
            </InputAdornment>
          ) : (
            <InputAdornment position="end">
              <IconButton disableRipple style={{ color: "rgb(255 14 188)" }}>{adorMentIcon}</IconButton>
            </InputAdornment>
          )
        }}
      />
    );
  }
);

export default InputFieldCommon;

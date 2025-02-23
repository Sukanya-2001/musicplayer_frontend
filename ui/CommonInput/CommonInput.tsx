import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { StandardTextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/system";
import React, { forwardRef } from "react";

const InputWrap = styled(TextField)(({ theme }) => ({
  ".MuiInputBase-adornedEnd": {
    height: "auto",
    boxSizing: "border-box",
    fontSize: "16px",
    fontWeight: 400,
    color: "white", // White text
    backgroundColor: "black", // Black background
    borderRadius: "10px",
    border: "1px solid white", // White border
    padding: "6.5px 16px",
    boxShadow: "0px 1px 3px 0px rgba(255, 255, 255, 0.06)",
    minWidth: "300px",
    "@media (max-width: 600px)": {
      padding: "5px 10px"
    },

    "input, textarea": {
      border: 0,
      paddingLeft: 0,
      color: "white", // Ensuring input text is white
      backgroundColor: "transparent",
      "&::placeholder": {
        color: "rgba(255, 255, 255, 0.6)", // Placeholder in dim white
        opacity: 1
      },
      "&:focus": {
        border: 0,
        background: "transparent"
      }
    },

    textarea: {
      height: "125px !important",
      padding: "20px 10px 20px 51px",
      "@media (max-width: 600px)": {
        padding: "20px 10px 20px 30px"
      }
    },

    "&.Mui-error": {
      "input, textarea": {
        color: "white"
      }
    },

    ".MuiOutlinedInput-notchedOutline": {
      border: "1px solid white" // White border on focus
    },

    "#outlined-adornment-password": {
      border: 0,
      padding: 0,
      height: "39px",
      fontSize: "16px"
    },

    button: {
      backgroundColor: "transparent",
      padding: 0,
      "&:focus, &:hover": {
        backgroundColor: "transparent"
      },
      InputAdornment: {
        fontSize: "20px",
        color: "white" // Icon color white for visibility
      }
    }
  }
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
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ) : (
            <InputAdornment position="end">
              <IconButton disableRipple>{adorMentIcon}</IconButton>
            </InputAdornment>
          )
        }}
      />
    );
  }
);

export default InputFieldCommon;

import styled from "@emotion/styled";
import { Theme, useTheme } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";

// const CustomButtonWrapper = styled(Button)``;

const CustomButtonWrapper = styled(Button)(({ theme }: { theme: Theme }) => ({
  [theme.breakpoints.up("xs")]: { padding: "6px 15px" },
  [theme.breakpoints.up("sm")]: { padding: "10px 25px" },
  // padding: "10px 25px",
  fontSize: "15px",
  minWidth: "auto",
  [theme.breakpoints.up("xs")]: { marginLeft: "10px" },
  [theme.breakpoints.up("sm")]: { marginLeft: "20px" }
}));

interface CustomButtonprops extends ButtonProps {
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
  buttonType?: "small" | "large";
}

const CustomButtonPrimary = ({
  children,
  className,
  buttonType,
  ...others
}: CustomButtonprops) => {
  const theme = useTheme();

  return (
    <CustomButtonWrapper theme={theme} className={className} {...others}>
      {children}
    </CustomButtonWrapper>
  );
};

export default CustomButtonPrimary;

/* eslint-disable no-undef */
import Seo from "@/components/Seo/Seo";
import useOnlineStatus from "@/hooks/utils/useDetectOnline";
import { Grid2 } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

interface wrapperProps {
  children: React.ReactNode;
}

const Wrapper = (props: wrapperProps) => {
  const { children } = props;

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useOnlineStatus();

  return (
    <>
      <Seo title={"Home page"} canonical="" description="" url="" image="" />
      <Header />

      <Box className="body_content">
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 2, md: 3 }}>
            <Sidebar />
          </Grid2>
          <Grid2 size={{ xs: 10, md: 9 }}>{children}</Grid2>
        </Grid2>
      </Box>

      <Footer />

      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Wrapper;

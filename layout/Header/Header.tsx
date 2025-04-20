/* eslint-disable no-console */

import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import useAlertConfirmation from "@/hooks/utils/useAlertConfirmation";
import { logout } from "@/reduxtoolkit/slices/userSlice";
import { HeaderWrap } from "@/styles/StyledComponents/HeaderWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import toast from "react-hot-toast";

// const CustomButton = dynamic(() => import("@/ui/Buttons/CustomButton"));

const drawerWidth = 240;

export default function Header() {
  const navItems = [
    {
      name: "About",
      route: "javascript:void(0)"
    },
    {
      name: "Contact us",
      route: "/contact-us"
    },
    {
      name: "Premium",
      route: "javascript:void(0)"
    }
  ];

  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { isLoggedIn } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const { confirmAction } = useAlertConfirmation();
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    const { isConfirmed } = await confirmAction({
      title: "Logout",
      text: "Are you sure you want to logout?",
      confirmButtonText: "Yes, Logout"
    });
    if (!isConfirmed) return;
    dispatch(logout());
    toast.success("Logout successfully.");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link href={item?.route} key={item.name}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  //for adding class to header while scroll
  // const [scroll, setScroll] = React.useState(false);

  // const detectScroll = React.useCallback(() => {
  //   setScroll(window.scrollY > 100);
  // }, []);

  // React.useEffect(() => {
  //   window.addEventListener("scroll", detectScroll);
  //   return () => {
  //     window.removeEventListener("scroll", detectScroll);
  //   };
  // }, []);

  return (
    <HeaderWrap sx={{ display: "flex" }} className="main_head">
      <AppBar
        component="nav"
        position="static"
        elevation={0}
        className="headerContainer"
      >
        <Container fixed>
          <Toolbar>
            {/* <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton> */}
            {/* <Link href="/" className="headerLogo">
              <Image src={assest.logo_img} width={250} height={38} alt="Logo" />
            </Link> */}
            <Box>
              <Box sx={{ marginRight: "20px" }}>
                <InputFieldCommon
                  placeholder="Search a song"
                  adorMentIcon={<SearchOutlinedIcon />}
                />
              </Box>
            </Box>
            <Box
              sx={{ display: { xs: "none", lg: "block" } }}
              className="navbar"
            >
              {navItems.map((item) => (
                <Link
                  href={item?.route}
                  key={item?.route}
                  className={router.pathname === item.route ? "active" : ""}
                  style={{ color: "white" }}
                >
                  {/* <CustomButton type="button" variant="text"> */}
                  {item?.name}
                  {/* </CustomButton> */}
                </Link>
              ))}
            </Box>
            {isLoggedIn ? (
              <Box
                // className="hdr_rgt"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <CustomButtonPrimary
                  onClick={handleLogout}
                  type="button"
                  variant="contained"
                  color="primary"
                >
                  <span>Logout</span>
                </CustomButtonPrimary>

                {/* <CustomButtonPrimary
                    type="button"
                    variant="contained"
                    color="primary"
                  >
                    <span>{userData?.email}</span>
                  </CustomButtonPrimary> */}
              </Box>
            ) : (
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <CustomButtonPrimary
                  variant="outlined"
                  color="primary"
                  onClick={() => router.push("/auth/sign-in")}
                >
                  Login
                </CustomButtonPrimary>
                <CustomButtonPrimary
                  variant="contained"
                  color="primary"
                  onClick={() => router.push("/auth/sign-up")}
                >
                  Sign up
                </CustomButtonPrimary>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar />
    </HeaderWrap>
  );
}

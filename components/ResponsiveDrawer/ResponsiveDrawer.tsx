import { useAppSelector } from "@/hooks/redux/useAppSelector";
import assest from "@/json/assest";
import Footer from "@/layout/Footer/Footer";
import Header from "@/layout/Header/Header";
import {
  authenticationItems,
  authItems,
  othersItems,
  sideFirstItems,
  sideSecondItems
} from "@/lib/static/Demo";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import styles from "../../styles/StyledComponents/sidebarStyles.module.css";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children: React.ReactNode;
  noFooter?: boolean;
}

export default function ResponsiveDrawer(props: Props) {
  const theme = createTheme({
    components: {
      MuiListItemText: {
        styleOverrides: {
          primary: {
            color: "white !important"
          }
        }
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: "white !important"
          }
        }
      }
    }
  });

  const { children, noFooter } = props;
  const route = useRouter();
  const { isLoggedIn } = useAppSelector((s) => s?.userSlice);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div style={{ backgroundColor: "#1e1e1e", color: "white", height: "100%" }}>
      <Link
        href="/"
        className="headerLogo"
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          margin: "20px 0 20px 0",
          backgroundColor: "#1e1e1e"
        }}
      >
        <Image src={assest.logo_img} width={80} height={28} alt="Logo" />
      </Link>
      <ThemeProvider theme={theme}>
        <List>
          {sideFirstItems.map((text) => (
            <ListItem key={text?.name} disablePadding>
              <ListItemButton
                onClick={() => route.push(`${text?.route}`)}
                className={
                  route?.pathname === text?.route
                    ? styles.active
                    : styles.navList
                }
              >
                <ListItemIcon>
                  <text.icon />
                </ListItemIcon>
                <ListItemText primary={text?.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </ThemeProvider>
      <Divider sx={{ borderColor: "rgb(90, 87, 89)" }} />
      <ThemeProvider theme={theme}>
        <List>
          {sideSecondItems.map((text) => (
            <ListItem key={text?.name} disablePadding>
              <ListItemButton
                onClick={() => route.push(`${text?.route}`)}
                className={
                  route?.pathname === text?.route
                    ? styles.active
                    : styles.navList
                }
              >
                <ListItemIcon>
                  <text.icon />
                </ListItemIcon>
                <ListItemText primary={text?.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </ThemeProvider>
      <Box sx={{ display: { xs: "block", lg: "none" } }}>
        <Divider sx={{ borderColor: "rgb(90, 87, 89)" }} />
        <ThemeProvider theme={theme}>
          <List>
            {othersItems.map((text) => (
              <ListItem key={text?.name} disablePadding>
                <ListItemButton
                  onClick={() => route.push(`${text?.route}`)}
                  className={
                    route?.pathname === text?.route
                      ? styles.active
                      : styles.navList
                  }
                >
                  <ListItemIcon>
                    <text.icon />
                  </ListItemIcon>
                  <ListItemText primary={text?.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </ThemeProvider>
      </Box>
      {isLoggedIn ? (
        <>
          <Divider sx={{ borderColor: "rgb(90, 87, 89)" }} />
          <ThemeProvider theme={theme}>
            <List>
              {authenticationItems.map((text) => (
                <ListItem key={text?.name} disablePadding>
                  <ListItemButton
                    onClick={() => route.push(`${text?.route}`)}
                    className={
                      route?.pathname === text?.route
                        ? styles.active
                        : styles.navList
                    }
                  >
                    <ListItemIcon>
                      <text.icon />
                    </ListItemIcon>
                    <ListItemText primary={text?.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </ThemeProvider>
        </>
      ) : (
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Divider sx={{ borderColor: "rgb(90, 87, 89)" }} />
          <ThemeProvider theme={theme}>
            <List>
              {authItems.map((text) => (
                <ListItem key={text?.name} disablePadding>
                  <ListItemButton
                    onClick={() => route.push(`${text?.route}`)}
                    className={
                      route?.pathname === text?.route
                        ? styles.active
                        : styles.navList
                    }
                  >
                    <ListItemIcon>
                      <text.icon />
                    </ListItemIcon>
                    <ListItemText primary={text?.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </ThemeProvider>
        </Box>
      )}
    </div>
  );

  return (
    <Box sx={{ display: "flex", backgroundColor: "black" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "black"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ marginLeft: "auto" }}>
            <Header />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#181515"
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#181515"
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Box sx={{ marginTop: "30px", minHeight: "80vh" }}>{children}</Box>
        {!noFooter && <Footer />}
      </Box>
    </Box>
  );
}

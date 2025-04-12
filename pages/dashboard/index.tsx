/* eslint-disable react/no-array-index-key */
import { ChangePassword } from "@/components/Profile/ChangePassword";
import { Profile } from "@/components/Profile/Profile";
import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const HomeWrapper = styled(Box)``;

const Index = () => {
  return (
    <ResponsiveDrawer>
      <Profile />
      <ChangePassword />
    </ResponsiveDrawer>
  );
};

export default Index;

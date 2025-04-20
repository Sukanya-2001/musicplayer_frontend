import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import SupportMain from "@/components/SupportMain/SupportMain";
import { Container } from "@mui/material";

export default function Contact() {
  return (
    <ResponsiveDrawer>
      <Container fixed>
        <SupportMain />
      </Container>
    </ResponsiveDrawer>
  );
}

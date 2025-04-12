import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import animationData from "@/json/lottie/404.json";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import Link from "next/link";

const Lottie = dynamic(() => import("lottie-react"));

const Index = () => (
  <ResponsiveDrawer>
    <Stack direction="row" alignItems="center" justifyContent="center" p={2}>
      <div>
        <h1>Page not found</h1>
        <Lottie
          animationData={animationData}
          loop
          style={{
            height: 300,
            width: 300
          }}
          height={300}
          width={300}
        />
        <Link href="/">Back to home </Link>
      </div>
    </Stack>
  </ResponsiveDrawer>
);

export default Index;

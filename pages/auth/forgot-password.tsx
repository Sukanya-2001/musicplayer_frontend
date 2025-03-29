import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const ForgetPassword = () => {
    const router = useRouter();
    
  return (
    <ResponsiveDrawer noFooter>
    <Box
      sx={{
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 6
      }}
    >
      <Grid container spacing={2} sx={{ maxWidth: "800px"}}>
        {/* Title with Centered Text & Line */}
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h5" color="white" gutterBottom fontSize={25}>
          Locked out?
          </Typography>
          <Typography variant="h5" color="white" gutterBottom fontSize={20}>
          Let’s unlock your world in just a few steps!
          </Typography>
          <Divider
            sx={{ backgroundColor: "white", width: "50%", mx: "auto" }}
          />
        </Grid>

        {/* Email Field */}
        <Grid item xs={12}>
        <label style={{ color: "white" }}>Email</label>
          <InputFieldCommon
            sx={{
              input: { color: "white" },
              fieldset: { borderColor: "white" },
              mt: 2
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body1" color="white" gutterBottom>
            Back to login? <Link href="/auth/sign-in" style={{color:"white"}}>Sign in</Link>
          </Typography>
        </Grid>

        {/* Centered Sign-In Button */}
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center"}}
        >
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            onClick={()=> router.push("/auth/reset-password")}
            sx={{ px: 8 }}
          >
            Continue
          </CustomButtonPrimary>
        </Grid>
      </Grid>
    </Box>
    </ResponsiveDrawer>
  );
};

export default ForgetPassword;

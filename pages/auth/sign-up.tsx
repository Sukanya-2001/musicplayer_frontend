import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Link from "next/link";

const SignUp = () => {
  return (
    <ResponsiveDrawer noFooter>
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2
      }}
    >
      <Grid container spacing={2} sx={{ maxWidth: "800px"}}>
        {/* Title with Centered Text & Line */}
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h5" color="white" gutterBottom fontSize={25}>
            Join the rhythm of our world
          </Typography>
          <Typography variant="h5" color="white" gutterBottom fontSize={20}>
            where music meets the soul
          </Typography>
          <Divider
            sx={{ backgroundColor: "white", width: "50%", mx: "auto" }}
          />
        </Grid>

        {/* First Name & Last Name Fields */}
        <Grid item xs={12} md={6}>
        <label style={{ color: "white" }}>First name</label>
          <InputFieldCommon
            sx={{
              input: { color: "white" },
              fieldset: { borderColor: "white" },
              mt: 2
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <label style={{ color: "white" }}>Last name</label>
          <InputFieldCommon
            sx={{
              input: { color: "white" },
              fieldset: { borderColor: "white" },
              mt: 2
            }}
          />
        </Grid>

        {/* Username Field */}
        <Grid item xs={12} md={6}>
        <label style={{ color: "white" }}>Username</label>
          <InputFieldCommon
            sx={{
              input: { color: "white" },
              fieldset: { borderColor: "white" },
              mt: 2
            }}
          />
        </Grid>

        {/* Phone Number Field */}
        <Grid item xs={12} md={6}>
        <label style={{ color: "white" }}>Phone no</label>
          <InputFieldCommon
            sx={{
              input: { color: "white" },
              fieldset: { borderColor: "white" },
              mt: 2
            }}
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
          <label style={{ color: "white" }}>Password</label>
          <InputFieldCommon
            isPassword
            sx={{
              input: { color: "white" },
              fieldset: { borderColor: "white" },
              mt: 2
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
        <label style={{ color: "white" }}>Confirm Password</label>
          <InputFieldCommon
            isPassword
            sx={{
              input: { color: "white" },
              fieldset: { borderColor: "white" },
              mt: 2
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body1" color="white" gutterBottom>
            Already have an account? <Link href="/auth/sign-in" style={{color:"rgb(255 14 188)"}}>Sign in</Link>
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
            sx={{ px: 8 }}
          >
            Sign Up
          </CustomButtonPrimary>
        </Grid>
      </Grid>
    </Box>
    </ResponsiveDrawer>
  );
};

export default SignUp;

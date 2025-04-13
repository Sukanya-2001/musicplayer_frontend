import { useAuthForgotEmailHook } from "@/api/functions/user.api";
import {
  forgotEmailPayload,
  forgotEmailSchema
} from "@/hooks/Schema/auth.schema";
import assest from "@/json/assest";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const ForgetPassword = () => {
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<forgotEmailPayload>({
    resolver: yupResolver(forgotEmailSchema)
  });

  const { isPending: forgotPending } = useAuthForgotEmailHook();

  const onSubmit = (data: forgotEmailPayload) => {
    console.log(data);
    reset();
    router.push(`/auth/reset-password/${data?.email}`);

    // router.push(`/verification/${data?.email}`);

    // forgotMutate(data)
  };

  return (
    <Box
      sx={{
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        px: 2,
        py: 6
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ maxWidth: "800px" }}>
          {/* Title with Centered Text & Line */}
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Link
              href="/"
              className="headerLogo"
              style={{
                margin: "20px 0 20px 0"
              }}
            >
              <Image
                src={assest.musicGirl}
                width={200}
                height={200}
                alt="Logo"
              />
            </Link>
            <Typography
              variant="h2"
              color="white"
              gutterBottom
              sx={{ fontSize: "25px" }}
            >
              Locked out?
            </Typography>
            <Typography
              variant="h2"
              color="white"
              gutterBottom
              sx={{ fontSize: "20px" }}
            >
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
              {...register("email")}
              error={!!errors?.email}
              helperText={errors?.email?.message}
              sx={{
                input: { color: "white" },
                fieldset: { borderColor: "white" },
                mt: 2
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="body1" color="white" gutterBottom>
              Back to login?{" "}
              <Link href="/auth/sign-in" style={{ color: "rgb(255 14 188)" }}>
                Sign in
              </Link>
            </Typography>
          </Grid>

          {/* Centered Sign-In Button */}
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              type="submit"
              disabled={forgotPending}
              sx={{ px: 8 }}
            >
              {forgotPending ? (
                <CircularProgress size={28} sx={{ color: "white" }} />
              ) : (
                "Continue"
              )}
            </CustomButtonPrimary>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ForgetPassword;

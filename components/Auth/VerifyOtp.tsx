import { useAuthOtpValidateHook } from "@/api/functions/user.api";
import { otpPayload, otpSchema } from "@/hooks/Schema/auth.schema";
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
import { useForm } from "react-hook-form";

type Props = {
  email: string;
  handleResetPassword: () => void;
};

const VerifyOtp = ({ email, handleResetPassword }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<otpPayload>({
    resolver: yupResolver(otpSchema)
  });
  console.log(email);

  const { isPending: otpPending } = useAuthOtpValidateHook();

  const onSubmit = (data: otpPayload) => {
    const payload = {
      email: email,
      otp: data?.otp
    };
    console.log(payload);
    reset();
    handleResetPassword();

    // otpMutate(payload);
  };

  return (
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
              Your email holds the key!
            </Typography>
            <Typography
              variant="h2"
              color="white"
              gutterBottom
              sx={{ fontSize: "20px" }}
            >
              Enter the OTP and let's go
            </Typography>
            <Divider
              sx={{ backgroundColor: "white", width: "50%", mx: "auto" }}
            />
          </Grid>

          {/* Email Field */}
          <Grid item xs={12}>
            <label style={{ color: "white" }}>OTP</label>
            <InputFieldCommon
              {...register("otp")}
              error={!!errors?.otp}
              helperText={errors?.otp?.message}
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
              disabled={otpPending}
              sx={{ px: 8 }}
            >
              {otpPending ? (
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

export default VerifyOtp;

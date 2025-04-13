import { useAuthResetHook } from "@/api/functions/user.api";
import {
  ResetPasswordPayload,
  resetPasswordSchema
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

type Props = {
  email: string;
};

const ResetNewPassword = ({ email }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ResetPasswordPayload>({
    resolver: yupResolver(resetPasswordSchema)
  });

  const { isPending: resetPending } = useAuthResetHook();

  const onSubmit = (data: ResetPasswordPayload) => {
    const payload = {
      email: email,
      password: data?.newPassword
    };
    console.log(payload);
    reset();
    router.push("/auth/sign-in");

    // resetMutate(data)
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
              A small change for a big security upgrade
            </Typography>
            <Typography
              variant="h2"
              color="white"
              gutterBottom
              sx={{ fontSize: "20px" }}
            >
              Set a new password and access your account!
            </Typography>
            <Divider
              sx={{ backgroundColor: "white", width: "50%", mx: "auto" }}
            />
          </Grid>

          {/* Email Field */}
          <Grid item xs={12}>
            <label style={{ color: "white" }}>New Password</label>
            <InputFieldCommon
              {...register("newPassword")}
              error={!!errors?.newPassword}
              helperText={errors?.newPassword?.message}
              isPassword
              sx={{
                input: { color: "white" },
                fieldset: { borderColor: "white" },
                mt: 2
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <label style={{ color: "white" }}>Confirm Password</label>
            <InputFieldCommon
              {...register("confirmPassword")}
              error={!!errors?.confirmPassword}
              helperText={errors?.confirmPassword?.message}
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
              disabled={resetPending}
              sx={{ px: 8 }}
            >
              {resetPending ? (
                <CircularProgress size={28} sx={{ color: "white" }} />
              ) : (
                "Submit"
              )}
            </CustomButtonPrimary>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ResetNewPassword;

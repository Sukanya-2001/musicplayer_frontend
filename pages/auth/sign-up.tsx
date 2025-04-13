import { useAuthSignUpHook } from "@/api/functions/user.api";
import { signUpPayload, signUpSchema } from "@/hooks/Schema/auth.schema";
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

const SignUp = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<signUpPayload>({
    resolver: yupResolver(signUpSchema)
  });

  const { mutateAsync: signUpMutate, isPending: signUpPending } =
    useAuthSignUpHook();

  const onSubmit = (data: signUpPayload) => {
    signUpMutate(data, {
      onSuccess: (res) => {
        if (res?.status === 200) {
          reset();
        }
      }
    });
  };

  return (
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
              Join the rhythm of our world
            </Typography>
            <Typography
              variant="h2"
              color="white"
              gutterBottom
              sx={{ fontSize: "20px" }}
            >
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
              {...register("firstName")}
              error={!!errors?.firstName}
              helperText={errors?.firstName?.message}
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
              {...register("lastName")}
              error={!!errors?.lastName}
              helperText={errors?.lastName?.message}
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
              {...register("userName")}
              error={!!errors?.userName}
              helperText={errors?.userName?.message}
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
              {...register("phone")}
              error={!!errors?.phone}
              helperText={errors?.phone?.message}
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
            <label style={{ color: "white" }}>Password</label>
            <InputFieldCommon
              {...register("password")}
              error={!!errors?.password}
              helperText={errors?.password?.message}
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
              Already have an account?{" "}
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
              disabled={signUpPending}
              sx={{ px: 8 }}
            >
              {signUpPending ? (
                <CircularProgress size={28} sx={{ color: "white" }} />
              ) : (
                "Sign Up"
              )}
            </CustomButtonPrimary>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default SignUp;

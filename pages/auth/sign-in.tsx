import { useGetAllIds } from "@/api/functions/favourite.api";
import { useAuthLoginHook } from "@/api/functions/user.api";
import { loginPayload, loginSchema } from "@/hooks/Schema/auth.schema";
import { getRedirectUrl } from "@/hooks/utils/commonUtils";
import assest from "@/json/assest";
import { setCookieClient } from "@/lib/functions/storage.lib";
import { setLoginData } from "@/reduxtoolkit/slices/userSlice";
import { setWishList } from "@/reduxtoolkit/slices/wishlistSlice";
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
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<loginPayload>({
    resolver: yupResolver(loginSchema)
  });
  const { mutateAsync: favIds } = useGetAllIds();
  const { mutateAsync: loginMutate, isPending: loginPending } =
    useAuthLoginHook();

  const onSubmit = (data: loginPayload) => {
    loginMutate(data, {
      onSuccess: async (res) => {
        if (res?.status === 200) {
          reset({
            email: "",
            password: ""
          });
          const token = res?.refreshToken;
          if (token) {
            const navigatePath = getRedirectUrl(redirect as string);
            dispatch(setLoginData(res?.data?.data));
            setCookieClient(process.env.NEXT_APP_TOKEN_NAME!, token);
            const response = await favIds();
            if (response?.status === 200) {
              dispatch(setWishList(response?.wishListIds));
            }
            router.replace(navigatePath);
          }
        }
        if (res?.status === 400) {
          toast.error("Email does not exist.");
        }
      }
    });
  };

  return (
    <>
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
                Where words fail, music speaks
              </Typography>
              <Typography
                variant="h2"
                color="white"
                gutterBottom
                sx={{ fontSize: "20px" }}
              >
                Sign in to listen!
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

            <Grid item xs={12}>
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
              <Typography variant="body1" color="white" gutterBottom>
                Don't have an account?{" "}
                <Link href="/auth/sign-up" style={{ color: "rgb(255 14 188)" }}>
                  Sign up
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
              <Typography variant="body1" color="white" gutterBottom>
                <Link
                  href="/auth/forgot-password"
                  style={{ color: "rgb(255 14 188)" }}
                >
                  Forgot Password?
                </Link>
              </Typography>
            </Grid>

            {/* Centered Sign-In Button */}
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <CustomButtonPrimary
                variant="contained"
                color="primary"
                type="submit"
                disabled={loginPending}
                sx={{ px: 8 }}
              >
                {loginPending ? (
                  <CircularProgress size={28} sx={{ color: "white" }} />
                ) : (
                  "Sign in"
                )}
              </CustomButtonPrimary>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default SignIn;

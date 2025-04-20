import { useUploadSong } from "@/api/functions/songByUser.api";
import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { addSongPayload, addSongSchema } from "@/hooks/Schema/addSongSchema";
import useAlertConfirmation from "@/hooks/utils/useAlertConfirmation";
import assest from "@/json/assest";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { yupResolver } from "@hookform/resolvers/yup";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, Divider, Grid2, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddSongs = () => {
  const { isLoggedIn } = useAppSelector((s) => s?.userSlice);
  const { confirmAction } = useAlertConfirmation();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors }
  } = useForm<addSongPayload>({
    resolver: yupResolver(addSongSchema)
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setValue("file", e.target.files[0]);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setValue("imageFile", e.target.files[0]);
    }
  };
  const { mutateAsync: uploadSong, isPending: uploadPending } = useUploadSong();
  const onSubmit = async (data: addSongPayload) => {
    console.log(data);
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("audio", data?.file);
    formData.append("image", data?.imageFile);
    const res = await uploadSong(formData);

    if (res?.status === 200) {
      toast.success("Song added successfully");
      reset();
      setFile(null);
      setImageFile(null);
    }
  };

  const handleSignIn = async () => {
    const { isConfirmed } = await confirmAction({
      title: "Sign in required",
      text: "Please sign in to upload song",
      confirmButtonText: "Yes, Signin"
    });
    if (!isConfirmed) return;
    const currentUrl =
      typeof window !== "undefined" ? window.location.href : "";
    router.push(`/auth/sign-in?redirect=${currentUrl}`);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      handleSignIn();
    }
  }, [isLoggedIn]);

  return (
    <ResponsiveDrawer noFooter>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "black",
          backgroundImage: `url(${assest.add_song})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 1
        }}
      >
        <Box
          sx={{
            p: 2,
            maxWidth: 600,
            width: "100%",
            color: "white",
            borderRadius: 2,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(6px)"
          }}
        >
          <Stack spacing={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center"
              }}
            >
              <>
                <Typography
                  variant="h2"
                  color="white"
                  gutterBottom
                  sx={{
                    fontSize: {
                      xs: "18px", // small devices
                      sm: "20px", // tablets
                      md: "25px" // desktops
                    }
                  }}
                >
                  Skip the silence, play your part
                </Typography>
                <Typography
                  variant="h2"
                  color="white"
                  gutterBottom
                  sx={{
                    fontSize: {
                      xs: "15px", // small devices
                      sm: "16px", // tablets
                      md: "20px" // desktops
                    }
                  }}
                >
                  Upload your fire, straight from the heart!
                </Typography>
                <Divider
                  sx={{ backgroundColor: "white", width: "50%", mx: "auto" }}
                />
              </>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Song Title</label>
              <InputFieldCommon
                fullWidth
                {...register("title")}
                error={!!errors?.title}
                helperText={errors?.title?.message}
                sx={{
                  input: { color: "white" },
                  fieldset: { borderColor: "white" },
                  mt: 2
                }}
              />

              <Grid2 container spacing={2} sx={{ paddingY: "20px" }}>
                <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                  >
                    {imageFile ? imageFile.name.slice(0, 10) : "Song Image"}
                    <input
                      type="file"
                      hidden
                      onChange={handleImageFileChange}
                    />
                  </Button>
                  {!!errors?.imageFile && (
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "14px", color: "#EA5455" }}
                    >
                      {errors?.imageFile?.message}
                    </Typography>
                  )}
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                  >
                    {file ? file.name.slice(0, 10) : "Audio File"}
                    <input
                      type="file"
                      accept="audio/*"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                  {!!errors?.file && (
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "14px", color: "#EA5455" }}
                    >
                      {errors?.file?.message}
                    </Typography>
                  )}
                </Grid2>
              </Grid2>

              <CustomButtonPrimary
                type="submit"
                variant="contained"
                disabled={uploadPending}
              >
                Submit
              </CustomButtonPrimary>
            </form>
          </Stack>
        </Box>
      </Box>
    </ResponsiveDrawer>
  );
};

export default AddSongs;

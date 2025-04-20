import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import assest from "@/json/assest";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, Divider, Grid2, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

const AddSongs = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !imageFile) return;
    console.log({ title, file });
  };

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
          component="form"
          onSubmit={handleSubmit}
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
            <label>Song Title</label>
            <InputFieldCommon
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
            />

            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                <Button
                  fullWidth
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  {imageFile ? imageFile.name.slice(0,10) : "Song Image"}
                  <input
                    type="file"
                    hidden
                    onChange={handleImageFileChange}
                  />
                </Button>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                <Button
                  fullWidth
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  {file ? file.name : "Audio File"}
                  <input
                    type="file"
                    accept="audio/*"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid2>
            </Grid2>

            <CustomButtonPrimary type="submit" variant="contained">
              Submit
            </CustomButtonPrimary>
          </Stack>
        </Box>
      </Box>
    </ResponsiveDrawer>
  );
};

export default AddSongs;

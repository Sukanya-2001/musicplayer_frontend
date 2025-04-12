"use client";

import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, Grid, Typography } from "@mui/material";

export const Profile = () => {
  return (
    <Box sx={{ position: "relative" }}>
      {/* Gradient Top Background */}
      <Box
        sx={{
          height: "300px",
          width: "100%",
          background: "linear-gradient(to right, #ff4e50, #f9d423)",
          borderBottomLeftRadius: "50% 20%",
          borderBottomRightRadius: "50% 20%"
        }}
      />

      {/* Profile Card */}
      <Box
        sx={{
          maxWidth: 600,
          width: "90%",
          backgroundColor: "#1e1e1e",
          color: "white",
          borderRadius: 5,
          boxShadow: 3,
          textAlign: "center",
          p: 3,
          mx: "auto",
          mt: "-130px", // Pull the card up into the gradient
          position: "relative"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 24,
            color: "rgb(255 14 188)",
            fontWeight: 600,
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            gap: 0.5
          }}
        >
          <EditIcon /> Edit
        </Box>

        {/* Avatar */}
        <Avatar
          src="https://randomuser.me/api/portraits/women/79.jpg"
          alt="Profile"
          sx={{
            width: 100,
            height: 100,
            position: "absolute",
            top: -50,
            left: "50%",
            transform: "translateX(-50%)",
            border: "4px solid rgb(255 14 188)"
          }}
        />

        {/* Info */}
        <Typography
          variant="h3"
          fontWeight={600}
          mt={4}
          sx={{ fontSize: "25px" }}
        >
          Samantha Jones
        </Typography>
        <Typography variant="body1" mb={1} sx={{ fontSize: "18px" }}>
          Username
        </Typography>
        <Typography variant="body1">Email: email@email.com</Typography>
        <Typography variant="body1" mb={3}>
          Phone no.: 6251403025
        </Typography>

        {/* Stats */}
        <Grid container spacing={2} justifyContent="center" mb={3}>
          <Grid item>
            <Typography fontWeight={600} sx={{ color: "rgb(255 14 188)" }}>
              65
            </Typography>
            <Typography variant="h5">Favourite</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

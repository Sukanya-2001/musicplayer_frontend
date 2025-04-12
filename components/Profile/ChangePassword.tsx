"use client";

import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";

export const ChangePassword = () => {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const toggleVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        width: "90%",
        mx: "auto",
        mt: 4,
        p: 3,
        backgroundColor: "#1e1e1e",
        color: "white",
        borderRadius: 5,
        boxShadow: 3
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={4} sx={{fontSize:"20px"}}>
        Change Password
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          fullWidth
          label="Current Password"
          type={showPasswords.current ? "text" : "password"}
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => toggleVisibility("current")}
                  edge="end"
                >
                  {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <TextField
          fullWidth
          label="New Password"
          type={showPasswords.new ? "text" : "password"}
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => toggleVisibility("new")} edge="end">
                  {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <TextField
          fullWidth
          label="Confirm New Password"
          type={showPasswords.confirm ? "text" : "password"}
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => toggleVisibility("confirm")}
                  edge="end"
                >
                  {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <CustomButtonPrimary
          variant="contained"
          sx={{
            mt: 1,
            py: 1.5,
            
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            "&:hover": {
              opacity: 0.9,
            }
          }}
        >
          Update Password
        </CustomButtonPrimary>
      </Box>
    </Box>
  );
};

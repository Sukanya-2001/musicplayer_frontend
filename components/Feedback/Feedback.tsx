import assest from "@/json/assest";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";

export const Feedback = () => {
  const isSmallScreen = useMediaQuery("(max-width:900px)");

  return (
    <Box
      sx={{
        backgroundImage: `url(${assest.feedback})`,
        backgroundSize: "cover", // Ensure the full image is visible without zoom
        backgroundRepeat: "no-repeat", // Prevent repetition
        backgroundPosition: "center", // Center the image
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Box
        sx={{
          maxWidth: isSmallScreen ? "90%" : 600,
          width: "100%",
          textAlign:"center",
          paddingY: "100px"
        }}
      >
        <Typography
          variant="h4"
          mb={2}
          sx={{
            fontSize: isSmallScreen ? "1.5rem" : "2rem",
            color: "rgb(255 14 188)"
          }}
        >
          Give your valuable Feedback
        </Typography>
        <InputFieldCommon placeholder="Name" fullWidth sx={{ mb: 2 }} />
        <InputFieldCommon placeholder="Email" fullWidth sx={{ mb: 2 }} />
        <InputFieldCommon
          placeholder="Leave A Comment"
          fullWidth
          multiline
          rows={isSmallScreen ? 3 : 4}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" sx={{ px: 4 }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Feedback;

import ResetNewPassword from "@/components/Auth/ResetNewPassword";
import VerifyOtp from "@/components/Auth/VerifyOtp";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const ResetPassword = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [restPss, setResetPass] = useState<boolean>(false);
  const handleResetPassword = () => {
    setResetPass(true);
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {restPss ? (
        <ResetNewPassword email={id ?? ""} />
      ) : (
        <VerifyOtp email={id ?? ""} handleResetPassword={handleResetPassword} />
      )}
    </Box>
  );
};

export default ResetPassword;

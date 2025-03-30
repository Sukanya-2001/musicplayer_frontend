import ResetNewPassword from "@/components/Auth/ResetNewPassword";
import VerifyOtp from "@/components/Auth/VerifyOtp";
import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
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
    <ResponsiveDrawer noFooter>
      {restPss ? (
        <ResetNewPassword email={id ?? ""} />
      ) : (
        <VerifyOtp email={id ?? ""} handleResetPassword={handleResetPassword} />
      )}
    </ResponsiveDrawer>
  );
};

export default ResetPassword;

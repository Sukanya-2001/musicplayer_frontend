import ResetNewPassword from "@/components/Auth/ResetNewPassword";
import VerifyOtp from "@/components/Auth/VerifyOtp";
import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";

const ResetPassword = () => {
    return (
        <ResponsiveDrawer noFooter>
        <VerifyOtp/>
        <ResetNewPassword/>
        </ResponsiveDrawer>
    )
}

export default ResetPassword;
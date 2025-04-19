/* eslint-disable no-console */
import { GetProfileDetails } from "@/api/functions/user.api";
import { logout, setLoginData } from "@/reduxtoolkit/slices/userSlice";
import { useQuery } from "@tanstack/react-query";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/useAppDispatch";

const useUser = () => {
  const cookies = parseCookies();
  const token: string = cookies[process.env.NEXT_APP_TOKEN_NAME!];
  const dispatch = useAppDispatch();

  const profileDetails = useQuery({
    queryKey: ["userdetails"],
    queryFn: GetProfileDetails,
    enabled: !!token

    // onSuccess(data) {
    //   if (data?.data?.status === 401) {
    //     dispatch(logout());
    //   } else {
    //     dispatch(setLoginData(data?.data?.data));
    //   }
    // },
    // onError() {
    //   dispatch(logout());
    // }
  });

  useEffect(() => {
    if (profileDetails?.data) {
      if (profileDetails?.data?.status === 401) {
        dispatch(logout());
      } else {
        dispatch(setLoginData(profileDetails?.data?.data?.result));
      }
    }
  }, [profileDetails?.status, profileDetails?.data]);

  // useEffect(() => {
  //   if (!token) {
  //     dispatch(logout());
  //   }
  // }, [token]);

  return { ...profileDetails };
};

export default useUser;

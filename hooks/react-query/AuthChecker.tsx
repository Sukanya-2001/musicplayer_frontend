import { removeUserData } from "@/reduxtoolkit/slices/userSlice";
import { parseCookies } from "nookies"; // or js-cookie or next-cookies, depending on what you use
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const AuthChecker = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cookies = parseCookies(); // or use Cookies.get("token") if you're using js-cookie
    const token = cookies.token;

    if (!token) {
      dispatch(removeUserData());
    }
  }, []); // run only once when mounted

  return null; // this can be a utility component, or you can include this logic in your Layout
};

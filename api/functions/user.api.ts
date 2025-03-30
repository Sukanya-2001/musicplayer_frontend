import { IFormInput } from "@/interface/common.interface";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

import { loginPayload, signUpPayload } from "@/hooks/Schema/auth.schema";
import {
  USER_FORGOTPASS,
  USER_RESETPASS,
  USER_SIGNIN,
  USER_SIGNUP,
  USER_VERIFY_OTP
} from "@/hooks/allKeys";
import { IgetSignUpQuery } from "@/interface/apiresp.interfaces";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const signUpMutation = async (body: IFormInput) => {
  const res = await axiosInstance.post<IgetSignUpQuery>(
    endpoints.auth.signup,
    body
  );

  return res;
};
export const loginMutation = async (body: IFormInput) => {
  const res = await axiosInstance.post<IgetSignUpQuery>(
    endpoints.auth.login,
    body
  );

  return res;
};
export const GetProfileDetails = async () => {
  const res = await axiosInstance.get<IgetSignUpQuery>(
    endpoints.auth.profileDetails
  );

  return res;
};
export const signUpProfileMutation = async (body: IFormInput) => {
  const res = await axiosInstance.post<IgetSignUpQuery>(
    endpoints.auth.signUpProfile,
    body
  );

  return res;
};

export const useAuthLoginHook = () => {
  return useMutation({
    mutationKey: [USER_SIGNIN],
    mutationFn: async (payload: loginPayload) => {
      const res = await axiosInstance.post<any>(endpoints.auth.login, payload);

      return res?.data;
    },
    onError: (res) => {
      toast.error(res?.message ?? "");
    }
  });
};

export const useAuthSignUpHook = () => {
  return useMutation({
    mutationKey: [USER_SIGNUP],
    mutationFn: async (payload: signUpPayload) => {
      const res = await axiosInstance.post<any>(endpoints.auth.signup, payload);

      return res?.data;
    },
    onError: (res) => {
      toast.error(res?.message ?? "");
    }
  });
};

export const useAuthForgotEmailHook = () => {
  return useMutation({
    mutationKey: [USER_FORGOTPASS],
    mutationFn: async (payload: any) => {
      const res = await axiosInstance.post<any>(
        endpoints.auth.forgotEmail,
        payload
      );

      return res?.data;
    },
    onError: (res) => {
      toast.error(res?.message ?? "");
    }
  });
};

export const useAuthOtpValidateHook = () => {
  return useMutation({
    mutationKey: [USER_VERIFY_OTP],
    mutationFn: async (payload: any) => {
      const res = await axiosInstance.post<any>(
        endpoints.auth.otpValidation,
        payload
      );

      return res?.data;
    },
    onError: (res) => {
      toast.error(res?.message ?? "");
    }
  });
};

export const useAuthResetHook = () => {
  return useMutation({
    mutationKey: [USER_RESETPASS],
    mutationFn: async (payload: any) => {
      const res = await axiosInstance.post<any>(
        endpoints.auth.resetPassword,
        payload
      );

      return res?.data;
    },
    onError: (res) => {
      toast.error(res?.message ?? "");
    }
  });
};

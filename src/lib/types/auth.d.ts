import { User } from "next-auth";
import { FORGET_PASSWORD_STEPS } from "@/lib/constants/auth.constants";
import { ReactNode } from "react";

export type LoginAndRegisterResponse = {
  token: string;
  user: User["user"];
};

export type ForgetPasswordSteps =
  (typeof FORGET_PASSWORD_STEPS)[keyof typeof FORGET_PASSWORD_STEPS];

export type ForgetPasswordStepConfig = {
  title: string;
  subtitle: ReactNode;
  component: ReactNode;
  footerText?: ReactNode;
};
export type ForgetPasswordStepsMap = Record<
  ForgetPasswordStep,
  ForgetPasswordStepConfig
>;

export type NewPasswordFieldValuesSendToServer = {
  email: string;
  newPassword: string;
};

export type ChangePasswordSuccess = {
  message: "success";
  token: string;
};

export type ChangePasswordError = {
  message: Exclude<string, "success">;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: string | Record<string, any>;
};

export type ChangePasswordResponse =
  | ChangePasswordSuccess
  | ChangePasswordError;

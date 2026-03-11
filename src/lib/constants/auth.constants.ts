export const FORGET_PASSWORD_STEPS = {
  EMAIL: "email",
  OTP: "otp",
  NEW_PASSWORD: "new-password",
} as const;

export const OTP_COOL_DOWN_KEY = "otp-cool-down-key";
export const COOL_DOWN_TIME = 60000;

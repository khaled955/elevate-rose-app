"use client";

import * as React from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";

type InputOTPPatternProps = {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;

  name?: string;
  disabled?: boolean;
  autoFocus?: boolean;

  length?: number;
  pattern?: string;

  className?: string;
  containerClassName?: string;
};

export function InputOTPPattern({
  length = 6,
  pattern = REGEXP_ONLY_DIGITS_AND_CHARS,
  value,
  onChange,
  onBlur,
  name,
  disabled,
  autoFocus,
  className,
  containerClassName,
}: InputOTPPatternProps) {
  return (
    <InputOTP
      maxLength={length}
      pattern={pattern}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      disabled={disabled}
      autoFocus={autoFocus}
      className={className}
      containerClassName={containerClassName}
    >
      {Array.from({ length }).map((_, index) => (
        <InputOTPSlot key={index} index={index} />
      ))}
    </InputOTP>
  );
}

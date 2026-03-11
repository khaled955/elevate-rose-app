"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

const StepperContext = React.createContext<{
  currentStep: number;
  totalSteps: number;
}>({
  currentStep: 1,
  totalSteps: 2,
});

interface StepperProps extends React.ComponentProps<"div"> {
  currentStep: number;
  steps: number;
}

function Stepper({ currentStep, steps, className, ...props }: StepperProps) {
  return (
    <StepperContext.Provider value={{ currentStep, totalSteps: steps }}>
      <div
        data-slot="stepper"
        className={cn("flex items-center w-full", className)}
        {...props}
      >
        {Array.from({ length: steps }, (_, index) => (
          <React.Fragment key={index}>
            <StepperSeparator completed={index < currentStep} />
            <StepperItem step={index + 1} />
          </React.Fragment>
        ))}
      </div>
    </StepperContext.Provider>
  );
}

interface StepperSeparatorProps extends React.ComponentProps<"div"> {
  completed?: boolean;
}

function StepperSeparator({
  completed,
  className,
  ...props
}: StepperSeparatorProps) {
  return (
    <div
      data-slot="stepper-separator"
      className={cn(
        "flex-1 h-[.375rem] transition-colors",
        completed ? "bg-maroon-600" : "bg-muted dark:bg-soft-pink-300",
        className,
      )}
      {...props}
    />
  );
}

interface StepperItemProps extends React.ComponentProps<"div"> {
  step?: number;
}

function StepperItem({ step = 1, className, ...props }: StepperItemProps) {
  const { currentStep } = React.useContext(StepperContext);
  const isCompleted = step < currentStep;
  const isCurrent = step === currentStep;

  return (
    <div
      data-slot="stepper-item"
      data-state={
        isCompleted ? "completed" : isCurrent ? "current" : "upcoming"
      }
      className={cn(
        "flex items-center justify-center size-6 rounded-full text-sm font-medium transition-colors shrink-0 text-white",
        isCompleted && "border-primary bg-maroon-600",
        isCurrent && "bg-maroon-600",
        !isCompleted && !isCurrent && "bg-zinc-200 text-zinc-500",
        className,
      )}
      {...props}
    >
      {step}
    </div>
  );
}

export { Stepper, StepperItem, StepperSeparator };

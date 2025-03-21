
import * as React from "react";
import { cn } from "@/lib/utils";

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ value = 0, className, children, ...props }, ref) => {
    const numberOfSteps = React.Children.count(children);
    const stepsArray = React.Children.toArray(children);

    return (
      <div
        ref={ref}
        className={cn("flex w-full justify-between", className)}
        {...props}
      >
        {stepsArray.map((step, index) => {
          const isActive = index <= value;

          // Need to clone the element to add props
          return React.cloneElement(step as React.ReactElement, {
            key: index,
            isActive,
            isCompleted: index < value,
            isLast: index === numberOfSteps - 1,
            stepNumber: index + 1,
          });
        })}
      </div>
    );
  }
);

Steps.displayName = "Steps";

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  isCompleted?: boolean;
  isLast?: boolean;
  stepNumber?: number;
}

const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ isActive, isCompleted, isLast, stepNumber, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex flex-1 flex-col items-center justify-center",
          !isLast && "after:absolute after:left-[50%] after:top-[15px] after:h-[2px] after:w-full after:translate-x-0",
          !isLast && isActive
            ? "after:bg-factsheet-blue"
            : "after:bg-gray-200",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors",
            isActive ? "bg-factsheet-blue text-white" : "bg-gray-200"
          )}
        >
          {isCompleted ? (
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            stepNumber
          )}
        </div>
        <div
          className={cn(
            "absolute top-10 text-center text-sm font-medium transition-colors",
            isActive ? "text-gray-700" : "text-gray-500"
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

Step.displayName = "Step";

export { Steps, Step };

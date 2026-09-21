import { Check } from "lucide-react";

interface Step {
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({
  steps,
  currentStep,
}: StepIndicatorProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div
              key={step.label}
              className="flex flex-1 items-center last:flex-none"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition ${
                    isCompleted || isActive
                      ? "bg-[#315bd1] text-white"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check size={18} strokeWidth={2.5} />
                  ) : (
                    stepNumber
                  )}
                </div>

                <span
                  className={`mt-2 whitespace-nowrap text-xs font-medium ${
                    isActive || isCompleted
                      ? "text-[#315bd1]"
                      : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`mx-2 mb-6 h-0.5 flex-1 transition ${
                    isCompleted ? "bg-gradient-to-r from-[#3156d9] to-[#10a88a]" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

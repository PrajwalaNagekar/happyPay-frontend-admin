import type { ReactNode } from "react";

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  className?: string;
}

export default function LoadingState({
  message = "Loading...",
  fullScreen = false,
  size = "md",
  icon,
  className = "",
}: LoadingStateProps) {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-10 w-10 border-[3px]",
  };

  const containerClasses = fullScreen
    ? "flex min-h-[300px] w-full items-center justify-center"
    : "flex w-full items-center justify-center py-10";

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="flex flex-col items-center justify-center">
        {icon || (
          <span
            className={`animate-spin rounded-full border-[#315bd1] border-t-transparent ${sizeClasses[size]}`}
            aria-hidden="true"
          />
        )}

        {message && (
          <p className="mt-3 text-sm font-medium text-slate-500">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
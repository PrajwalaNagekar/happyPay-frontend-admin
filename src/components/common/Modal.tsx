import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
}

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (
      closeOnOverlayClick &&
      event.target === event.currentTarget
    ) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-[3px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      onMouseDown={handleOverlayClick}
    >
      <div
        className={`w-full ${sizeClasses[size]} overflow-hidden rounded-[22px] border border-slate-100 bg-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.45)]`}
      >
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
            <div className="pr-4">
              {title && (
                <h2
                  id="modal-title"
                  className="text-lg font-semibold text-slate-900"
                >
                  {title}
                </h2>
              )}

              {description && (
                <p className="mt-1 text-sm text-slate-500">
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}

        <div className="max-h-[80vh] overflow-y-auto p-5">
          {children}
        </div>
      </div>
    </div>
  );
}
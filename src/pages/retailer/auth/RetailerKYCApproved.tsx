import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const RetailerKycApproved = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/retailer", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-md rounded-3xl bg-background p-8 text-center shadow-lg border">
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold">
          KYC Approved
        </h1>

        <p className="mt-3 text-muted-foreground">
          Congratulations! Your retailer KYC has been successfully
          verified and approved.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          You can now access your retailer dashboard.
        </p>

        <button
          type="button"
          onClick={handleContinue}
          className="mt-8 w-full rounded-xl bg-primary px-4 py-3 font-medium text-primary-foreground hover:opacity-90"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default RetailerKycApproved;
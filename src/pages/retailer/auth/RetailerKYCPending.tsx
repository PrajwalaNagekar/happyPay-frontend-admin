import { useNavigate } from "react-router-dom";
import { Clock3 } from "lucide-react";

const RetailerKycPending = () => {
  const navigate = useNavigate();

  const handleApproval = () => {
    navigate("/retailer/kyc-approved", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-md rounded-3xl bg-background p-8 text-center shadow-lg border">
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
            <Clock3 className="h-10 w-10 text-yellow-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold">
          KYC Verification Pending
        </h1>

        <p className="mt-3 text-muted-foreground">
          Your registration has been submitted successfully.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          Our admin team is currently reviewing your KYC details.
          You will be notified once your account is approved.
        </p>

        {/* Temporary button for development */}
        <button
          type="button"
          onClick={handleApproval}
          className="mt-8 w-full rounded-xl bg-primary px-4 py-3 font-medium text-primary-foreground hover:opacity-90"
        >
          Simulate Admin Approval
        </button>
      </div>
    </div>
  );
};

export default RetailerKycPending;
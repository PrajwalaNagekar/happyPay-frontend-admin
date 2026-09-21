import { useRef, useState } from "react";
import {
  Mail,
  Store,
  Shapes,
  Building2,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Navigation,
} from "lucide-react";

const ShopDetailsStep = () => {
  const locationInputRef = useRef<HTMLInputElement | null>(null);

  const [email, setEmail] = useState("");
  const [shopName, setShopName] = useState("");
  const [category, setCategory] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [address, setAddress] = useState("");
  const [locationAdded, setLocationAdded] = useState(false);

  const [emailOtpSent, setEmailOtpSent] = useState(false);

  const categories = [
    "Grocery",
    "Electronics",
    "Medical",
    "Clothing",
    "Restaurant",
    "Mobile Shop",
    "General Store",
    "Other",
  ];

  const propertyTypes = [
    "Owned",
    "Rented",
    "Leased",
    "Co-owned",
    "Other",
  ];

  const handleSendEmailOtp = () => {
    if (!email.trim()) {
      return;
    }

    setEmailOtpSent(true);
  };

  const handleLocation = () => {
    setLocationAdded(true);
  };

  return (
    <div className="space-y-5">
      {/* =====================================================
          EMAIL ID
      ===================================================== */}

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-[#172033]">
          Email ID
        </label>

        <div className="relative">
          <Mail
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8992a3]"
            strokeWidth={2}
          />

          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailOtpSent(false);
            }}
            placeholder="Enter email address"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-6 text-sm font-medium text-[#172033] outline-none transition placeholder:text-[#a1a8b5] focus:border-[#315bd1] focus:ring-2 focus:ring-[#315bd1]/10"
          />
        </div>
      </div>

      {/* =====================================================
          VERIFY EMAIL OTP
      ===================================================== */}

      <button
        type="button"
        onClick={handleSendEmailOtp}
        className={`flex h-[44px] w-full items-center justify-center gap-4 rounded-xl border-2 bg-white text-sm font-bold transition ${
          emailOtpSent
            ? "border-[#b9e8d4] text-[#08a77e]"
            : "border-[#c7d2ee] text-[#315bd1] hover:bg-[#f3f6ff]"
        }`}
      >
        {emailOtpSent ? (
          <>
            <CheckCircle2 className="h-8 w-8" />
            EMAIL OTP SENT
          </>
        ) : (
          <>
            <Mail className="h-8 w-8" />
            VERIFY EMAIL OTP
          </>
        )}
      </button>

      {/* =====================================================
          SHOP NAME
      ===================================================== */}

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-[#172033]">
          Shop Name
        </label>

        <div className="relative">
          <Store
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8992a3]"
            strokeWidth={2}
          />

          <input
            type="text"
            value={shopName}
            onChange={(event) =>
              setShopName(event.target.value)
            }
            placeholder="Enter shop name"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-6 text-sm font-medium text-[#172033] outline-none transition placeholder:text-[#a1a8b5] focus:border-[#315bd1] focus:ring-2 focus:ring-[#315bd1]/10"
          />
        </div>
      </div>

      {/* =====================================================
          SHOP CATEGORY
      ===================================================== */}

      <SelectField
        label="Shop Category"
        value={category}
        onChange={setCategory}
        icon={<Shapes />}
        options={categories}
      />

      {/* =====================================================
          PROPERTY TYPE
      ===================================================== */}

      <SelectField
        label="Property Type"
        value={propertyType}
        onChange={setPropertyType}
        icon={<Building2 />}
        options={propertyTypes}
      />

      {/* =====================================================
          COMPLETE SHOP ADDRESS
      ===================================================== */}

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-[#172033]">
          Complete Shop Address
        </label>

        <div className="relative">
          <MapPin
            className="pointer-events-none absolute left-3 top-4 h-4 w-4 text-[#8992a3]"
            strokeWidth={2}
          />

          <textarea
            value={address}
            onChange={(event) =>
              setAddress(event.target.value)
            }
            rows={4}
            placeholder="Enter complete shop address"
            className="min-h-[80px] w-full resize-none rounded-xl border-2 border-[#dfe1e6] bg-[#fafbfd] px-4 py-3 pl-11 text-sm leading-7 text-[#172033] outline-none transition placeholder:text-[#a1a8b5] focus:border-[#315bd1] focus:ring-2 focus:ring-[#315bd1]/10"
          />
        </div>
      </div>

      {/* =====================================================
          SHOP LOCATION
      ===================================================== */}

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-[#172033]">
          Shop Location
        </label>

        <button
          type="button"
          onClick={handleLocation}
          className={`flex w-full items-center gap-3 rounded-xl border-2 p-6 text-left transition ${
            locationAdded
              ? "border-[#b9e8d4] bg-[#f3fcf8]"
              : "border-[#d0d2d7] bg-[#fafbfd] hover:border-[#315bd1]"
          }`}
        >
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
              locationAdded
                ? "bg-[#e4f7f1]"
                : "bg-[#e8edff]"
            }`}
          >
            {locationAdded ? (
              <CheckCircle2
                className="h-9 w-9 text-[#08a77e]"
                strokeWidth={2}
              />
            ) : (
              <MapPin
                className="h-9 w-9 text-[#315bd1]"
                strokeWidth={2}
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[#172033]">
              {locationAdded
                ? "Shop Location Added"
                : "Pin your shop location"}
            </p>

            <p className="mt-1.5 text-sm leading-6 text-[#939baa]">
              {locationAdded
                ? "Your shop location has been selected."
                : "Pin your shop location on the map"}
            </p>
          </div>

          <ChevronRight
            className={`h-8 w-8 shrink-0 ${
              locationAdded
                ? "text-[#08a77e]"
                : "text-[#315bd1]"
            }`}
            strokeWidth={2.3}
          />
        </button>

        {/* HIDDEN LOCATION INPUT */}

        <input
          ref={locationInputRef}
          type="text"
          className="hidden"
          aria-hidden="true"
        />
      </div>

      {/* =====================================================
          LOCATION INFO
      ===================================================== */}

      <div className="flex items-start gap-3 rounded-xl border border-[#d9e0f5] bg-[#eef1ff] px-4 py-3">
        <Navigation
          className="mt-1 h-8 w-8 shrink-0 text-[#315bd1]"
          strokeWidth={2}
        />

        <p className="text-sm leading-7 text-[#4a5263]">
          Make sure the shop location matches your
          <br />
          registered business address.
        </p>
      </div>
    </div>
  );
};

/* ============================================================
   SELECT FIELD
============================================================ */

const SelectField = ({
  label,
  value,
  onChange,
  icon,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  options: string[];
}) => {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-[#172033]">
        {label}
      </label>

      <div className="relative">
        {/* ICON */}

        <span className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-400 [&>svg]:h-4 [&>svg]:w-4">
          {icon}
        </span>

        {/* SELECT */}

        <select
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className={`h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-8 text-sm text-[#172033] outline-none transition focus:border-[#315bd1] focus:ring-2 focus:ring-[#315bd1]/10`}
        >
          <option value="" disabled>
            Select {label.toLowerCase()}
          </option>

          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

        {/* ARROW */}

        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#697386]"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default ShopDetailsStep;







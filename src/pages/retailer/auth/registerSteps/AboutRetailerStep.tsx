import { useRef, useState } from "react";
import {
  UserRound,
  Camera,
  UsersRound,
  Heart,
  GraduationCap,
  Check,
} from "lucide-react";

const AboutRetailerStep = () => {
  const selfieInputRef = useRef<HTMLInputElement | null>(null);

  const [fullName, setFullName] = useState("");
  const [selfie, setSelfie] = useState<File | null>(null);
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [education, setEducation] = useState("");

  const handleSelfieUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelfie(file);
    }
  };

  return (
    <div className="space-y-5">
      {/* Full Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Full Name
        </label>

        <div className="relative">
          <UserRound
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-4 text-sm text-gray-700 outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
          />
        </div>
      </div>

      {/* Selfie */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Selfie
        </label>

        <input
          ref={selfieInputRef}
          type="file"
          accept="image/*"
          onChange={handleSelfieUpload}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => selfieInputRef.current?.click()}
          className="flex h-32 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-[#2563EB] hover:bg-blue-50"
        >
          {selfie ? (
            <div className="flex items-center gap-2 text-sm font-medium text-green-600">
              <Check size={20} />
              {selfie.name}
            </div>
          ) : (
            <>
              <Camera size={28} className="mb-2 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">
                Upload Selfie
              </span>
              <span className="mt-1 text-xs text-gray-400">
                Click to select an image
              </span>
            </>
          )}
        </button>
      </div>

      {/* Gender */}
      <SelectField
        label="Gender"
        value={gender}
        onChange={setGender}
        icon={<UsersRound size={20} />}
        options={["Male", "Female", "Other"]}
      />

      {/* Marital Status */}
      <SelectField
        label="Marital Status"
        value={maritalStatus}
        onChange={setMaritalStatus}
        icon={<Heart size={20} />}
        options={[
          "Single",
          "Married",
          "Divorced",
          "Widowed",
          "Other",
        ]}
      />

      {/* Educational Qualification */}
      <SelectField
        label="Educational Qualification"
        value={education}
        onChange={setEducation}
        icon={<GraduationCap size={20} />}
        options={[
          "10th",
          "12th",
          "Diploma",
          "Graduate",
          "Post Graduate",
          "Other",
        ]}
      />
    </div>
  );
};

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  options: string[];
}

const SelectField = ({
  label,
  value,
  onChange,
  icon,
  options,
}: SelectFieldProps) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white pl-12 pr-10 text-sm text-gray-700 outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10"
        >
          <option value="">Select {label}</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AboutRetailerStep;
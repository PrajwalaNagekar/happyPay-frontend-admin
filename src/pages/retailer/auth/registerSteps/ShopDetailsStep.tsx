import {
  Store,
  Mail,
  MapPin,
} from "lucide-react";

const ShopDetailsStep = () => {
  return (
    <div className="space-y-5">

      {/* Email */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[#303947]">
          Email Address
        </label>

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            type="email"
            placeholder="Enter email address"
            className="h-[50px] w-full rounded-xl border border-gray-200 bg-[#fafafa] pl-11 pr-4 text-sm text-[#26384a] outline-none transition placeholder:text-gray-400 focus:border-[#7668aa] focus:bg-white focus:ring-4 focus:ring-[#7668aa]/10"
          />
        </div>
      </div>

      {/* Shop Name */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[#303947]">
          Shop Name
        </label>

        <div className="relative">
          <Store className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Enter shop name"
            className="h-[50px] w-full rounded-xl border border-gray-200 bg-[#fafafa] pl-11 pr-4 text-sm text-[#26384a] outline-none transition placeholder:text-gray-400 focus:border-[#7668aa] focus:bg-white focus:ring-4 focus:ring-[#7668aa]/10"
          />
        </div>
      </div>

      {/* Two columns */}
      <div className="grid gap-5 sm:grid-cols-2">

        {/* Category */}
        <div>
          <label className="mb-2 block text-xs font-semibold text-[#303947]">
            Shop Category
          </label>

          <select
            className="h-[50px] w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 text-sm text-[#26384a] outline-none transition focus:border-[#7668aa] focus:bg-white focus:ring-4 focus:ring-[#7668aa]/10"
          >
            <option value="">Select category</option>
            <option>General Store</option>
            <option>Mobile Shop</option>
            <option>Grocery Store</option>
            <option>Pharmacy</option>
            <option>Travel Agency</option>
            <option>Other</option>
          </select>
        </div>

        {/* Property */}
        <div>
          <label className="mb-2 block text-xs font-semibold text-[#303947]">
            Property Type
          </label>

          <select
            className="h-[50px] w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 text-sm text-[#26384a] outline-none transition focus:border-[#7668aa] focus:bg-white focus:ring-4 focus:ring-[#7668aa]/10"
          >
            <option value="">Select property</option>
            <option>Owned</option>
            <option>Rented</option>
            <option>Leased</option>
          </select>
        </div>

      </div>

      {/* Address */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[#303947]">
          Complete Shop Address
        </label>

        <textarea
          rows={4}
          placeholder="Enter complete shop address"
          className="w-full resize-none rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-sm text-[#26384a] outline-none transition placeholder:text-gray-400 focus:border-[#7668aa] focus:bg-white focus:ring-4 focus:ring-[#7668aa]/10"
        />
      </div>

      {/* Location */}
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#dcd6ee] bg-[#f8f7fc] px-4 py-3 text-xs font-semibold text-[#7668aa] transition hover:bg-[#eeeafa]"
      >
        <MapPin className="h-4 w-4" />
        Pin Shop Location
      </button>

    </div>
  );
};

export default ShopDetailsStep;
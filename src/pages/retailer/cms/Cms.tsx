import React, { useState } from "react";
import {
  Building2,
  CheckCircle2,
  ChevronDown,
  Edit3,
  Globe2,
  Image as ImageIcon,
  Plus,
  RefreshCw,
  Search,
  Settings2,
  Trash2,
  X,
} from "lucide-react";

export type CmsCompany = {
  id: string;
  name: string;
  code: string;
  status: "Active" | "Inactive";
  description: string;
  website: string;
};

type CompanyIconProps = {
  name: string;
  className?: string;
};

const cmsCompanies: CmsCompany[] = [
  {
    id: "1",
    name: "Airtel Payments Bank",
    code: "APB",
    status: "Active",
    description: "Banking and payment services",
    website: "https://www.airtel.in",
  },
  {
    id: "2",
    name: "Jio Payments Bank",
    code: "JPB",
    status: "Active",
    description: "Digital banking and payment services",
    website: "https://www.jio.com",
  },
  {
    id: "3",
    name: "India Post Payments Bank",
    code: "IPPB",
    status: "Active",
    description: "Payments banking services",
    website: "https://www.ippbonline.com",
  },
];

const CompanyIcon: React.FC<CompanyIconProps> = ({
  name,
  className = "h-5 w-5",
}) => {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`flex items-center justify-center rounded-lg bg-[#eef2ff] font-bold text-[#315bd1] ${className}`}
      title={name}
    >
      {initials || <Building2 className="h-4 w-4" />}
    </div>
  );
};

const Cms: React.FC = () => {
  const [companies, setCompanies] =
    useState<CmsCompany[]>(cmsCompanies);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");

  const [showForm, setShowForm] = useState(false);

  const [editingCompany, setEditingCompany] =
    useState<CmsCompany | null>(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [companyToDelete, setCompanyToDelete] =
    useState<CmsCompany | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    website: "",
    status: "Active" as "Active" | "Inactive",
  });

  const filteredCompanies = companies.filter((company) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      company.name.toLowerCase().includes(searchValue) ||
      company.code.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "All" ||
      company.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const openCreateForm = () => {
    setEditingCompany(null);

    setFormData({
      name: "",
      code: "",
      description: "",
      website: "",
      status: "Active",
    });

    setShowForm(true);
  };

  const openEditForm = (company: CmsCompany) => {
    setEditingCompany(company);

    setFormData({
      name: company.name,
      code: company.code,
      description: company.description,
      website: company.website,
      status: company.status,
    });

    setShowForm(true);
  };

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.code.trim()) {
      return;
    }

    if (editingCompany) {
      setCompanies((current) =>
        current.map((company) =>
          company.id === editingCompany.id
            ? {
                ...company,
                name: formData.name.trim(),
                code: formData.code.trim().toUpperCase(),
                description: formData.description.trim(),
                website: formData.website.trim(),
                status: formData.status,
              }
            : company,
        ),
      );
    } else {
      const newCompany: CmsCompany = {
        id: `${Date.now()}`,
        name: formData.name.trim(),
        code: formData.code.trim().toUpperCase(),
        description: formData.description.trim(),
        website: formData.website.trim(),
        status: formData.status,
      };

      setCompanies((current) => [
        newCompany,
        ...current,
      ]);
    }

    setShowForm(false);
    setEditingCompany(null);
  };

  const confirmDelete = (company: CmsCompany) => {
    setCompanyToDelete(company);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (!companyToDelete) {
      return;
    }

    setCompanies((current) =>
      current.filter(
        (company) => company.id !== companyToDelete.id,
      ),
    );

    setCompanyToDelete(null);
    setShowDeleteModal(false);
  };

  const toggleStatus = (company: CmsCompany) => {
    setCompanies((current) =>
      current.map((item) =>
        item.id === company.id
          ? {
              ...item,
              status:
                item.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : item,
      ),
    );
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#315bd1]">
            Management
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            CMS
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage company configurations and payment service
            information.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#315bd1] px-4 text-xs font-bold text-white transition hover:bg-[#274dbd]"
        >
          <Plus className="h-4 w-4" />
          Add Company
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Total Companies
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {companies.length}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ff]">
              <Building2 className="h-5 w-5 text-[#315bd1]" />
            </div>
          </div>
        </div>

        {/* Active */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Active
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {
                  companies.filter(
                    (company) =>
                      company.status === "Active",
                  ).length
                }
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Inactive */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Inactive
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-500">
                {
                  companies.filter(
                    (company) =>
                      company.status === "Inactive",
                  ).length
                }
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
              <Settings2 className="h-5 w-5 text-slate-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex h-10 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-[#315bd1] focus-within:bg-white">
            <Search className="h-4 w-4 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search company or code..."
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="relative w-full lg:w-44">
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as
                    | "All"
                    | "Active"
                    | "Inactive",
                )
              }
              className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 pr-9 text-xs font-semibold text-slate-600 outline-none focus:border-[#315bd1]"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatusFilter("All");
            }}
            className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </section>

      {/* Company Table */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Companies
            </h2>

            <p className="mt-1 text-[11px] text-slate-500">
              {filteredCompanies.length} compan
              {filteredCompanies.length === 1
                ? "y"
                : "ies"}{" "}
              found
            </p>
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eef2ff]">
            <Building2 className="h-4 w-4 text-[#315bd1]" />
          </div>
        </div>

        {filteredCompanies.length === 0 ? (
          <div className="flex min-h-[260px] flex-col items-center justify-center px-5 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
              <Search className="h-5 w-5 text-slate-400" />
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-800">
              No companies found
            </h3>

            <p className="mt-1 max-w-sm text-xs text-slate-500">
              Try changing your search term or status filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Company
                  </th>

                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Code
                  </th>

                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Description
                  </th>

                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Website
                  </th>

                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredCompanies.map((company) => (
                  <tr
                    key={company.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <CompanyIcon name={company.name} />

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {company.name}
                          </p>

                          <p className="mt-0.5 text-[10px] text-slate-400">
                            ID: {company.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">
                        {company.code}
                      </span>
                    </td>

                    <td className="max-w-[240px] px-5 py-4">
                      <p className="truncate text-xs text-slate-600">
                        {company.description || "—"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      {company.website ? (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs font-medium text-[#315bd1] hover:underline"
                        >
                          <Globe2 className="h-3.5 w-3.5" />
                          Visit website
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400">
                          —
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => toggleStatus(company)}
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          company.status === "Active"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {company.status}
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            openEditForm(company)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-[#315bd1] hover:bg-[#eef2ff] hover:text-[#315bd1]"
                          aria-label={`Edit ${company.name}`}
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            confirmDelete(company)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                          aria-label={`Delete ${company.name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Create / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#315bd1]">
                  CMS
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  {editingCompany
                    ? "Edit Company"
                    : "Add Company"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 p-5"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="cms-name"
                    className="text-xs font-semibold text-slate-600"
                  >
                    Company Name
                  </label>

                  <input
                    id="cms-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                    className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-[#315bd1] focus:bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cms-code"
                    className="text-xs font-semibold text-slate-600"
                  >
                    Company Code
                  </label>

                  <input
                    id="cms-code"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="e.g. APB"
                    className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm uppercase outline-none focus:border-[#315bd1] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="cms-description"
                  className="text-xs font-semibold text-slate-600"
                >
                  Description
                </label>

                <textarea
                  id="cms-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Enter company description"
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#315bd1] focus:bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="cms-website"
                  className="text-xs font-semibold text-slate-600"
                >
                  Website
                </label>

                <div className="mt-2 flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-[#315bd1] focus-within:bg-white">
                  <Globe2 className="h-4 w-4 text-slate-400" />

                  <input
                    id="cms-website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="cms-status"
                  className="text-xs font-semibold text-slate-600"
                >
                  Status
                </label>

                <div className="relative mt-2">
                  <select
                    id="cms-status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 pr-9 text-sm outline-none focus:border-[#315bd1]"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="h-10 rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="h-10 rounded-xl bg-[#315bd1] px-5 text-xs font-bold text-white transition hover:bg-[#274dbd]"
                >
                  {editingCompany
                    ? "Save Changes"
                    : "Create Company"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && companyToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
              <Trash2 className="h-5 w-5 text-red-500" />
            </div>

            <h2 className="mt-4 text-base font-bold text-slate-900">
              Delete Company?
            </h2>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-700">
                {companyToDelete.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setCompanyToDelete(null);
                  setShowDeleteModal(false);
                }}
                className="h-10 flex-1 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="h-10 flex-1 rounded-xl bg-red-500 text-xs font-bold text-white transition hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3">
        <ImageIcon className="h-4 w-4 text-slate-400" />

        <p className="text-[10px] text-slate-500">
          CMS configuration changes should be reviewed before being
          applied to production services.
        </p>
      </div>
    </div>
  );
};

export default Cms;
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  email: string;
  dateOfBirth: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
};

export default function Settings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      name: "Charlotte Reed",
      email: "charlotte@example.com",
      dateOfBirth: "1990-01-20",
      address: "San Jose, California, USA",
      postalCode: "45962",
      city: "San Jose",
      country: "USA",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit = (data: FormInputs) => {
    console.log("Form submitted:", data);
    // Handle form submission here
  };

  return (
    <div className="w-full h-full p-4 overflow-auto">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100"
        >
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mb-6 sm:mb-8">
            <div className="relative mb-4 sm:mb-0 flex-shrink-0">
              <UserCircleIcon className="h-20 w-20 text-gray-400" />
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-[#0066FF] text-white rounded-full p-1 hover:bg-[#0066FF]/90 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
            <div className="text-center sm:text-left w-full">
              <h2 className="text-xl font-semibold text-[#1E293B]">Settings</h2>
              <p className="text-gray-500">
                Update your profile and preferences
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="w-full">
              <label
                className="block text-sm font-medium text-[#1E293B] mb-1"
                htmlFor="name"
              >
                Your Name
              </label>
              <input
                id="name"
                type="text"
                className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] ${
                  errors.name ? "border-red-500" : "border-gray-200"
                }`}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-medium text-[#1E293B] mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-medium text-[#1E293B] mb-1"
                htmlFor="dateOfBirth"
              >
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                type="date"
                className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] ${
                  errors.dateOfBirth ? "border-red-500" : "border-gray-200"
                }`}
                {...register("dateOfBirth", {
                  required: "Date of birth is required",
                })}
              />
              {errors.dateOfBirth && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-medium text-[#1E293B] mb-1"
                htmlFor="address"
              >
                Permanent Address
              </label>
              <input
                id="address"
                type="text"
                className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] ${
                  errors.address ? "border-red-500" : "border-gray-200"
                }`}
                {...register("address", {
                  required: "Address is required",
                  minLength: {
                    value: 5,
                    message: "Address must be at least 5 characters",
                  },
                })}
              />
              {errors.address && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-medium text-[#1E293B] mb-1"
                htmlFor="postalCode"
              >
                Postal Code
              </label>
              <input
                id="postalCode"
                type="text"
                className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] ${
                  errors.postalCode ? "border-red-500" : "border-gray-200"
                }`}
                {...register("postalCode", {
                  required: "Postal code is required",
                  pattern: {
                    value: /^\d{5}(-\d{4})?$/,
                    message:
                      "Invalid postal code format (e.g., 12345 or 12345-6789)",
                  },
                })}
              />
              {errors.postalCode && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.postalCode.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-medium text-[#1E293B] mb-1"
                htmlFor="city"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] ${
                  errors.city ? "border-red-500" : "border-gray-200"
                }`}
                {...register("city", {
                  required: "City is required",
                  minLength: {
                    value: 2,
                    message: "City must be at least 2 characters",
                  },
                })}
              />
              {errors.city && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-medium text-[#1E293B] mb-1"
                htmlFor="country"
              >
                Country
              </label>
              <input
                id="country"
                type="text"
                className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] ${
                  errors.country ? "border-red-500" : "border-gray-200"
                }`}
                {...register("country", {
                  required: "Country is required",
                  minLength: {
                    value: 2,
                    message: "Country must be at least 2 characters",
                  },
                })}
              />
              {errors.country && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#0066FF] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#0066FF]/90 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

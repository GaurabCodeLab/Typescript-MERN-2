import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "../redux/api/authApi";
import Swal from "sweetalert2";
import { ThreeDot } from "react-loading-indicators";
import type React from "react";

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ email: string }>();
  const [sendEmail, { isLoading }] = useForgotPasswordMutation();
  const onSubmit = async (data: { email: string }) => {
    try {
      const response = await sendEmail(data);
      if (response.error) {
        throw new Error(response.error.data.message);
      }
      Swal.fire({
        icon: "success",
        text: response.data?.message,
      }).then((result) => {
        if (result.isConfirmed) {
          reset();
        }
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "something went wrong";
      console.error(errorMessage);
      Swal.fire({
        icon: "error",
        text: errorMessage,
      });
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-center pt-22">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Forgot Password
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "provide correct email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              {isLoading ? <ThreeDot color="white" /> : "Send Reset Link"}
            </button>

            <p className="text-sm text-center text-gray-600">
              Remembered your password?{" "}
              <Link to="/" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

import { useForm } from "react-hook-form";
import type { Password } from "../types/user";
import { useResetPasswordMutation } from "../redux/api/authApi";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators";
import type React from "react";

const ResetPassword: React.FC = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Password>();
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const onSubmit = async (data: Password) => {
    try {
      const { newPassword } = data;
      if (token) {
        const response = await resetPassword({ token, newPassword });
        if (response.error) {
          throw new Error(response.error.data.message);
        }
        Swal.fire({
          icon: "success",
          text: response.data.message,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "something went wrong";
      Swal.fire({
        icon: "error",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-center pt-16">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Reset Password
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
                {...register("newPassword", {
                  required: "new password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, *, ?, &).",
                  },
                })}
              />
              {errors.newPassword && (
                <p className="text-red-600">{errors.newPassword.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
                {...register("confirmPassword", {
                  required: "confirm new password is required",
                  validate: (value) =>
                    watch("newPassword") === value ||
                    "new password and confirm new password must match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              {isLoading ? <ThreeDot color="white" /> : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

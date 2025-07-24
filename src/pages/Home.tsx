import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { LoggeedInUser } from "../types/user";
import { useLoginMutation } from "../redux/api/authApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { addUser } from "../redux/slices/userSlice";
import { ThreeDot } from "react-loading-indicators";
import type React from "react";

const LoginPage: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoggeedInUser>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: LoggeedInUser) => {
    try {
      const response = await login(data);
      if (response.error) {
        throw new Error(response.error.data.message);
      }
      dispatch(addUser(response.data));
      navigate("/dashboard");
    } catch (error) {
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
      <div className="flex items-center justify-center pt-12">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Login
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
                {...register("password", {
                  required: "password is required",
                })}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="flex justify-between flex-col gap-2 text-sm">
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>

              <button
                type="submit"
                className="cursor-pointer w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                {isLoading ? <ThreeDot color="white" /> : "Log In"}
              </button>
              <div>
                Don't have an account?
                <Link
                  to="/signup"
                  className="text-blue-500 hover:underline ps-2"
                >
                  Register here
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

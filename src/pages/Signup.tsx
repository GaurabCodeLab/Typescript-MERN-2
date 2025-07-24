import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { User } from "../types/user";
import { useCreateUserMutation } from "../redux/api/authApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators";
import type React from "react";

const SignupPage: React.FC = () => {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();
  const navigate = useNavigate();

  const onSubmit = async (data: User) => {
    try {
      const { name, email, password } = data;
      const response = await createUser({ name, email, password });
      if (response.error) {
        throw new Error(response.error.data.message);
      }
      Swal.fire({
        icon: "success",
        text: `user ${response.data?.name} registered successfully`,
      }).then((result) => {
        if (result.isConfirmed) {
          reset();
          navigate("/");
        }
      });
      reset();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "something went wrong";
      console.log("Error in creating new user: " + errorMessage);
      Swal.fire({
        icon: "error",
        text: errorMessage || "something went wrong",
      });
    }
  };

  return (
    <div className=" min-h-screen bg-gray-100">
      <div className="flex items-center justify-center pt-7">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Sign Up
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                maxLength={20}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your Name"
                {...register("name", {
                  required: "name is required",
                  minLength: {
                    value: 2,
                    message: "name at least two characters long",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-600">{errors.name.message}</p>
              )}
            </div>
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
                    message: "provide correct email address",
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
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, *, ?, &).",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
                {...register("confirmPassword", {
                  required: "confirm password is required",
                  validate: (value) =>
                    watch("password") === value ||
                    "password and confirm password must match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              {isLoading ? <ThreeDot color="white" /> : " Register"}
            </button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
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

export default SignupPage;

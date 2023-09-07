import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import useToast from "../hooks/useToast";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (user) => {
    createUser(user?.email, user?.password)
      .then(() => {
        navigate(from, { replace: true });
        updateUserProfile(user?.name, user?.photoUrl);
        showToast("Signup successful!");
        reset();
      })
      .catch((err) => {
        showToast(err.message);
        console.error(err);
      });
  };

  return (
    <section className="w-[90%] md:w-[50%] mx-auto">
      <div className="shadow-2xl p-10 flex items-center justify-center flex-col w-full min-h-screen">
        <h2 className="text-center text-4xl font-bold mb-10 text-white">
          Signup
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mb-4">
            <label className="block mb-1 font-medium">Name</label>
            <input
              className="inputFields"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              className="inputFields"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Password</label>
            <input
              className="inputFields"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Photo URL</label>
            <input
              className="inputFields"
              {...register("photoUrl", { required: true })}
            />
            {errors.photoUrl && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Bio</label>
            <input
              className="inputFields"
              {...register("bio", { required: true })}
            />
            {errors.bio && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <button type="submit" className="loginButton">
            Signup
          </button>
        </form>

        <p className="w-full mt-4">
          Already have an account?{" "}
          <Link className="text-blue-500" to="/signin">
            Signin
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;

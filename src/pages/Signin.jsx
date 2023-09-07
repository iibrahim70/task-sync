import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import useToast from "../hooks/useToast";

const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { signIn } = useContext(AuthContext);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (user) => {
    signIn(user?.email, user?.password)
      .then((signedInUser) => {
        const displayName = signedInUser?.displayName || "User";
        navigate(from, { replace: true });
        showToast(`Welcome back ${displayName}!`);
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
          Signin
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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

          <button type="submit" className="loginButton">
            Signin
          </button>
        </form>

        <p className="w-full mt-4">
          Don't have an account yet?{" "}
          <Link className="text-blue-500" to="/signup">
            Signup
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signin;

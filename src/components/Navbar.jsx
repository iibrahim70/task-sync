import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const navItems = (
    <div className="flex flex-col lg:flex-row gap-y-5 lg:gap-x-10 text-base font-semibold text-white/80">
      <a>Home</a>
      <a>Blog</a>
      <a>About</a>
      <a>Contact</a>
    </div>
  );

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };

  return (
    <section className="bg-base-300">
      <div className="drawer wrapper">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar p-0 grid grid-cols-3">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>

            <div className="text-lg font-bold text-white/90">Task Sync</div>

            <div className="hidden lg:flex justify-center">
              <ul className="menu menu-horizontal p-0">{navItems}</ul>
            </div>

            <div className="hidden lg:flex justify-end">
              <div className="dropdown dropdown-end flex justify-center items-center gap-5">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user?.photoURL} />
                  </div>
                </label>
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="btn btn-ghost btn-sm"
                  >
                    Signout
                  </button>
                ) : (
                  <Link to="/signin" className="btn btn-ghost btn-sm">
                    Signin
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">{navItems}</ul>
        </div>
      </div>
    </section>
  );
};

export default Navbar;

import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };

  const navItems = (
    <div className="flex flex-col items-center text-base font-semibold text-white/80 mt-5 ghotstBtn">
      <Link to="/">Home</Link>
      <Link to="/create-task">Task Management</Link>
      <a>About</a>
      <a>Contact</a>
      {user ? (
        <button onClick={handleLogout}>Signout</button>
      ) : (
        <Link to="/signin">Signin</Link>
      )}
      <hr className="border border-red-500 w-[50%] my-5" />
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-20 rounded-full">
          <img src={user?.photoURL} />
        </div>
      </label>
    </div>
  );

  return (
    <section className="bg-base-300">
      <div className="drawer bg-slate-700 z-10 flex-none lg:hidden">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-base-300">
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
            <div className="flex mx-auto font-semibold text-xl">Task Sync</div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-0 w-80 h-full bg-base-200">{navItems}</ul>
        </div>
      </div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center bg-white min-h-screen">
          {/* Page content here */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-0 w-80 h-full bg-base-200 text-base-content">
            {navItems}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Navbar;

const Navbar = () => {
  const navItems = (
    <div className="flex flex-col lg:flex-row gap-y-5 lg:gap-x-10 text-base font-semibold text-white/80">
      <a>Home</a>
      <a>Blog</a>
      <a>About</a>
      <a>Contact</a>
    </div>
  );
  return (
    <section className="bg-base-300">
      <div className="drawer wrapper">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar p-0">
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
            <div className="flex-1 text-lg font-bold text-white/90">
              Task Sync
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal p-0">{navItems}</ul>
            </div>
          </div>
          {/* Page content here
          Content */}
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
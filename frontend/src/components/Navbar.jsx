import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  LogOut,
  Search,
  History,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to={isAuthenticated ? "/dashboard" : "/"}
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
            <ShieldCheck size={22} />
          </div>

          <div>
            <h1 className="font-bold">FakeJob AI</h1>

            <p className="text-xs text-slate-500">
              Explainable AI
            </p>
          </div>
        </Link>

        {isAuthenticated && (
          <>
            <div className="hidden items-center gap-1 md:flex">
              <NavItem
                to="/dashboard"
                icon={<LayoutDashboard size={16} />}
                text="Dashboard"
              />

              <NavItem
                to="/analyze"
                icon={<Search size={16} />}
                text="Analyze"
              />

              <NavItem
                to="/history"
                icon={<History size={16} />}
                text="History"
              />

              <button
                onClick={handleLogout}
                className="ml-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </>
        )}
      </div>

      {isAuthenticated && mobileOpen && (
        <div className="border-t border-slate-800 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            <MobileNavItem
              to="/dashboard"
              icon={<LayoutDashboard size={18} />}
              text="Dashboard"
              close={() => setMobileOpen(false)}
            />

            <MobileNavItem
              to="/analyze"
              icon={<Search size={18} />}
              text="Analyze Job"
              close={() => setMobileOpen(false)}
            />

            <MobileNavItem
              to="/history"
              icon={<History size={18} />}
              text="Prediction History"
              close={() => setMobileOpen(false)}
            />

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavItem({ to, icon, text }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
    >
      {icon}
      {text}
    </Link>
  );
}

function MobileNavItem({ to, icon, text, close }) {
  return (
    <Link
      to={to}
      onClick={close}
      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
    >
      {icon}
      {text}
    </Link>
  );
}

export default Navbar;
import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { Bell, LogOut, ShipWheel } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-14 sm:h-16 flex items-center shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full gap-2">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-1.5 sm:gap-2.5">
                <ShipWheel className="size-6 sm:size-8 md:size-9 text-primary" />
                <span className="text-lg sm:text-2xl md:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider hidden xs:inline">
                  ChatMate
                </span>
                <span className="text-lg font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider xs:hidden">
                  ChatMate
                </span>
              </Link>
            </div>
          )}

          {/* Right side actions */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 ml-auto">
            {/* Notifications */}
            <Link to="/notifications">
              <button 
                className="btn btn-ghost btn-circle btn-sm sm:btn-md hover:bg-base-300 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-base-content/70" />
              </button>
            </Link>

            {/* Theme Selector */}
            <div className="hidden sm:block">
              <ThemeSelector />
            </div>

            {/* User Avatar */}
            <div className="avatar">
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-base-200">
                <img 
                  src={authUser?.profilePic} 
                  alt="User Avatar" 
                  className="object-cover"
                />
              </div>
            </div>

            {/* Logout button */}
            <button 
              className="btn btn-ghost btn-circle btn-sm sm:btn-md hover:bg-base-300 transition-colors" 
              onClick={logoutMutation}
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-base-content/70" />
            </button>

            {/* Mobile Theme Selector */}
            <div className="sm:hidden">
              <ThemeSelector />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
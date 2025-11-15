import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
        <div className="p-5 border-b border-base-300">
          <Link to="/" className="flex items-center gap-2.5">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              ChatMate
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            to="/"
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
              currentPath === "/" ? "btn-active" : ""
            }`}
          >
            <HomeIcon className="size-5 text-base-content opacity-70" />
            <span>Home</span>
          </Link>

          <Link
            to="/friends"
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
              currentPath === "/friends" ? "btn-active" : ""
            }`}
          >
            <UsersIcon className="size-5 text-base-content opacity-70" />
            <span>Friends</span>
          </Link>

          <Link
            to="/notifications"
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
              currentPath === "/notifications" ? "btn-active" : ""
            }`}
          >
            <BellIcon className="size-5 text-base-content opacity-70" />
            <span>Notifications</span>
          </Link>
        </nav>

        {/* USER PROFILE SECTION */}
        <div className="p-4 border-t border-base-300 mt-auto">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={authUser?.profilePic} alt="User Avatar" />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{authUser?.fullName}</p>
              <p className="text-xs text-success flex items-center gap-1">
                <span className="size-2 rounded-full bg-success inline-block" />
                Online
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-base-200 border-t border-base-300 z-50">
        <div className="flex justify-around items-center h-16 px-2">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 ${
              currentPath === "/" ? "text-primary" : "text-base-content opacity-70"
            }`}
          >
            <HomeIcon className="size-6" />
            <span className="text-xs">Home</span>
          </Link>

          <Link
            to="/friends"
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 ${
              currentPath === "/friends" ? "text-primary" : "text-base-content opacity-70"
            }`}
          >
            <UsersIcon className="size-6" />
            <span className="text-xs">Friends</span>
          </Link>

          <Link
            to="/notifications"
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 ${
              currentPath === "/notifications" ? "text-primary" : "text-base-content opacity-70"
            }`}
          >
            <BellIcon className="size-6" />
            <span className="text-xs">Notifications</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Top Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-base-200 border-b border-base-300 z-40">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center gap-2">
            <ShipWheelIcon className="size-7 text-primary" />
            <span className="text-xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              ChatMate
            </span>
          </Link>
          
          <div className="avatar">
            <div className="w-9 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Sidebar;
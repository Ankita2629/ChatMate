import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Menu, X } from "lucide-react";

const Layout = ({ children, showSidebar = false }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="flex h-screen overflow-hidden">
        {/* Desktop Sidebar - Hidden on mobile */}
        {showSidebar && (
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        )}

        {/* Mobile Sidebar - Overlay */}
        {showSidebar && isMobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
              onClick={toggleMobileSidebar}
            />
            
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 z-50 w-64 sm:w-72 lg:hidden transform transition-transform duration-300 ease-in-out">
              <Sidebar />
              
              {/* Close button */}
              <button
                onClick={toggleMobileSidebar}
                className="absolute top-4 right-4 btn btn-ghost btn-circle btn-sm bg-base-200/80 backdrop-blur-sm"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Mobile Menu Button */}
          {showSidebar && (
            <div className="lg:hidden fixed bottom-6 right-6 z-30">
              <button
                onClick={toggleMobileSidebar}
                className="btn btn-primary btn-circle shadow-xl hover:shadow-2xl transition-all duration-300 w-14 h-14"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          )}

          <Navbar />

          {/* Main content with proper scrolling */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="min-h-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Info,
  Calendar,
  FileText,
  Users,
  PhoneCall,
  Menu,
  X,
  Image,
  Map,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { name: "Home", icon: Home, path: "/" },
  { name: "About", icon: Info, path: "/about" },
  { name: "Schedule", icon: Calendar, path: "/schedule" },
  { name: "Road Map", icon: Map, path: "/roadmap" },
  { name: "Guidelines", icon: FileText, path: "/guidelines" },
  { name: "Gallery", icon: Image, path: "/gallery" },
  { name: "Winners", icon:Award , path: "/speakers" },
  { name: "Contact", icon: PhoneCall, path: "/contact" },
];

export function Navbar({ activeSection, onSectionChange }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string, name: string) => {
    navigate(path);
    onSectionChange(name);
    setIsMenuOpen(false);
  };

  const renderMenuButton = (item: typeof menuItems[0]) => (
    <button
      key={item.name}
      onClick={() => handleNavigation(item.path, item.name)}
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
        location.pathname === item.path
          ? "text-red-800 bg-red-50"
          : "text-gray-600 hover:text-red-800 hover:bg-red-50"
      }`}
    >
      <item.icon className="w-4 h-4 mr-2" />
      {item.name}
    </button>
  );

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo / Site Name */}
          <div className="text-xl font-bold font-tamil text-red-800 tracking-wide">
  சிந்தனை சிற்பி
</div>


          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2 items-center">
            {menuItems.map(renderMenuButton)}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-red-800 hover:bg-red-50 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pb-4 space-y-1">
                {menuItems.map(renderMenuButton)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

import type React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold tracking-wide">
          Personal Finance Management
        </h1>
      </div>
    </header>
  );
};

export default Header;

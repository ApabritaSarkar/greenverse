import React from 'react';

const LogoutButton = ({ handleLogout }) => {
  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 font-semibold text-lg flex items-center space-x-2"
      >
        <span>Logout</span>
      </button>
    </div>
  );
};

export default LogoutButton;

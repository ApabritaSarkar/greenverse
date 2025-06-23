import React from 'react';
import { User, Mail, Calendar, Sprout } from 'lucide-react';

const UserInfo = ({ user }) => {
  return (
    <div className="bg-eco-beige bg-opacity-50 p-6 rounded-lg shadow-inner border border-eco-lightgreen">
      <div className="flex justify-between items-center mb-4 border-b pb-3 border-eco-lightgreen">
        <h2 className="text-2xl font-semibold text-eco-dark font-inter">User Information</h2>
      </div>

      <div className="text-center">
        <img 
          src={user.profilePicture} 
          alt="Profile" 
          className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-eco-lightgreen shadow-md"
        />
        <h3 className="text-3xl font-bold text-eco-dark mb-2 font-inter">{user.username}</h3>
        <p className="text-gray-600 mb-4">{user.email}</p>

        <div className="max-w-2xl mx-auto text-left space-y-3 mt-8">
          <p className="text-lg flex items-center space-x-2">
            <User size={20} className="text-eco-green" />
            <span className="font-semibold text-eco-green">Username:</span> 
            <span className="text-gray-700">{user.username}</span>
          </p>
          <p className="text-lg flex items-center space-x-2">
            <Mail size={20} className="text-eco-green" />
            <span className="font-semibold text-eco-green">Email:</span> 
            <span className="text-gray-700">{user.email}</span>
          </p>
          <p className="text-lg flex items-center space-x-2">
            <Calendar size={20} className="text-eco-green" />
            <span className="font-semibold text-eco-green">Member Since:</span> 
            <span className="text-gray-700">{user.memberSince}</span>
          </p>
          <p className="text-lg flex items-center space-x-2">
            <Sprout size={20} className="text-eco-green" />
            <span className="font-semibold text-eco-green">Plants Owned:</span> 
            <span className="text-gray-700">{user.plantsOwned}</span>
          </p>
          <p className="text-lg flex items-center space-x-2">
            <span className="font-semibold text-eco-green">Bio:</span> 
            <span className="text-gray-700">{user.bio}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

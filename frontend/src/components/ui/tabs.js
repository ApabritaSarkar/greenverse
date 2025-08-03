import React from 'react';

export const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <div className="tabs">
      {React.Children.map(children, child => 
        React.cloneElement(child, { activeTab, onTabChange: setActiveTab })
      )}
    </div>
  );
};

export const TabsList = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="flex border-b border-gray-200">
      {React.Children.map(children, child => 
        React.cloneElement(child, { activeTab, onTabChange })
      )}
    </div>
  );
};

export const TabsTrigger = ({ value, children, activeTab, onTabChange }) => {
  return (
    <button
      onClick={() => onTabChange(value)}
      className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
        activeTab === value
          ? 'border-eco-green text-eco-green'
          : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children, activeTab }) => {
  if (activeTab !== value) return null;
  return <div className="py-4">{children}</div>;
};
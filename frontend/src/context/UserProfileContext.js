import React, { createContext, useContext, useState } from 'react';

const UserProfileContext = createContext();

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within UserProfileProvider');
  }
  return context;
};

export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    role: '',
    objectives: [],
    companySize: '',
    industry: '',
    goToMarket: '',
    teamSize: ''
  });

  const updateProfile = (updates) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const resetProfile = () => {
    setUserProfile({
      role: '',
      objectives: [],
      companySize: '',
      industry: '',
      goToMarket: '',
      teamSize: ''
    });
  };

  return (
    <UserProfileContext.Provider value={{ userProfile, updateProfile, resetProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

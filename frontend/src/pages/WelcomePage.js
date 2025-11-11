import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, User, Users, Briefcase } from 'lucide-react';

const WelcomePage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: 'traveler',
      name: 'Traveler',
      icon: User,
      description: 'Exploring marketing capabilities',
      subtitle: 'Individual contributor or team member',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'pilot',
      name: 'Pilot',
      icon: Plane,
      description: 'Leading the marketing mission',
      subtitle: 'CMO, VP Marketing, or Marketing Director',
      color: 'from-cyan-600 to-blue-600'
    },
    {
      id: 'crew',
      name: 'Crew',
      icon: Users,
      description: 'Operating marketing functions',
      subtitle: 'Marketing Manager or Specialist',
      color: 'from-blue-600 to-purple-600'
    }
  ];

  const handleStart = () => {
    if (selectedRole) {
      // Save role to localStorage
      localStorage.setItem('user_role', selectedRole);
      navigate('/assessment');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Plane className="w-12 h-12 text-cyan-400" />
            <h1 className="text-5xl font-bold text-white">Marketing Journey 360</h1>
          </div>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Transform your marketing strategy into a global adventure
          </p>
          <p className="text-blue-300">
            Choose your role to begin your journey
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`relative p-8 rounded-xl transition-all transform hover:scale-105 ${
                  isSelected
                    ? 'bg-gradient-to-br ' + role.color + ' border-2 border-cyan-400 shadow-2xl shadow-cyan-500/50'
                    : 'bg-slate-900/50 border-2 border-blue-900/30 hover:border-cyan-500/50'
                }`}
              >
                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 rounded-full bg-cyan-400 flex items-center justify-center">
                      <svg className="w-4 h-4 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}

                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                    isSelected ? 'bg-white/20' : 'bg-blue-600/20'
                  }`}>
                    <Icon className={`w-10 h-10 ${isSelected ? 'text-white' : 'text-cyan-400'}`} />
                  </div>
                  
                  <div>
                    <h3 className={`text-2xl font-bold mb-2 ${isSelected ? 'text-white' : 'text-white'}`}>
                      {role.name}
                    </h3>
                    <p className={`text-sm mb-1 ${isSelected ? 'text-blue-100' : 'text-blue-300'}`}>
                      {role.description}
                    </p>
                    <p className={`text-xs ${isSelected ? 'text-blue-200' : 'text-blue-400'}`}>
                      {role.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={handleStart}
            disabled={!selectedRole}
            className={`px-12 py-4 rounded-lg font-semibold text-lg transition-all flex items-center gap-3 mx-auto ${
              selectedRole
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-cyan-500/50 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            Begin Your Flight
            <Plane className="w-5 h-5" />
          </button>
          
          {!selectedRole && (
            <p className="text-sm text-blue-400 mt-4">Please select your role to continue</p>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-blue-400 text-sm">
          <p>Visualizing marketing readiness as a global journey</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;

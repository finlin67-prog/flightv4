import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const DropdownSelect = ({ 
  value, 
  onChange, 
  options, 
  placeholder = "Select...", 
  icon: Icon,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-lg text-left flex items-center justify-between transition-all border-2 ${
          isOpen
            ? 'bg-slate-800/70 border-cyan-500 shadow-lg shadow-cyan-500/20'
            : value
            ? 'bg-slate-800/50 border-slate-600 hover:border-cyan-600/50'
            : 'bg-slate-800/30 border-slate-700 hover:border-cyan-600/50'
        }`}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
          <span className={value ? 'text-white font-medium' : 'text-blue-300'}>
            {value || placeholder}
          </span>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-cyan-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-slate-800 border-2 border-cyan-500/50 rounded-lg shadow-2xl shadow-cyan-500/20 max-h-64 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`w-full px-4 py-3 text-left transition-all ${
                value === option
                  ? 'bg-cyan-600 text-white font-semibold'
                  : 'text-blue-200 hover:bg-slate-700 hover:text-white'
              } ${
                option === options[options.length - 1] ? '' : 'border-b border-slate-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;

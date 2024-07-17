import React, { useState, useRef, useEffect } from "react";

export const DropdownMenu = ({
  options,
  onSelect,
  placeholder = "Select an option",
}: {
  options: string[];
  onSelect: (option: string) => void;
  placeholder?: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleOptionClick = (index: any) => {
    setSelectedIndex(index);
    onSelect(options[index]);
    setIsOpen(false);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block w-max">
      <div
        className="dropdown-trigger"
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={handleToggle}
      >
        {selectedIndex !== null ? options[selectedIndex] : placeholder}
      </div>
      {isOpen && (
        <ul className="dropdown-menu" role="listbox">
          {options.map((option, index) => (
            <li
              key={option}
              role="option"
              aria-selected={selectedIndex === index}
              className="dropdown-item"
              onClick={() => handleOptionClick(index)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};



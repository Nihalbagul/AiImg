import React from 'react';
import { FaFire, FaCalendarDay, FaPaw, FaStar, FaTshirt, FaUtensils, FaMountain, FaRocket, FaCar, FaUserAlt } from 'react-icons/fa';

const tabIcons = {
  Rising: <FaFire className="text-2xl" />,
  DailyTheme: <FaCalendarDay className="text-2xl" />,
  Animals: <FaPaw className="text-2xl" />,
  Anime: <FaStar className="text-2xl" />, // No Anime icon, using Star as an alternative
  Fashion: <FaTshirt className="text-2xl" />,
  Food: <FaUtensils className="text-2xl" />,
  Landscapes: <FaMountain className="text-2xl" />,
  SciFi: <FaRocket className="text-2xl" />, // No SciFi icon, using Rocket as an alternative
  Vehicles: <FaCar className="text-2xl" />,
  MyFeed: <FaUserAlt className="text-2xl" />, // No Feed icon, using User as an alternative
};

const SecondaryNavbar = ({ selectedTab, onSelectTab }) => {
  return (
    <div className="flex justify-center items-center bg-black p-2 rounded-full shadow-lg mb-8">
      <div className="flex flex-wrap gap-4 bg-gray-800 rounded-full p-1 shadow-lg border border-gray-700">
        {Object.keys(tabIcons).map(tab => (
          <button
            key={tab}
            className={`flex flex-col items-center px-6 py-3 rounded-full transition-transform duration-300 ease-in-out
                        ${selectedTab === tab ?
                          'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-xl transform scale-110' :
                          'bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 border border-gray-600 shadow-md hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'}`}
            onClick={() => onSelectTab(tab)}
          >
            <div className={`transition-transform duration-300 ease-in-out ${selectedTab === tab ? 'rotate-12 scale-125' : 'rotate-0 scale-100'}`}>
              {tabIcons[tab]}
            </div>
            <span className={`mt-2 text-sm font-medium ${selectedTab === tab ? 'text-white' : 'text-gray-300'}`}>{tab}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SecondaryNavbar;

"use client";
// pages/explore.jsx
import React, { useState } from 'react';
import SecondaryNavbar from '../components/SecondaryNavbar';

const ExplorePage = () => {
  const [selectedTab, setSelectedTab] = useState('Rising');

  // Define images for all 10 tabs
  const images = {
    Rising: [
      '/image/1.jpeg', '/image/2.jpeg', '/image/3.jpeg', 
      '/image/4.png', '/image/5.png', '/image/6.png', 
      '/image/1.jpeg', '/image/1.jpeg', '/image/3.jpeg'
    ],
    DailyTheme: ['/image/3.jpeg', '/image/4.png'],
    Animals: ['/image/5.png', '/image/6.png'],
    Anime: ['/image/7.jpeg', '/image/8.jpeg'],
    Fashion: ['/image/9.png', '/image/10.png'],
    Food: ['/image/11.jpeg', '/image/12.jpeg'],
    Landscapes: ['/image/13.png', '/image/14.png'],
    SciFi: ['/image/15.jpeg', '/image/16.jpeg'],
    Vehicles: ['/image/17.png', '/image/18.png'],
    MyFeed: ['/image/19.jpeg', '/image/20.jpeg'],
  };

  // Render images based on the selected tab
  const renderImages = () => {
    const currentImages = images[selectedTab] || [];
    return currentImages.map((img, index) => (
      <div 
        key={index} 
        className="mb-2"
        style={{ breakInside: 'avoid' }}
      >
        <img 
          src={img} 
          alt={`Tab ${selectedTab} Image ${index + 1}`} 
          className="w-full h-auto object-cover rounded-xl shadow-lg transition-transform transform hover:scale-110"
        />
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center p-2 bg-black min-h-screen text-white">
      <SecondaryNavbar selectedTab={selectedTab} onSelectTab={setSelectedTab} />
      <div 
        className="w-full columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 mt-4"
        style={{ columnGap: '1rem' }}
      >
        {renderImages()}
      </div>
    </div>
  );
};

export default ExplorePage;

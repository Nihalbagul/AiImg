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
      '/image/7.png', '/image/8.png', '/image/9.jpeg',
      '/image/10.jpeg', '/image/11.png', '/image/12.png',
      '/image/13.png', '/image/14.png', '/image/15.png',
      '/image/16.png', '/image/17.jpg', '/image/18.jpeg',
      '/image/19.png', '/image/20.png'
    ],
    DailyTheme: [
      '/image/4.png', '/image/2.jpeg', '/image/7.png',
      '/image/13.png', '/image/19.png', '/image/15.jpeg',
      '/image/11.png', '/image/18.jpeg', '/image/9.jpeg',
      '/image/3.jpeg', '/image/12.png', '/image/10.jpeg',
      '/image/14.png', '/image/16.png', '/image/5.png',
      '/image/6.png', '/image/8.png', '/image/1.jpeg',
      '/image/20.png', '/image/17.jpg'
    ],
    Animals: [
      '/image/6.png', '/image/1.jpeg', '/image/17.jpg',
      '/image/11.png', '/image/19.png', '/image/13.png',
      '/image/5.png', '/image/15.jpeg', '/image/10.jpeg',
      '/image/18.jpeg', '/image/3.jpeg', '/image/20.png',
      '/image/14.png', '/image/8.png', '/image/4.png',
      '/image/7.png', '/image/12.png', '/image/2.jpeg',
      '/image/16.png', '/image/9.jpeg'
    ],
    Anime: [
      '/image/2.jpeg', '/image/11.png', '/image/19.png',
      '/image/6.png', '/image/16.png', '/image/13.png',
      '/image/18.jpeg', '/image/8.png', '/image/4.png',
      '/image/15.jpeg', '/image/1.jpeg', '/image/14.png',
      '/image/10.jpeg', '/image/5.png', '/image/20.png',
      '/image/12.png', '/image/3.jpeg', '/image/7.png',
      '/image/9.jpeg', '/image/17.jpg'
    ],
    Fashion: [
      '/image/8.png', '/image/13.png', '/image/10.jpeg',
      '/image/19.png', '/image/7.png', '/image/15.jpeg',
      '/image/12.png', '/image/16.png', '/image/5.png',
      '/image/20.png', '/image/1.jpeg', '/image/18.jpeg',
      '/image/4.png', '/image/11.png', '/image/6.png',
      '/image/14.png', '/image/3.jpeg', '/image/9.jpeg',
      '/image/17.jpg', '/image/2.jpeg'
    ],
    Food: [
      '/image/7.png', '/image/11.png', '/image/3.jpeg',
      '/image/16.png', '/image/12.png', '/image/19.png',
      '/image/14.png', '/image/1.jpeg', '/image/5.png',
      '/image/6.png', '/image/10.jpeg', '/image/17.jpg',
      '/image/18.jpeg', '/image/20.png', '/image/15.jpeg',
      '/image/9.jpeg', '/image/2.jpeg', '/image/8.png',
      '/image/13.png', '/image/4.png'
    ],
    Landscapes: [
      '/image/14.png', '/image/2.jpeg', '/image/5.png',
      '/image/8.png', '/image/15.jpeg', '/image/12.png',
      '/image/1.jpeg', '/image/17.jpg', '/image/13.png',
      '/image/16.png', '/image/11.png', '/image/6.png',
      '/image/10.jpeg', '/image/4.png', '/image/18.jpeg',
      '/image/19.png', '/image/9.jpeg', '/image/20.png',
      '/image/7.png', '/image/3.jpeg'
    ],
    SciFi: [
      '/image/17.jpg', '/image/12.png', '/image/4.png',
      '/image/1.jpeg', '/image/6.png', '/image/14.png',
      '/image/16.png', '/image/3.jpeg', '/image/19.png',
      '/image/15.jpeg', '/image/13.png', '/image/10.jpeg',
      '/image/7.png', '/image/2.jpeg', '/image/8.png',
      '/image/18.jpeg', '/image/20.png', '/image/11.png',
      '/image/5.png', '/image/9.jpeg'
    ],
    Vehicles: [
      '/image/15.jpeg', '/image/17.jpg', '/image/11.png',
      '/image/19.png', '/image/1.jpeg', '/image/6.png',
      '/image/10.jpeg', '/image/13.png', '/image/4.png',
      '/image/18.jpeg', '/image/14.png', '/image/2.jpeg',
      '/image/20.png', '/image/12.png', '/image/7.png',
      '/image/8.png', '/image/16.png', '/image/9.jpeg',
      '/image/3.jpeg', '/image/5.png'
    ],
    MyFeed: [
      '/image/4.png', '/image/6.png', '/image/1.jpeg',
      '/image/12.png', '/image/19.png', '/image/13.png',
      '/image/10.jpeg', '/image/11.png', '/image/3.jpeg',
      '/image/7.png', '/image/17.jpg', '/image/8.png',
      '/image/16.png', '/image/20.png', '/image/2.jpeg',
      '/image/18.jpeg', '/image/5.png', '/image/14.png',
      '/image/15.jpeg', '/image/9.jpeg'
    ],
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

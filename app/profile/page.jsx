"use client";
import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { getUserGenerationHistory } from '../utils/kvutils';

const ProfilePage = () => {
  const { user } = UserAuth();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (user) {
        const userHistory = await getUserGenerationHistory(user.uid);
        setHistory(userHistory);
      }
    };

    fetchHistory();
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center p-4 bg-black min-h-screen text-white">
        <h1 className="text-3xl font-bold">Please log in to view your profile</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-2 bg-black min-h-screen text-white">
      {/* Display user profile image */}
      <div className="flex flex-col items-center mb-6">
        <img 
          src={user.photoURL || '/default-profile.png'} 
          alt="Profile Picture" 
          className="w-24 h-24 rounded-full border-2 border-gray-500 mb-2"
        />
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-xl mb-4">Welcome, {user.displayName}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Generation History</h2>
      <div 
        className="w-full columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 mt-4"
        style={{ columnGap: '1rem' }}
      >
        {history.length === 0 ? (
          <p>You haven't generated any images yet.</p>
        ) : (
          history.map((item, index) => (
            <div 
              key={index} 
              className="mb-4"
              style={{ breakInside: 'avoid' }}
            >
              <img 
                src={item.imageUrl} 
                alt={`Generated ${index}`} 
                className="w-full h-auto object-cover rounded-xl shadow-lg transition-transform transform hover:scale-110"
              />
              <p className="mt-2 text-center text-3d">{item.prompt}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

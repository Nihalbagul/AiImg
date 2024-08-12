// "use client"
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { UserAuth } from '../context/AuthContext';
// import { getGenerationHistory } from '../lib/ratelimit';
import React from 'react'

const page = () => {
  return (
    <div>
      profile
    </div>
  )
}

export default page

// const ProfilePage = () => {
//   const { user, logout } = UserAuth(); // Assuming you have a logout function in your Auth context
//   const router = useRouter();
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) {
//       router.push('/login'); // Redirect to login if the user is not authenticated
//     } else {
//       fetchHistory();
//     }
//   }, [user, router]);

//   const fetchHistory = async () => {
//     try {
//       const userHistory = await getGenerationHistory(user.uid);
//       setHistory(userHistory);
//     } catch (error) {
//       console.error('Error fetching history:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       router.push('/login');
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   if (loading) {
//     return <p className="text-center">Loading...</p>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">{user?.displayName}'s Profile</h1>
//         <button 
//           onClick={handleLogout} 
//           className="p-2 bg-red-500 text-white rounded"
//         >
//           Logout
//         </button>
//       </div>

//       <div className="mt-4">
//         <img 
//           src={user?.photoURL || '/default-profile.png'} // Fallback image if user doesn't have a photo
//           alt={user?.displayName}
//           className="w-32 h-32 rounded-full"
//         />
//         <p className="mt-2 text-gray-700">{user?.email}</p>
//       </div>

//       <h2 className="mt-8 text-xl font-semibold">Your Generated Images</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//         {history.length > 0 ? (
//           history.map((entry, idx) => (
//             <div key={idx} className="bg-white shadow p-4 rounded">
//               <p className="text-gray-700 font-medium">Prompt: {entry.prompt}</p>
//               <img 
//                 src={entry.image} 
//                 alt={`Generated ${idx}`} 
//                 className="mt-2 w-full h-48 object-cover rounded"
//               />
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-700">No images generated yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

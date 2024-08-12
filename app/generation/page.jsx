import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { checkRateLimit, updateRateLimit, saveGenerationHistory, getGenerationHistory } from '../lib/ratelimit';
import { useRouter } from 'next/router';

const GenerationPage = () => {
  const { user } = UserAuth();
  const router = useRouter();
  const [prompt, setPrompt] = useState(''); 
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState('');
  const images = ['/image/1.jpeg', '/image/2.jpeg']; 

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const generateImage = async () => {
    setError('');

    if (prompt.trim() === '') {
      alert('Please enter a prompt to generate an image.');
      return;
    }

    const isAllowed = await checkRateLimit(user.uid);
    if (!isAllowed) {
      setError('You have reached the limit of 3 generations per hour.');
      return;
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];
    setGeneratedImage(randomImage);

    await updateRateLimit(user.uid);
    await saveGenerationHistory(user.uid, prompt, randomImage);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-2xl font-bold">Generate an AI Image</h1>

      <input 
        type="text" 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)} 
        placeholder="Enter your prompt here..." 
        className="mt-4 p-2 border rounded w-full max-w-md text-black bg-white placeholder-gray-500"
      />

      <button 
        onClick={generateImage} 
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Generate
      </button>

      {error && (
        <p className="mt-2 text-red-500">{error}</p>
      )}
      
      {generatedImage && (
        <img 
          src={generatedImage} 
          alt="Generated" 
          className="mt-4 w-full max-w-xs h-auto"
        />
      )}
    </div>
  );
};

export default GenerationPage;

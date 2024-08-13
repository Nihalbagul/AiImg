"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserAuth } from '../context/AuthContext';
import { canGenerateImage, updateUserRateLimit, saveGenerationToKV } from '../utils/kvutils';

const GenerationPage = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#ff0000');
  const [brushSize, setBrushSize] = useState(5);
  const [isErasing, setIsErasing] = useState(false);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const { user } = UserAuth();
  const router = useRouter();

  const preDownloadedImages = [
    '/image/1.jpeg', '/image/2.jpeg', '/image/3.jpeg',
    '/image/4.png', '/image/5.png', '/image/6.png'
  ];

  const handleGenerate = async () => {
    if (!user) {
      alert('You must be logged in to generate images');
      router.push('/login');
      return;
    }

    // Check if the user can generate an image
    const canGenerate = await canGenerateImage(user.uid);
    if (!canGenerate) {
      alert('Rate limit exceeded. You can only generate 3 images per hour.');
      return;
    }

    // Pick a random image
    const randomImage = preDownloadedImages[Math.floor(Math.random() * preDownloadedImages.length)];
    setGeneratedImage(randomImage);

    // Update rate limit and save generation to KV
    await updateUserRateLimit(user.uid);
    await saveGenerationToKV(user.uid, prompt, randomImage);
  };

  useEffect(() => {
    if (canvasRef.current && generatedImage) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctxRef.current = ctx;

      const img = new Image();
      img.src = generatedImage;
      img.onload = () => {
        const maxWidth = 400; // Reduced size width
        const ratio = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * ratio; // Adjust height to maintain aspect ratio
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }
  }, [generatedImage]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.strokeStyle = isErasing ? '#FFFFFF' : brushColor;
    ctxRef.current.lineWidth = brushSize;
    ctxRef.current.stroke();
  };

  const toggleEraser = () => {
    setIsErasing(!isErasing);
  };

  const clearCanvas = () => {
    if (generatedImage) {
      const img = new Image();
      img.src = generatedImage;
      img.onload = () => {
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctxRef.current.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
      };
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Generate Image</h1>
      <textarea
        className="w-full max-w-lg p-2 text-black rounded-md mb-4"
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Generate
      </button>

      {generatedImage && (
        <div className="mt-8 flex justify-center items-start space-x-8">
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="border-2 border-gray-700 rounded-lg"
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
          />

          {/* Tools */}
          <div className="flex flex-col space-y-4">
            <label className="flex items-center">
              <span className="mr-2">Brush Size:</span>
              <input
                type="range"
                min="1"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(e.target.value)}
                className="cursor-pointer"
              />
            </label>
            <label className="flex items-center">
              <span className="mr-2">Brush Color:</span>
              <input
                type="color"
                value={brushColor}
                onChange={(e) => setBrushColor(e.target.value)}
                className="cursor-pointer"
              />
            </label>
            <button
              onClick={toggleEraser}
              className={`px-4 py-2 ${isErasing ? 'bg-yellow-500' : 'bg-gray-500'} text-white rounded-md`}
            >
              {isErasing ? 'Eraser On' : 'Eraser Off'}
            </button>
            <button
              onClick={clearCanvas}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerationPage;

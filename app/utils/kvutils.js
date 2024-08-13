import { kv } from '@vercel/kv';
import { v4 as uuidv4 } from 'uuid';

// Helper function to ensure data is an object
const ensureObject = (data) => {
  if (typeof data === 'object' && data !== null) {
    return data;
  } else if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      console.error('Data that failed to parse:', data);
      return {};
    }
  } else {
    console.error('Data is not an object or string:', data);
    return {};
  }
};

// Helper function to ensure data is an array
const ensureArray = (data) => {
  if (Array.isArray(data)) {
    return data;
  } else if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      console.error('Data that failed to parse:', data);
      return [];
    }
  } else {
    console.error('Data is not an array or string:', data);
    return [];
  }
};

// Function to get the user's rate limit
export const getUserRateLimit = async (userId) => {
  try {
    const rateLimit = await kv.get(`rate-limit:${userId}`);
    console.log('Retrieved rateLimit:', rateLimit);
    // Ensure the data is valid JSON or return default
    return rateLimit ? ensureObject(rateLimit) : { count: 0, timestamp: Date.now() };
  } catch (error) {
    console.error('Error retrieving rateLimit:', error);
    return { count: 0, timestamp: Date.now() };
  }
};

// Function to update the user's rate limit
export const updateUserRateLimit = async (userId) => {
  try {
    let rateLimit = await getUserRateLimit(userId);
    console.log('Current rateLimit:', rateLimit);

    const currentTime = Date.now();
    if (currentTime - rateLimit.timestamp > 3600000) { // 1 hour = 3600000 ms
      rateLimit = { count: 0, timestamp: currentTime };
    }

    rateLimit.count += 1;
    console.log('Updated rateLimit:', rateLimit);
    await kv.set(`rate-limit:${userId}`, JSON.stringify(rateLimit));

    return rateLimit;
  } catch (error) {
    console.error('Error updating rateLimit:', error);
    throw error;
  }
};

// Function to check if the user can generate an image
export const canGenerateImage = async (userId) => {
  try {
    const rateLimit = await getUserRateLimit(userId);
    return rateLimit.count < 30;
  } catch (error) {
    console.error('Error checking rate limit:', error);
    return false;
  }
};

// Function to save a generation to KV
export const saveGenerationToKV = async (userId, prompt, imageUrl) => {
  try {
    const historyId = uuidv4();
    const historyItem = {
      id: historyId,
      userId,
      prompt,
      imageUrl,
      timestamp: Date.now(),
    };

    await kv.set(`history:${userId}:${historyId}`, JSON.stringify(historyItem));

    const userHistoryList = await kv.get(`history-list:${userId}`);
    console.log('Retrieved userHistoryList:', userHistoryList);
    const updatedList = ensureArray(userHistoryList);
    updatedList.push(historyId);
    await kv.set(`history-list:${userId}`, JSON.stringify(updatedList));
  } catch (error) {
    console.error('Error saving generation to KV:', error);
    throw error;
  }
};

// Function to get the user's generation history
export const getUserGenerationHistory = async (userId) => {
  try {
    const userHistoryList = await kv.get(`history-list:${userId}`);
    console.log('Retrieved userHistoryList:', userHistoryList);
    if (!userHistoryList) return [];

    const historyIds = ensureArray(userHistoryList);
    const historyItems = await Promise.all(
      historyIds.map(async (id) => {
        const item = await kv.get(`history:${userId}:${id}`);
        console.log('Retrieved history item:', item);
        return item ? ensureObject(item) : null;
      })
    );

    return historyItems.filter((item) => item !== null);
  } catch (error) {
    console.error('Error retrieving user generation history:', error);
    return [];
  }
};

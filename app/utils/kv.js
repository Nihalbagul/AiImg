import { kv } from '@vercel/kv';

export const getUserData = async (userId) => {
  return await kv.get(`user:${userId}`);
};

export const saveUserData = async (userId, data) => {
  return await kv.set(`user:${userId}`, data);
};

export const incrementUserGeneration = async (userId) => {
  const data = await getUserData(userId) || { count: 0, lastGenerated: Date.now() };
  if (Date.now() - data.lastGenerated > 3600000) {
    data.count = 0;  // Reset count after 1 hour
  }
  data.count += 1;
  data.lastGenerated = Date.now();
  await saveUserData(userId, data);
  return data.count;
};

export const canGenerate = async (userId) => {
  const data = await getUserData(userId);
  if (!data) return true;
  return data.count < 3;
};

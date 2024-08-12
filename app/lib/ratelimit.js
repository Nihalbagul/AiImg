// import { kv } from '@vercel/kv';

// /**
//  * Check if the user has reached the rate limit for generating images.
//  * 
//  * @param {string} userId - The unique identifier of the user.
//  * @returns {Promise<boolean>} - Returns true if the user can generate more images, false if the rate limit is reached.
//  */
// export async function checkRateLimit(userId) {
//   const key = `rate-limit-${userId}`;
//   const count = await kv.get(key);

//   // Allow up to 3 image generations per hour
//   if (count && count >= 3) {
//     return false;
//   }

//   return true;
// }

// /**
//  * Update the user's rate limit count after generating an image.
//  * 
//  * @param {string} userId - The unique identifier of the user.
//  * @returns {Promise<void>}
//  */
// export async function updateRateLimit(userId) {
//   const key = `rate-limit-${userId}`;
//   const count = await kv.incr(key);

//   // Set the expiration time to 1 hour (3600 seconds)
//   if (count === 1) {
//     await kv.expire(key, 3600); // Expire key after 1 hour
//   }
// }

// /**
//  * Log the generated image and prompt to the user's history.
//  * 
//  * @param {string} userId - The unique identifier of the user.
//  * @param {string} prompt - The prompt used to generate the image.
//  * @param {string} image - The URL or path of the generated image.
//  * @returns {Promise<void>}
//  */
// export async function saveGenerationHistory(userId, prompt, image) {
//   const historyKey = `history-${userId}`;
//   await kv.lpush(historyKey, JSON.stringify({ prompt, image })); // Save the generated image and prompt to history
// }

// /**
//  * Retrieve the user's generation history.
//  * 
//  * @param {string} userId - The unique identifier of the user.
//  * @returns {Promise<Array>} - Returns an array of objects containing prompt and image data.
//  */
// export async function getGenerationHistory(userId) {
//   const historyKey = `history-${userId}`;
//   const history = await kv.lrange(historyKey, 0, -1); // Fetch all history items

//   // Parse the JSON strings into objects
//   return history.map(item => JSON.parse(item)) || [];
// }

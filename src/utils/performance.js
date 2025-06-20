// Performance optimization utilities

/**
 * Memoize a function to cache its results based on input arguments
 * @param {Function} fn - The function to memoize
 * @returns {Function} - The memoized function
 */
export const memoize = (fn) => {
  const cache = new Map();
  
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

/**
 * Debounce a function to limit how often it can be called
 * @param {Function} fn - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} - The debounced function
 */
export const debounce = (fn, delay) => {
  let timeoutId;
  
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
};

/**
 * Throttle a function to limit how often it can be called
 * @param {Function} fn - The function to throttle
 * @param {number} limit - The limit in milliseconds
 * @returns {Function} - The throttled function
 */
export const throttle = (fn, limit) => {
  let lastCall = 0;
  
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      fn(...args);
      lastCall = now;
    }
  };
};

/**
 * Batch multiple updates into a single update
 * @param {Function} callback - The callback to execute with batched updates
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} - The batching function
 */
export const batchUpdates = (callback, delay = 100) => {
  let batch = [];
  let timeoutId;
  
  return (item) => {
    batch.push(item);
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      callback(batch);
      batch = [];
      timeoutId = null;
    }, delay);
  };
};

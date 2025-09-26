/**
 * Simple data storage and retrieval system
 * Implements basic "get" functionality
 */

class DataStore {
  constructor() {
    this.data = new Map();
  }

  /**
   * Set a value for a given key
   * @param {string} key - The key to store the value under
   * @param {any} value - The value to store
   */
  set(key, value) {
    this.data.set(key, value);
    return this;
  }

  /**
   * Get a value by key
   * @param {string} key - The key to retrieve the value for
   * @returns {any} The stored value or undefined if not found
   */
  get(key) {
    return this.data.get(key);
  }

  /**
   * Check if a key exists
   * @param {string} key - The key to check
   * @returns {boolean} True if the key exists, false otherwise
   */
  has(key) {
    return this.data.has(key);
  }

  /**
   * Get all keys
   * @returns {Array<string>} Array of all keys
   */
  keys() {
    return Array.from(this.data.keys());
  }

  /**
   * Get all values
   * @returns {Array<any>} Array of all values
   */
  values() {
    return Array.from(this.data.values());
  }

  /**
   * Get all entries as key-value pairs
   * @returns {Array<[string, any]>} Array of [key, value] pairs
   */
  entries() {
    return Array.from(this.data.entries());
  }

  /**
   * Clear all data
   */
  clear() {
    this.data.clear();
  }

  /**
   * Get the size of the data store
   * @returns {number} Number of stored items
   */
  size() {
    return this.data.size;
  }
}

// Create a default instance
const store = new DataStore();

// Example usage
if (require.main === module) {
  console.log('Data Store Example:');
  
  // Set some example data
  store.set('name', 'John Doe');
  store.set('age', 30);
  store.set('city', 'New York');
  
  // Demonstrate get functionality
  console.log('Getting name:', store.get('name'));
  console.log('Getting age:', store.get('age'));
  console.log('Getting city:', store.get('city'));
  console.log('Getting non-existent key:', store.get('country'));
  
  console.log('\nAll keys:', store.keys());
  console.log('All values:', store.values());
  console.log('Store size:', store.size());
}

module.exports = { DataStore, store };
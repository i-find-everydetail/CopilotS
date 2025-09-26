# as
cuddly-doodle

A simple data storage and retrieval system with **get** functionality.

## Features

- **Get** values by key
- Store and retrieve different data types (strings, numbers, booleans, objects, arrays)
- Check if keys exist
- Get all keys, values, or entries
- Clear the data store
- Get the size of the data store

## Usage

```javascript
const { DataStore } = require('./index.js');

// Create a new data store
const store = new DataStore();

// Set some data
store.set('name', 'John Doe');
store.set('age', 30);
store.set('city', 'New York');

// Get data
console.log(store.get('name')); // 'John Doe'
console.log(store.get('age'));  // 30
console.log(store.get('city')); // 'New York'
console.log(store.get('country')); // undefined

// Check if key exists
console.log(store.has('name')); // true
console.log(store.has('country')); // false

// Get all keys
console.log(store.keys()); // ['name', 'age', 'city']

// Get store size
console.log(store.size()); // 3
```

## Running the Example

```bash
node index.js
```

## Running Tests

```bash
npm test
```

## Command Line Interface

The project includes a CLI for interactive demonstration of the get functionality:

```bash
# Show help
npm run cli help

# Get a value
npm run cli get greeting

# Set a value (note: not persistent between CLI calls)
npm run cli set name "John Doe"

# Check if key exists
npm run cli has greeting

# List all keys
npm run cli keys

# List all values
npm run cli values

# Show store size
npm run cli size
```

## API

### `get(key)`
Retrieve a value by its key.
- **key**: The key to look up
- **Returns**: The stored value or `undefined` if not found

### `set(key, value)`
Store a value under a given key.
- **key**: The key to store under
- **value**: The value to store
- **Returns**: The DataStore instance (for chaining)

### `has(key)`
Check if a key exists in the store.
- **key**: The key to check
- **Returns**: `true` if key exists, `false` otherwise

### `keys()`
Get all keys in the store.
- **Returns**: Array of all keys

### `values()`
Get all values in the store.
- **Returns**: Array of all values

### `entries()`
Get all key-value pairs.
- **Returns**: Array of `[key, value]` pairs

### `clear()`
Remove all data from the store.

### `size()`
Get the number of items in the store.
- **Returns**: Number of stored items

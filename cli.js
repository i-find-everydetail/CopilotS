#!/usr/bin/env node

/**
 * Command-line interface for the DataStore get functionality
 * Usage: node cli.js <command> [args...]
 */

const { DataStore } = require('./index.js');

// Create a persistent store for the CLI session
const store = new DataStore();

// Pre-populate with some example data
store.set('greeting', 'Hello, World!');
store.set('version', '1.0.0');
store.set('author', 'DataStore CLI');
store.set('features', ['get', 'set', 'has', 'keys', 'values']);

function showHelp() {
  console.log(`
DataStore CLI - Demonstrates get functionality

Usage: node cli.js <command> [args...]

Commands:
  get <key>           Get a value by key
  set <key> <value>   Set a value for a key
  has <key>           Check if a key exists
  keys                List all keys
  values              List all values
  size                Show the number of stored items
  clear               Clear all data
  help                Show this help message

Examples:
  node cli.js get greeting
  node cli.js set name "John Doe"
  node cli.js has greeting
  node cli.js keys
  node cli.js values
`);
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    showHelp();
    return;
  }

  const command = args[0].toLowerCase();

  switch (command) {
    case 'get':
      if (args.length < 2) {
        console.log('Error: get command requires a key');
        console.log('Usage: node cli.js get <key>');
        return;
      }
      const value = store.get(args[1]);
      if (value === undefined) {
        console.log(`Key "${args[1]}" not found`);
      } else {
        console.log(typeof value === 'object' ? JSON.stringify(value, null, 2) : value);
      }
      break;

    case 'set':
      if (args.length < 3) {
        console.log('Error: set command requires a key and value');
        console.log('Usage: node cli.js set <key> <value>');
        return;
      }
      let setValue = args[2];
      // Try to parse as JSON for objects/arrays
      try {
        setValue = JSON.parse(setValue);
      } catch (e) {
        // Keep as string if not valid JSON
      }
      store.set(args[1], setValue);
      console.log(`Set "${args[1]}" = ${typeof setValue === 'object' ? JSON.stringify(setValue) : setValue}`);
      break;

    case 'has':
      if (args.length < 2) {
        console.log('Error: has command requires a key');
        console.log('Usage: node cli.js has <key>');
        return;
      }
      console.log(store.has(args[1]));
      break;

    case 'keys':
      const keys = store.keys();
      if (keys.length === 0) {
        console.log('No keys stored');
      } else {
        console.log('Keys:', keys.join(', '));
      }
      break;

    case 'values':
      const values = store.values();
      if (values.length === 0) {
        console.log('No values stored');
      } else {
        console.log('Values:');
        values.forEach((value, index) => {
          console.log(`  [${index}]`, typeof value === 'object' ? JSON.stringify(value) : value);
        });
      }
      break;

    case 'size':
      console.log(`Store contains ${store.size()} item(s)`);
      break;

    case 'clear':
      store.clear();
      console.log('Store cleared');
      break;

    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;

    default:
      console.log(`Unknown command: ${command}`);
      showHelp();
      break;
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
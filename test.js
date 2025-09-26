/**
 * Simple test suite for the DataStore get functionality
 */

const { DataStore } = require('./index.js');

function test(description, testFn) {
  try {
    testFn();
    console.log(`✓ ${description}`);
  } catch (error) {
    console.log(`✗ ${description}`);
    console.log(`  Error: ${error.message}`);
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${expected}, got ${actual}`);
  }
}

function assertUndefined(actual, message) {
  if (actual !== undefined) {
    throw new Error(`${message}: expected undefined, got ${actual}`);
  }
}

function assertArrayEqual(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${message}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

console.log('Running tests for DataStore get functionality...\n');

// Test basic get functionality
test('should get a value that was set', () => {
  const store = new DataStore();
  store.set('test', 'value');
  assertEqual(store.get('test'), 'value', 'Get should return the set value');
});

test('should return undefined for non-existent key', () => {
  const store = new DataStore();
  assertUndefined(store.get('nonexistent'), 'Get should return undefined for non-existent key');
});

test('should handle different data types', () => {
  const store = new DataStore();
  store.set('string', 'hello');
  store.set('number', 42);
  store.set('boolean', true);
  store.set('object', { name: 'test' });
  store.set('array', [1, 2, 3]);
  
  assertEqual(store.get('string'), 'hello', 'Should handle strings');
  assertEqual(store.get('number'), 42, 'Should handle numbers');
  assertEqual(store.get('boolean'), true, 'Should handle booleans');
  assertEqual(JSON.stringify(store.get('object')), JSON.stringify({ name: 'test' }), 'Should handle objects');
  assertEqual(JSON.stringify(store.get('array')), JSON.stringify([1, 2, 3]), 'Should handle arrays');
});

test('should check if key exists', () => {
  const store = new DataStore();
  store.set('exists', 'value');
  
  assertEqual(store.has('exists'), true, 'Should return true for existing key');
  assertEqual(store.has('notexists'), false, 'Should return false for non-existing key');
});

test('should get all keys', () => {
  const store = new DataStore();
  store.set('a', 1);
  store.set('b', 2);
  store.set('c', 3);
  
  const keys = store.keys().sort();
  assertArrayEqual(keys, ['a', 'b', 'c'], 'Should return all keys');
});

test('should get all values', () => {
  const store = new DataStore();
  store.set('a', 1);
  store.set('b', 2);
  store.set('c', 3);
  
  const values = store.values().sort();
  assertArrayEqual(values, [1, 2, 3], 'Should return all values');
});

test('should get correct size', () => {
  const store = new DataStore();
  assertEqual(store.size(), 0, 'Empty store should have size 0');
  
  store.set('a', 1);
  assertEqual(store.size(), 1, 'Store with one item should have size 1');
  
  store.set('b', 2);
  store.set('c', 3);
  assertEqual(store.size(), 3, 'Store with three items should have size 3');
});

test('should handle overwriting values', () => {
  const store = new DataStore();
  store.set('key', 'original');
  assertEqual(store.get('key'), 'original', 'Should get original value');
  
  store.set('key', 'updated');
  assertEqual(store.get('key'), 'updated', 'Should get updated value');
  assertEqual(store.size(), 1, 'Size should remain 1 after overwrite');
});

test('should clear all data', () => {
  const store = new DataStore();
  store.set('a', 1);
  store.set('b', 2);
  
  store.clear();
  assertEqual(store.size(), 0, 'Size should be 0 after clear');
  assertUndefined(store.get('a'), 'Should not find key after clear');
  assertUndefined(store.get('b'), 'Should not find key after clear');
});

console.log('\nAll tests completed!');
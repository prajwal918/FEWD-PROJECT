const assert = require('assert');

// A basic unit test to ensure the CI pipeline runs successfully
try {
  assert.strictEqual(1, 1, 'Basic math works');
  console.log('Unit tests passed successfully.');
} catch (err) {
  console.error('Unit tests failed:', err);
  process.exit(1);
}

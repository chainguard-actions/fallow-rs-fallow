/**
 * Greet a person by name.
 * @param {string} name
 * @returns {string}
 */
function greet(name) {
  return `Hello, ${name}!`;
}

// This export is unused - intentional for dead-code testing
function unusedHelper() {
  return 'unused';
}

module.exports = { greet, unusedHelper };

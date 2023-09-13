// Import node-fetch and configure it
const fetch = require('node-fetch');
global.fetch = fetch;

// Import Vue Test Utils and your Vue component
// import { shallowMount } from '@vue/test-utils';
import { formatPopulation } from '../../src/components/InfoCollection.vue';

// Your test code
describe('formatPopulation function', () => {
  it('should convert population to a formatted version', () => {

    // Call the formatPopulation method and test the result
    const result = formatPopulation('1000000');
    expect(result).toBe('1,000,000');
  });

  // Add more test cases for other methods or component behavior as needed
});

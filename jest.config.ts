export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest', // For Vue files
    '^.+\\.tsx?$': 'ts-jest' // For TypeScript files
  },
  moduleFileExtensions: ['ts', 'js', 'vue']
}

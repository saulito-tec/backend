// eslint.config.js
import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier'

export default [
  {
    ignores: ['node_modules', 'dist', 'build'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
        console: 'readonly',
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      prettier,
    },
    rules: {
      semi: ['warn', 'never'],
      quotes: ['warn', 'single'],
      'no-unused-vars': ['warn'],
      'no-console': ['warn', { allow: ['error', 'warn'] }],
      'prettier/prettier': 'warn',
    },
  },
]
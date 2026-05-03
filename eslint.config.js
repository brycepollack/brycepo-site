import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'node_modules', '.astro']),
  ...astro.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js}'],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]);

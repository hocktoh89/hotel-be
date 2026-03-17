import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import n from 'eslint-plugin-n';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  // global ignores
  globalIgnores(['**/dist/**']),
  // linting rules (code quality only)
  {
    files: ['**/*.{ts,tsx}'],
    // ignores: ["./prisma/generated/**/*", "./frontend/**/*"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      n,
    },
    rules: {
      // code quality / correctness
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-console': 'warn',
      'no-extra-boolean-cast': 'off',
      'no-process-env': 'warn',
      // node correctness
      'n/no-extraneous-import': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off'
    },
  },
  // MUST be last — disables ALL formatting rules
  eslintConfigPrettier,
]);

import {includeIgnoreFile} from '@eslint/compat'
import oclif from 'eslint-config-oclif'
import prettier from 'eslint-config-prettier'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const gitignorePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '.gitignore')

export default [
  includeIgnoreFile(gitignorePath),
  ...oclif,
  prettier,
  {
    languageOptions: {
      globals: {
        BufferEncoding: 'readonly',
      },
    },
    rules: {'jsdoc/no-undefined-types': 'off', 'unicorn/import-style': 1, 'unicorn/prefer-node-protocol': 0},
  },
  {
    files: ['test/fixtures/**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-useless-constructor': 'off',
      'n/no-extraneous-require': 'off',
      'unicorn/no-anonymous-default-export': 'off',
      'unicorn/prefer-module': 'off',
    },
  },
]

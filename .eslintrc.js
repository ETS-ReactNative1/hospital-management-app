module.exports = {
  root: true,
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  env: {
    jest: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'no-console': [1],
    'prefer-destructuring': [0],
    'react/forbid-prop-types': [0],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx']
      }
    ],
    'react/prefer-stateless-function': [0],
    'react/destructuring-assignment': [0],
    'react/prop-types': [0],
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
        variables: false
      }
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'none',
        singleQuote: true,
        printWidth: 100
      }
    ]
  },
  plugins: ['prettier']
};

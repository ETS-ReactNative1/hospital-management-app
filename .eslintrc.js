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
      jsx: true,
      experimentalObjectRestSpread: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'no-console': [0],
    'no-unused-vars': 1,
    'no-useless-rename': [1, { ignoreDestructuring: true }],
    'react/jsx-props-no-spreading': 0,
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
    'react/no-unused-state': [1],
    'react/sort-comp': 0,
    'react/jsx-fragments': 0,
    'import/no-extraneous-dependencies': 0,
    'import/order': 0,
    'spaced-comment': 0,
    'no-extend-native': 0,
    'no-underscore-dangle': [0],
    'no-shadow': 0,
    'no-unused-expressions': 0,
    'global-require': 0,
    'func-names': 0,
    'import/prefer-default-export': [0],
    'no-useless-escape': 0,
    'no-plusplus': 0,
    'no-case-declarations': 0,
    'no-use-before-define': [
      0,
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
  globals: {
    fetch: false
  },
  plugins: ['prettier'],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', '.'],
        extensions: ['.js', '.android.js', '.ios.js', '.web.js']
      }
    }
  }
};

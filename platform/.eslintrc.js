module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true
  },
  "extends": [
    "plugin:react/recommended",
    "eslint:recommended",
    "airbnb",
    "airbnb-typescript",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "globals": {
    "JSX": true
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "tsconfig.json",
    "tsconfigRootDir": __dirname,
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "warn",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "linebreak-style": 0,
    "react/jsx-filename-extension": [2,
      {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    ],
    "react/jsx-key": "off",
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react/no-unstable-nested-components": "off",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "no-nested-ternary": "off",
    "prettier/prettier": "warn",
    "jsx/no-implicit-any": "off",
    "react/function-component-definition": [2,
      {
        "namedComponents": "arrow-function",
        "unnamedComponents": "arrow-function"
      }
    ],
    "react/forbid-prop-types": "off",
    "lines-between-class-members": "off",
    "@typescript-eslint/lines-between-class-members": "off",
    "@typescript-eslint/ban-types": "warn",
    "no-param-reassign": ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  "ignorePatterns": ["node_modules/", "MockJsonServer/data/", "MockJsonServer/node_modules/"]
}

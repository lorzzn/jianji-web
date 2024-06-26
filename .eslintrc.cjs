module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs", "**/*.css", "**/*.scss", "src/statics", "./.env.*"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "@typescript-eslint"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "react-hooks/exhaustive-deps": "off",
    "no-extra-semi": "off",
  },
}

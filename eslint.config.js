import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import solid from "eslint-plugin-solid/configs/typescript";

export default tseslint.config(
  { ignores: ["dist/**", ".output/**", ".vite/**", "node_modules/**"] },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  solid,

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      "no-unassigned-vars": "off",
    },
  }
);
import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import nextEslint from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    ignores: [".next/**"],
  },
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@next/next/recommended"
  ),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "@next/next": nextEslint,
    },

    ignores: [".next/**", "next-env.d.ts"],

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      "@next/next/no-html-link-for-pages": "error",
      "no-console": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "no-unused-expressions": "error",
    },
  },
]);

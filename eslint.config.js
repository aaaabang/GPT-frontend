import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js, react: pluginReact },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      // 关闭 React 的 props validation 警告
      "react/prop-types": "off",
    },
  },
]);

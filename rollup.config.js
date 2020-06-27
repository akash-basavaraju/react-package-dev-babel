import babel from "@rollup/plugin-babel";
import styles from "rollup-plugin-styles";
import del from "rollup-plugin-delete";
import pkg from "./package.json";

export default {
  input: "./src/index.jsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
  ],
  external: [...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    del({ targets: "dist/*" }),
    babel({
      babelHelpers: "bundled",
      exclude: ["node_modules/**", "dev/**", "dist/**"],
      include: ["src/**.(js|jsx)"],
      extensions: [".js", ".jsx"],
      presets: ["@babel/preset-react", "@babel/preset-env"],
      babelrc: false,
    }),
    styles(),
  ],
};

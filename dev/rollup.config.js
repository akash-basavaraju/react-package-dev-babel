import babel from "@rollup/plugin-babel";
import styles from "rollup-plugin-styles";
import resolve from "@rollup/plugin-node-resolve";
import commonToES6 from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";

export default {
  input: "dev/index.jsx",
  output: {
    file: "dev/bundle/devBundle.js",
    format: "iife",
    name: "bundle",
    sourcemap: true,
  },
  watch: {
    include: ["src/*", "dev/*"],
    exclude: ["dev/bundle/*"],
  },
  plugins: [
    resolve({ extensions: [".js", ".jsx"] }),
    commonToES6({ include: "node_modules/**" }),
    replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
    styles(),
    babel({
      babelHelpers: "bundled",
      exclude: ["dist/**"],
      include: ["dev/**.(js|jsx)", "src/**.(js|jsx)"],
      extensions: [".js", ".jsx"],
      presets: ["@babel/preset-react"],
      babelrc: false,
    }),
    serve({ port: 5000, contentBase: ["dev"], verbose: true, open: true }),
  ],
};

import typescript from "rollup-plugin-typescript2";
import styles from "rollup-plugin-styles";
import resolve from "@rollup/plugin-node-resolve";
import commonToES6 from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";

export default {
  input: "./dev/index.tsx",
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
    resolve(),
    commonToES6({ include: "node_modules/**" }),
    replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
    styles(),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: false,
          outDir: "/dev",
          sourceMap: true,
        },
        include: ["dev/*"],
      },
    }),
    serve({ open: true, port: 5000, contentBase: ["dev"] }),
  ],
};

import typescript from "rollup-plugin-typescript2";
import styles from "rollup-plugin-styles";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import pkg from "./package.json";

export default {
  input: "./src/index.tsx",
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
    typescript(),
    styles(),
    copy({ targets: [{ src: "src/**/*.css", dest: "lib/" }] }),
  ],
};

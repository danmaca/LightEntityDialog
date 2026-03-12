import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/light-entity-dialog.ts",
  output: {
    file: "dist/light-entity-dialog.js",
    format: "es",
    sourcemap: true
  },
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false,
      extensions: [".js", ".ts"]
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json"
    }),
    terser()
  ]
};


import pkg from "./package.json";
import createConfig from "../../rollup.config";
import prepack from "rollup-plugin-prepack-up";

export default createConfig(pkg, base => ({
  ...base,
  output: {
    file: pkg.main,
    format: "iife",
    name: "default",
    compact: true,
    freeze: false,
    extend: true
  },
  external: [],
  plugins: [...base.plugins, prepack()],
  input: "src/index.ts",
  treeshake: false
}));

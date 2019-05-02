import pkg from "./package.json";
import createConfig from "../../rollup.config";
import prepack from "rollup-plugin-prepack";

export default createConfig(pkg, base => ({
  ...base,
  plugins: [...base.plugins, prepack()],
  input: "src/index.ts"
}));

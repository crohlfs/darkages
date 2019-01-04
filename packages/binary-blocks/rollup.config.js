import pkg from "./package.json";
import createConfig from "../../rollup.config";

export default createConfig(pkg, base => ({
  ...base,
  input: "src/index.ts"
}));

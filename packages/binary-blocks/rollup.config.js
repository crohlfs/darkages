import pkg from "./package.json";
import baseConfig from "../../rollup.config";
export default baseConfig("src/index.ts", pkg);

import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";

export default pkg => ({
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es"
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [resolve({ extensions: [".ts"] }), typescript()]
});

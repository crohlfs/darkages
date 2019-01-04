import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default (pkg, create) =>
  create({
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
    plugins: [
      resolve({ extensions: [".ts"] }),
      babel({ extensions: [".js", ".ts"] })
    ]
  });

import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["dist/index.js"],
  bundle: true,
  platform: "node",
  target: ["node16.4"],
  outfile: "app-bundle.js",
  minify: true,
  format: "esm",
  packages: "external",
});

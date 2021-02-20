import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import copy from "rollup-plugin-copy";
import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
import md5File from "md5-file";
import sass from "sass";
import CleanCSS from "clean-css";
// import hash from "rollup-plugin-hash";
import { terser } from "rollup-plugin-terser";
// import manifest from "rollup-route-manifest";
const extensions = [".ts", ".tsx", ".jsx"];
const styleRegex = /^.*css|scss$/;
const sassRegex = /^.*scss$/;
export default [
  {
    input: "src/index.tsx",
    output: [
      {
        dir: "build/js",
        format: "esm",
        entryFileNames: "[name]-[hash].js",
        chunkFileNames: "[name]-[hash].js",
      },
    ],
    preserveEntrySignatures: false,
    plugins: [
      del({ targets: "build" }),
      typescript(),
      nodeResolve({ extensions, exportConditions: ["solid"] }),
      babel({
        extensions,
        babelHelpers: "bundled",
        presets: [["solid", { generate: "dom", hydratable: true }]],
      }),
      copy({
        targets: [
          {
            src: ["public/favicon/*"],
            dest: "build/favicon",
          },
          {
            src: ["public/styles/index.scss"],
            dest: "build/styles",
            transform: (contents, filename) => {
              if (!sassRegex.test(filename)) return contents.toString();
              const css = sass
                .renderSync({ file: `public/styles/${filename}` })
                .css.toString();
              return new CleanCSS({}).minify(css).styles;
            },
            rename: (name, extension, fullPath) => {
              if (styleRegex.test(extension)) {
                const hash = md5File.sync(fullPath);
                return `${name}-${hash}.css`;
              }

              return `${name}.${extension}`;
            },
          },
        ],
      }),
      terser(),
    ],
  },
  {
    input: "ssg/index.jsx",
    output: [
      {
        dir: "ssg/lib",
        exports: "auto",
        format: "cjs",
      },
    ],
    external: ["solid-js", "solid-js/web", "node-fetch"],
    plugins: [
      del({ targets: "ssg/lib" }),
      // typescript(),
      nodeResolve({
        extensions,
        preferBuiltins: true,
        exportConditions: ["solid"],
      }),
      babel({
        extensions,
        babelHelpers: "bundled",
        presets: [
          ["solid", { generate: "ssr", hydratable: true, async: true }],
        ],
      }),
      json(),
    ],
  },
];

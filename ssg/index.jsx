const path = require("path");
const fs = require("fs");
import fetch from "node-fetch";
import { renderToStringAsync } from "solid-js/web";
import App from "../src/App";

const lang = "en";
globalThis.fetch = fetch;

const jsFiles = [];
const cssFiles = [];
const faviconFiles = [];
fs.readdirSync(path.join(__dirname, "../../build/js")).forEach((file) => {
  const regex = /^.+-chunkFile-.+$/;
  if (regex.test(file)) return;
  jsFiles.push(`<script type="module" src="/js/${file}"></script>`);
});
fs.readdirSync(path.join(__dirname, "../../build/styles")).forEach((file) => {
  cssFiles.push(`<link rel="stylesheet" href="/styles/${file}" />`);
});
fs.readdirSync(path.join(__dirname, "../../build/favicon")).forEach((file) => {
  faviconFiles.push(`<link rel="shortcut icon" href="/favicon/${file}" />`);
});

export default async (req) => {
  const { html, script } = await renderToStringAsync(() => (
    <App url={req.url} />
  ));
  return `<html lang="${lang}">
    <head>
      <title>🔥 Solid SSR 🔥</title>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      ${cssFiles.join("")}
      ${faviconFiles.join("")}
      ${script}
    </head>
    <body><div id="app">${html}</div></body>
    ${jsFiles.join("")}
  </html>`;
};

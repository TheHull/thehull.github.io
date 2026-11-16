import { readFileSync, writeFileSync } from "node:fs";

const source = new URL("../src/config/theme.json", import.meta.url);
const output = new URL("../src/styles/generated-theme.css", import.meta.url);
const palette = JSON.parse(readFileSync(source, "utf8"));
const colors = ["background", "foreground", "accent"];

for (const color of colors) {
  if (!/^#[0-9a-f]{6}$/i.test(palette[color] ?? "")) {
    throw new Error("theme.json: " + color + " must be a six-digit hex colour.");
  }
}

writeFileSync(output, [
  "/* Generated from src/config/theme.json. */",
  ":root {",
  ...colors.map((color) => "  --" + color + ": " + palette[color] + ";"),
  "}",
  "",
].join("\n"));

console.log("Theme CSS updated.");

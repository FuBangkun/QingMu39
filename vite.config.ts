import { nitro } from "nitro/vite";
import { existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { defineConfig } from "vite";
import { solidStart } from "@solidjs/start/config";

const findResolveUriEsm = (): string => {
  const pnpmDir = fileURLToPath(new URL("./node_modules/.pnpm/", import.meta.url));
  const dirs = readdirSync(pnpmDir).filter((d) => d.startsWith("@jridgewell+resolve-uri@"));
  for (const dir of dirs) {
    const file = join(
      pnpmDir,
      dir,
      "node_modules/@jridgewell/resolve-uri/dist/resolve-uri.mjs",
    );
    if (existsSync(file)) return file;
  }
  return "@jridgewell/resolve-uri";
};

export default defineConfig({
  plugins: [solidStart(), nitro({ preset: "cloudflare_module" })],
  resolve: {
    alias: {
      "@jridgewell/resolve-uri": findResolveUriEsm(),
    },
  },
});
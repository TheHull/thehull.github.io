/** Keep internal links valid at a domain root and under a hosting subpath. */
export function sitePath(path = ""): string {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
  return base + path.replace(/^\/+/, "");
}

/** Content files use YYYY-MM-DD as their identifier. */
export function contentDate(id: string): string {
  const date = new Date(id + "T12:00:00Z");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(id) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== id) {
    throw new Error("Expected a valid YYYY-MM-DD.md filename: " + id);
  }
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Rome",
  }).format(date);
}

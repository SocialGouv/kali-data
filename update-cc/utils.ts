export function isLink(link: string | undefined): boolean {
  if (!link) return false;
  return link.startsWith("http") || link.startsWith("www") || link.startsWith("https");
}

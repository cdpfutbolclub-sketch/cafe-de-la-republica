export function sanityImg(url: string, width = 800): string {
  return `${url}?w=${width}&fm=webp&q=80&fit=max`;
}

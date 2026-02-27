export function calculateScrollProgress(
  scrollY: number,
  contentHeight: number,
  viewportHeight: number,
): number {
  const scrollable = Math.max(contentHeight - viewportHeight, 1);
  const rawProgress = scrollY / scrollable;

  if (!Number.isFinite(rawProgress)) return 0;

  return Math.min(1, Math.max(0, rawProgress));
}

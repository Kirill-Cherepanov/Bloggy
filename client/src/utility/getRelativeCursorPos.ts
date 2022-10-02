export function getRelativeCursorPos(e: React.MouseEvent) {
  const x =
    e.clientX - (e.currentTarget as HTMLDivElement).getBoundingClientRect().x;
  const y =
    e.clientY - (e.currentTarget as HTMLDivElement).getBoundingClientRect().y;

  return { x, y };
}

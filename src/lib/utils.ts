export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getBpmHeatClass(bpm: number): string {
  if (bpm >= 168) return 'bpm-peak';
  if (bpm >= 164) return 'bpm-zone';
  return 'bpm-easy';
}

export function getBpmLabel(bpm: number): string {
  if (bpm >= 168) return 'Peak';
  if (bpm >= 164) return 'Zone';
  return 'Stride';
}

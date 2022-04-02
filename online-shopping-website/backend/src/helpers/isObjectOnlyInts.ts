export default function isObjectOnlyInts(object: Record<string, unknown>): boolean {
  for (const key in object) {
    if (typeof object[key] !== 'number') return false;
  }
  return true;
}

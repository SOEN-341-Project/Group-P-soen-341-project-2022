export default function isObjectOnlyInts(object: Object): boolean {
  for (const key in object) {
    if (typeof object[key] !== "number") return false;
  }
  return true;
}

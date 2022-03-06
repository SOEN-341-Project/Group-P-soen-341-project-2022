export default function convertStringToArray(input: string): number[] {
  let output: number[] = input
    .replace("[", "")
    .split(",")
    .map((element) => parseInt(element));
  return output.map((number) => (isNaN(number) ? 0 : number));
}

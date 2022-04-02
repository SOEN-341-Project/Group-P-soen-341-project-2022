export default function convertStringToArray(input: string): number[] { // this function is used to take an array that was mistakenly interpreted as a string back into an array of numbers
  const output: number[] = input
    .replace('[', '')
    .split(',')
    .map((element) => parseInt(element));
  return output.map((number) => (isNaN(number) ? 0 : number)); // we give back a 0 if we cant convert the number back because 0 should not work with the functions
}

export function splitAndUpperCase(name: string): string[] {
  const splittedNames = name
    .toUpperCase()
    .split(" ")
    .filter((word) => word.length >= 3);

  return splittedNames;
}

export function filterNamesBySize(names: string[]): string {
  const trimmedNames = [];
  for (let i = 0; i < names.length; i++) {
    if ((i > 0) && (i < names.length - 1)) {
      trimmedNames.push(names[i][0]);
    } else {
      trimmedNames.push(names[i]);
    }
  }

  return trimmedNames.join(" ");
}
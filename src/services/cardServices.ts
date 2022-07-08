const cardTypes: string[] = [
  "education",
  "groceries",
  "health",
  "restaurant",
  "transport",
];

export function checkCardType(cardType: string): boolean {
  if (!cardTypes.includes(cardType)) {
    return false;
  }

  return true;
}
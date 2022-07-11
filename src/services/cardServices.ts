import Cryptr from "cryptr";

import { cardRepository } from "../repositories/index.js";
import {
  TransactionTypes,
  CardInsertData,
} from "../repositories/cardRepository.js";
import {
  splitAndUpperCase,
  filterNamesBySize,
} from "../utils/cardNameFormatter.js";

import dotenv from "dotenv";
dotenv.config();
const myCryptrKey = process.env.CRYPTR_KEY;

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

export async function checkEmployeeCards(employeeId: number, cardType: TransactionTypes)
: Promise<Object> {
  const employeeCards = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId);
  
  return employeeCards;
}

export async function checkUniqueCard(cardNumber: string) : Promise<Object> {
  const cardByNumber = await cardRepository.findByCardNumber(cardNumber);

  return cardByNumber;
}

export function formatCardName(nameOnCard: string) : string {
  const splittedNames = splitAndUpperCase(nameOnCard);

  const formattedNames = filterNamesBySize(splittedNames);

  return formattedNames;
}

export function encryptCVC(cardCVC: string) {
  const cryptr = new Cryptr(myCryptrKey);
  
  const encryptedString = cryptr.encrypt(cardCVC);
  
  return encryptedString;
}

export function decryptCVC(encryptedCVC: string) {
  const cryptr = new Cryptr(myCryptrKey);

  const decryptedString = cryptr.decrypt(encryptedCVC);
  
  return decryptedString;
}

export async function insertNewCard(newCardData: CardInsertData) : Promise<any> {
  await cardRepository.insert(newCardData);
}
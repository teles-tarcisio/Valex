import { rechargeRepository } from "../repositories/index.js";

export function isEmployeeFromCompany(companyData: Object, employeeData: Object) {
  if (companyData["id"] === employeeData["companyId"]) {
    return true;
  }

  return false;
}

export async function rechargeCard(cardId: number, amount: number) {
  await rechargeRepository.insert( {cardId, amount} );
}
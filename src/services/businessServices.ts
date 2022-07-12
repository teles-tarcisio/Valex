import { businessRepository } from "../repositories/index.js";

export async function find(businessId: number) {
  const business = await businessRepository.findById(businessId);

  return business;  
}
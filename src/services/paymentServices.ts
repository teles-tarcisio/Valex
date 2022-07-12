import { paymentRepository } from "../repositories/index.js";

export async function createPayment() {
  console.log("services.createPayment");
}


export async function getCardPayments(cardId: number) {
  const payments = await paymentRepository.findByCardId(cardId);

  return payments;  
}